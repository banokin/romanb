import { v } from "convex/values"
import { mutation, query } from "../_generated/server"
import { Doc, Id } from "../_generated/dataModel"

// Get messages for a conversation
export const getByConversation = query({
  args: { conversationId: v.id("conversations") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthorized")

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_conversation_time", (q) =>
        q.eq("conversationId", args.conversationId)
      )
      .order("asc")
      .collect()

    return messages
  },
})

// Get recent messages for a user
export const getRecent = query({
  args: { 
    userId: v.string(),
    limit: v.optional(v.number())
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthorized")

    const limit = args.limit || 50

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(limit)

    return messages
  },
})

// Send a new message
export const send = mutation({
  args: {
    conversationId: v.id("conversations"),
    userId: v.string(),
    content: v.string(),
    role: v.union(v.literal("user"), v.literal("assistant"), v.literal("system")),
    sources: v.optional(v.array(v.object({
      title: v.string(),
      content: v.string(),
      source: v.string(),
      url: v.optional(v.string()),
      score: v.optional(v.number()),
      type: v.optional(v.union(v.literal("document"), v.literal("lesson"), v.literal("reference"))),
    }))),
    metadata: v.optional(v.object({
      wordCount: v.optional(v.number()),
      grammarScore: v.optional(v.number()),
      vocabularyLevel: v.optional(v.string()),
      detectedTopics: v.optional(v.array(v.string())),
      corrections: v.optional(v.array(v.object({
        original: v.string(),
        corrected: v.string(),
        rule: v.string(),
        explanation: v.string(),
        severity: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
      }))),
      pronunciationScore: v.optional(v.number()),
    })),
    tokenUsage: v.optional(v.object({
      promptTokens: v.number(),
      completionTokens: v.number(),
      totalTokens: v.number(),
    })),
    settings: v.optional(v.object({
      voiceEnabled: v.boolean(),
      avatarEnabled: v.boolean(),
      ragEnabled: v.boolean(),
      difficulty: v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("advanced")),
      topics: v.array(v.string()),
    })),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthorized")

    // Verify conversation exists and user has access
    const conversation = await ctx.db.get(args.conversationId)
    if (!conversation || conversation.userId !== args.userId) {
      throw new Error("Conversation not found or access denied")
    }

    // Insert the message
    const messageId = await ctx.db.insert("messages", {
      conversationId: args.conversationId,
      userId: args.userId,
      content: args.content,
      role: args.role,
      sources: args.sources,
      metadata: args.metadata,
      tokenUsage: args.tokenUsage,
    })

    // Update conversation metadata
    await ctx.db.patch(args.conversationId, {
      messageCount: conversation.messageCount + 1,
      lastMessageAt: Date.now(),
    })

    // Update user stats if this is a user message
    if (args.role === "user") {
      const user = await ctx.db
        .query("users")
        .withIndex("by_userId", (q) => q.eq("userId", args.userId))
        .first()

      if (user) {
        await ctx.db.patch(user._id, {
          stats: {
            ...user.stats,
            totalMessages: user.stats.totalMessages + 1,
          },
          updatedAt: Date.now(),
        })
      }
    }

    return messageId
  },
})

// Update message metadata (for adding corrections, pronunciation feedback, etc.)
export const updateMetadata = mutation({
  args: {
    messageId: v.id("messages"),
    metadata: v.object({
      wordCount: v.optional(v.number()),
      grammarScore: v.optional(v.number()),
      vocabularyLevel: v.optional(v.string()),
      detectedTopics: v.optional(v.array(v.string())),
      corrections: v.optional(v.array(v.object({
        original: v.string(),
        corrected: v.string(),
        rule: v.string(),
        explanation: v.string(),
        severity: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
      }))),
      pronunciationScore: v.optional(v.number()),
    }),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthorized")

    const message = await ctx.db.get(args.messageId)
    if (!message) throw new Error("Message not found")

    await ctx.db.patch(args.messageId, {
      metadata: {
        ...message.metadata,
        ...args.metadata,
      },
    })

    return args.messageId
  },
})

// Delete a message
export const remove = mutation({
  args: { messageId: v.id("messages") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthorized")

    const message = await ctx.db.get(args.messageId)
    if (!message) throw new Error("Message not found")

    // Only allow deletion of user's own messages
    if (message.userId !== identity.subject) {
      throw new Error("Access denied")
    }

    await ctx.db.delete(args.messageId)

    // Update conversation message count
    const conversation = await ctx.db.get(message.conversationId)
    if (conversation) {
      await ctx.db