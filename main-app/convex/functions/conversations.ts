import { v } from "convex/values"
import { mutation, query } from "../_generated/server"
import { Doc, Id } from "../_generated/dataModel"

// Get all conversations for a user
export const getUserConversations = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthorized")

    const conversations = await ctx.db
      .query("conversations")
      .withIndex("by_userId_updated", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect()

    return conversations
  },
})

// Get a specific conversation
export const getById = query({
  args: { conversationId: v.id("conversations") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthorized")

    const conversation = await ctx.db.get(args.conversationId)
    if (!conversation || conversation.userId !== identity.subject) {
      throw new Error("Conversation not found or access denied")
    }

    return conversation
  },
})

// Create a new conversation
export const create = mutation({
  args: {
    userId: v.string(),
    title: v.string(),
    settings: v.object({
      voiceEnabled: v.boolean(),
      avatarEnabled: v.boolean(),
      ragEnabled: v.boolean(),
      difficulty: v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("advanced")),
      topics: v.array(v.string()),
      personalityType: v.optional(v.union(
        v.literal("encouraging"), 
        v.literal("strict"), 
        v.literal("casual"), 
        v.literal("professional")
      )),
    }),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthorized")

    const conversationId = await ctx.db.insert("conversations", {
      userId: args.userId,
      title: args.title,
      settings: args.settings,
      messageCount: 0,
      tags: [],
      archived: false,
    })

    // Update user's total conversations count
    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first()

    if (user) {
      await ctx.db.patch(user._id, {
        stats: {
          ...user.stats,
          totalConversations: user.stats.totalConversations + 1,
        },
        updatedAt: Date.now(),
      })
    }

    return conversationId
  },
})

// Update conversation
export const update = mutation({
  args: {
    conversationId: v.id("conversations"),
    title: v.optional(v.string()),
    settings: v.optional(v.object({
      voiceEnabled: v.boolean(),
      avatarEnabled: v.boolean(),
      ragEnabled: v.boolean(),
      difficulty: v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("advanced")),
      topics: v.array(v.string()),
      personalityType: v.optional(v.union(
        v.literal("encouraging"), 
        v.literal("strict"), 
        v.literal("casual"), 
        v.literal("professional")
      )),
    })),
    tags: v.optional(v.array(v.string())),
    archived: v.optional(v.boolean()),
    summary: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthorized")

    const conversation = await ctx.db.get(args.conversationId)
    if (!conversation || conversation.userId !== identity.subject) {
      throw new Error("Conversation not found or access denied")
    }

    const updates: Partial<Doc<"conversations">> = {}
    
    if (args.title !== undefined) updates.title = args.title
    if (args.settings !== undefined) updates.settings = args.settings
    if (args.tags !== undefined) updates.tags = args.tags
    if (args.archived !== undefined) updates.archived = args.archived
    if (args.summary !== undefined) updates.summary = args.summary

    await ctx.db.patch(args.conversationId, updates)

    return args.conversationId
  },
})

// Delete conversation
export const remove = mutation({
  args: { conversationId: v.id("conversations") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthorized")

    const conversation = await ctx.db.get(args.conversationId)
    if (!conversation || conversation.userId !== identity.subject) {
      throw new Error("Conversation not found or access denied")
    }

    // Delete all messages in the conversation
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) => q.eq("conversationId", args.conversationId))
      .collect()

    for (const message of messages) {
      await ctx.db.delete(message._id)
    }

    // Delete the conversation
    await ctx.db.delete(args.conversationId)

    // Update user's total conversations count
    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", conversation.userId))
      .first()

    if (user) {
      await ctx.db.patch(user._id, {
        stats: {
          ...user.stats,
          totalConversations: Math.max(0, user.stats.totalConversations - 1),
        },
        updatedAt: Date.now(),
      })
    }

    return args.conversationId
  },
})

// Archive/unarchive conversation
export const archive = mutation({
  args: { 
    conversationId: v.id("conversations"),
    archived: v.boolean()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthorized")

    const conversation = await ctx.db.get(args.conversationId)
    if (!conversation || conversation.userId !== identity.subject) {
      throw new Error("Conversation not found or access denied")
    }

    await ctx.db.patch(args.conversationId, {
      archived: args.archived,
    })

    return args.conversationId
  },
})

// Get conversation summaries for dashboard
export const getSummaries = query({
  args: { 
    userId: v.string(),
    limit: v.optional(v.number()),
    includeArchived: v.optional(v.boolean())
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthorized")

    const limit = args.limit || 10
    const includeArchived = args.includeArchived || false

    let query = ctx.db
      .query("conversations")
      .withIndex("by_userId_updated", (q) => q.eq("userId", args.userId))

    if (!includeArchived) {
      query = query.filter((q) => q.eq(q.field("archived"), false))
    }

    const conversations = await query
      .order("desc")
      .take(limit)

    const summaries = await Promise.all(
      conversations.map(async (conv) => {
        // Get the last message for preview
        const lastMessage = await ctx.db
          .query("messages")
          .withIndex("by_conversation_time", (q) => 
            q.eq("conversationId", conv._id)
          )
          .order("desc")
          .first()

        return {
          id: conv._id,
          title: conv.title,
          messageCount: conv.messageCount,
          lastMessage: lastMessage?.content.substring(0, 100) + (lastMessage?.content.length > 100 ? "..." : "") || "",
          lastMessageAt: conv.lastMessageAt || conv._creationTime,
          topics: conv.tags,
          difficulty: conv.settings.difficulty,
          archived: conv.archived,
        }
      })
    )

    return summaries
  },
})

// Get conversation statistics for analytics
export const getStats = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthorized")

    const conversations = await ctx.db
      .query("conversations")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect()

    const totalConversations = conversations.length
    const activeConversations = conversations.filter(c => !c.archived).length
    const totalMessages = conversations.reduce((sum, conv) => sum + conv.messageCount, 0)

    // Calculate topic distribution
    const topicCounts = conversations
      .flatMap(conv => conv.tags)
      .reduce((acc, topic) => {
        acc[topic] = (acc[topic] || 0) + 1
        return acc
      }, {} as Record<string, number>)

    // Calculate difficulty distribution
    const difficultyDistribution = conversations.reduce((acc, conv) => {
      const difficulty = conv.settings.difficulty
      acc[difficulty] = (acc[difficulty] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Calculate weekly activity (last 4 weeks)
    const fourWeeksAgo = Date.now() - (4 * 7 * 24 * 60 * 60 * 1000)
    const recentConversations = conversations.filter(c => 
      c.lastMessageAt && c.lastMessageAt > fourWeeksAgo
    )

    const weeklyActivity = Array.from({ length: 4 }, (_, i) => {
      const weekStart = Date.now() - ((i + 1) * 7 * 24 * 60 * 60 * 1000)
      const weekEnd = Date.now() - (i * 7 * 24 * 60 * 60 * 1000)
      
      const weekConversations = recentConversations.filter(c =>
        c.lastMessageAt && c.lastMessageAt >= weekStart && c.lastMessageAt < weekEnd
      )

      return {
        week: `Week ${4 - i}`,
        conversations: weekConversations.length,
        messages: weekConversations.reduce((sum, conv) => sum + conv.messageCount, 0)
      }
    }).reverse()

    return {
      totalConversations,
      activeConversations,
      archivedConversations: totalConversations - activeConversations,
      totalMessages,
      averageMessagesPerConversation: totalConversations > 0 ? Math.round(totalMessages / totalConversations) : 0,
      topicDistribution: topicCounts,
      difficultyDistribution,
      weeklyActivity,
    }
  },
})