import { v } from "convex/values"
import { mutation, query, internalMutation } from "../_generated/server"
import { Doc, Id } from "../_generated/dataModel"

// Get user profile
export const getProfile = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthorized")

    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first()

    return user
})

// Get user learning goals
export const getLearningGoals = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthorized")

    const goals = await ctx.db
      .query("learningGoals")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect()

    return goals
  },
})

// Create learning goal
export const createLearningGoal = mutation({
  args: {
    userId: v.string(),
    title: v.string(),
    description: v.string(),
    category: v.union(
      v.literal("grammar"), 
      v.literal("vocabulary"), 
      v.literal("pronunciation"), 
      v.literal("conversation"),
      v.literal("writing"),
      v.literal("reading")
    ),
    difficulty: v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("advanced")),
    target: v.number(),
    deadline: v.optional(v.number()),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthorized")

    const goalId = await ctx.db.insert("learningGoals", {
      userId: args.userId,
      title: args.title,
      description: args.description,
      category: args.category,
      difficulty: args.difficulty,
      progress: 0,
      target: args.target,
      deadline: args.deadline,
      completed: false,
      priority: args.priority,
      relatedLessons: [],
    })

    return goalId
  },
})

// Update learning goal progress
export const updateGoalProgress = mutation({
  args: {
    goalId: v.id("learningGoals"),
    progress: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthorized")

    const goal = await ctx.db.get(args.goalId)
    if (!goal) throw new Error("Goal not found")

    const completed = args.progress >= goal.target

    await ctx.db.patch(args.goalId, {
      progress: args.progress,
      completed,
    })

    return args.goalId
  },
})

// Delete user account (GDPR compliance)
export const deleteAccount = mutation({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity || identity.subject !== args.userId) {
      throw new Error("Unauthorized")
    }

    // Delete all user data
    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first()

    if (user) {
      // Delete conversations and messages
      const conversations = await ctx.db
        .query("conversations")
        .withIndex("by_userId", (q) => q.eq("userId", args.userId))
        .collect()

      for (const conv of conversations) {
        const messages = await ctx.db
          .query("messages")
          .withIndex("by_conversation", (q) => q.eq("conversationId", conv._id))
          .collect()

        for (const msg of messages) {
          await ctx.db.delete(msg._id)
        }
        await ctx.db.delete(conv._id)
      }

      // Delete progress records
      const progressRecords = await ctx.db
        .query("userProgress")
        .withIndex("by_user", (q) => q.eq("userId", args.userId))
        .collect()

      for (const progress of progressRecords) {
        await ctx.db.delete(progress._id)
      }

      // Delete learning goals
      const goals = await ctx.db
        .query("learningGoals")
        .withIndex("by_user", (q) => q.eq("userId", args.userId))
        .collect()

      for (const goal of goals) {
        await ctx.db.delete(goal._id)
      }

      // Delete study sessions
      const sessions = await ctx.db
        .query("studySessions")
        .withIndex("by_user", (q) => q.eq("userId", args.userId))
        .collect()

      for (const session of sessions) {
        await ctx.db.delete(session._id)
      }

      // Delete analytics events
      const events = await ctx.db
        .query("analyticsEvents")
        .withIndex("by_user", (q) => q.eq("userId", args.userId))
        .collect()

      for (const event of events) {
        await ctx.db.delete(event._id)
      }

      // Finally delete user
      await ctx.db.delete(user._id)
    }

    return { success: true }
  },
})

// Internal mutation for webhook handling
export const handleWebhook = internalMutation({
  args: {
    userId: v.string(),
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    profileImage: v.optional(v.string()),
    eventType: v.string(),
  },
  handler: async (ctx, args) => {
    if (args.eventType === "user.created" || args.eventType === "user.updated") {
      await ctx.runMutation("users:upsertProfile", {
        userId: args.userId,
        email: args.email,
        firstName: args.firstName,
        lastName: args.lastName,
        profileImage: args.profileImage,
      })
    } else if (args.eventType === "user.deleted") {
      await ctx.runMutation("users:deleteAccount", {
        userId: args.userId,
      })
    }
  },
})
})

// Create or update user profile
export const upsertProfile = mutation({
  args: {
    userId: v.string(),
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    profileImage: v.optional(v.string()),
    englishLevel: v.optional(v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("advanced"))),
    nativeLanguage: v.optional(v.string()),
    learningGoals: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthorized")

    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first()

    if (existingUser) {
      // Update existing user
      await ctx.db.patch(existingUser._id, {
        email: args.email,
        firstName: args.firstName,
        lastName: args.lastName,
        profileImage: args.profileImage,
        englishLevel: args.englishLevel || existingUser.englishLevel,
        nativeLanguage: args.nativeLanguage || existingUser.nativeLanguage,
        learningGoals: args.learningGoals || existingUser.learningGoals,
        updatedAt: Date.now(),
      })
      return existingUser._id
    } else {
      // Create new user
      const userId = await ctx.db.insert("users", {
        userId: args.userId,
        email: args.email,
        firstName: args.firstName,
        lastName: args.lastName,
        profileImage: args.profileImage,
        englishLevel: args.englishLevel || "beginner",
        nativeLanguage: args.nativeLanguage,
        learningGoals: args.learningGoals || [],
        preferences: {
          voiceEnabled: true,
          avatarEnabled: true,
          ragEnabled: true,
          difficulty: args.englishLevel || "beginner",
          topics: ["general"],
          personalityType: "encouraging",
        },
        subscription: {
          plan: "free",
          status: "active",
        },
        stats: {
          totalMessages: 0,
          totalConversations: 0,
          hoursSpent: 0,
          streakDays: 0,
          currentLevel: args.englishLevel || "beginner",
          improvementScore: 0,
        },
        createdAt: Date.now(),
        updatedAt: Date.now(),
      })
      return userId
    }
  },
})

// Update user preferences
export const updatePreferences = mutation({
  args: {
    userId: v.string(),
    preferences: v.object({
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

    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first()

    if (!user) throw new Error("User not found")

    await ctx.db.patch(user._id, {
      preferences: args.preferences,
      updatedAt: Date.now(),
    })

    return user._id
  },
})

// Update user stats
export const updateStats = mutation({
  args: {
    userId: v.string(),
    stats: v.object({
      totalMessages: v.optional(v.number()),
      totalConversations: v.optional(v.number()),
      hoursSpent: v.optional(v.number()),
      streakDays: v.optional(v.number()),
      currentLevel: v.optional(v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("advanced"))),
      improvementScore: v.optional(v.number()),
    }),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthorized")

    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first()

    if (!user) throw new Error("User not found")

    await ctx.db.patch(user._id, {
      stats: {
        ...user.stats,
        ...args.stats,
      },
      updatedAt: Date.now(),
    })

    return user._id
  },
})

// Update subscription
export const updateSubscription = mutation({
  args: {
    userId: v.string(),
    subscription: v.object({
      plan: v.union(v.literal("free"), v.literal("premium"), v.literal("pro")),
      status: v.union(v.literal("active"), v.literal("inactive"), v.literal("cancelled")),
      expiresAt: v.optional(v.number()),
    }),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthorized")

    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first()

    if (!user) throw new Error("User not found")

    await ctx.db.patch(user._id, {
      subscription: args.subscription,
      updatedAt: Date.now(),
    })

    return user._id
  },