import { v } from "convex/values"
import { mutation, query } from "../_generated/server"
import { Doc, Id } from "../_generated/dataModel"

// Track analytics event
export const trackEvent = mutation({
  args: {
    userId: v.string(),
    event: v.string(),
    properties: v.object({
      category: v.optional(v.string()),
      action: v.optional(v.string()),
      label: v.optional(v.string()),
      value: v.optional(v.number()),
      metadata: v.optional(v.any()),
    }),
    sessionId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthorized")

    const eventId = await ctx.db.insert("analyticsEvents", {
      userId: args.userId,
      event: args.event,
      properties: args.properties,
      sessionId: args.sessionId,
      timestamp: Date.now(),
    })

    return eventId
  },
})

// Get user analytics
export const getUserAnalytics = query({
  args: {
    userId: v.string(),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthorized")

    const startDate = args.startDate || (Date.now() - (30 * 24 * 60 * 60 * 1000)) // 30 days ago
    const endDate = args.endDate || Date.now()

    const events = await ctx.db
      .query("analyticsEvents")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.and(
        q.gte(q.field("timestamp"), startDate),
        q.lte(q.field("timestamp"), endDate)
      ))
      .collect()

    // Aggregate data
    const analytics = {
      totalEvents: events.length,
      uniqueSessions: new Set(events.map(e => e.sessionId).filter(Boolean)).size,
      eventBreakdown: {} as Record<string, number>,
      categoryBreakdown: {} as Record<string, number>,
      dailyActivity: {} as Record<string, number>,
      topActions: {} as Record<string, number>,
    }

    events.forEach(event => {
      // Event breakdown
      analytics.eventBreakdown[event.event] = (analytics.eventBreakdown[event.event] || 0) + 1

      // Category breakdown
      if (event.properties.category) {
        analytics.categoryBreakdown[event.properties.category] = 
          (analytics.categoryBreakdown[event.properties.category] || 0) + 1
      }

      // Daily activity
      const date = new Date(event.timestamp).toISOString().split('T')[0]
      analytics.dailyActivity[date] = (analytics.dailyActivity[date] || 0) + 1

      // Top actions
      if (event.properties.action) {
        analytics.topActions[event.properties.action] = 
          (analytics.topActions[event.properties.action] || 0) + 1
      }
    })

    return analytics
  },
})

// Get learning insights
export const getLearningInsights = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthorized")

    // Get user data
    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first()

    if (!user) throw new Error("User not found")

    // Get lesson progress
    const lessonProgress = await ctx.db
      .query("userProgress")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect()

    // Get conversations
    const conversations = await ctx.db
      .query("conversations")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect()

    // Calculate insights
    const insights = {
      learningVelocity: calculateLearningVelocity(lessonProgress),
      strongestAreas: await getStrongestAreas(ctx, lessonProgress),
      improvementAreas: await getImprovementAreas(ctx, lessonProgress),
      studyPatterns: calculateStudyPatterns(lessonProgress),
      nextRecommendations: await getNextRecommendations(ctx, args.userId, lessonProgress),
      motivationalInsights: generateMotivationalInsights(lessonProgress, conversations),
    }

    return insights
  },
})

// Get engagement metrics
export const getEngagementMetrics = query({
  args: {
    userId: v.string(),
    timeframe: v.union(v.literal("week"), v.literal("month"), v.literal("quarter")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthorized")

    const timeframes = {
      week: 7 * 24 * 60 * 60 * 1000,
      month: 30 * 24 * 60 * 60 * 1000,
      quarter: 90 * 24 * 60 * 60 * 1000,
    }

    const startDate = Date.now() - timeframes[args.timeframe]

    // Get study sessions
    const sessions = await ctx.db
      .query("studySessions")
      .withIndex("by_user_date", (q) => 
        q.eq("userId", args.userId).gte("startTime", startDate)
      )
      .collect()

    // Get conversations
    const conversations = await ctx.db
      .query("conversations")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .filter((q) => q.gte(q.field("_creationTime"), startDate))
      .collect()

    // Get lesson completions
    const lessonProgress = await ctx.db
      .query("userProgress")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.and(
        q.eq(q.field("status"), "completed"),
        q.gte(q.field("completedAt"), startDate)
      ))
      .collect()

    const metrics = {
      totalSessions: sessions.length,
      totalStudyTime: sessions.reduce((sum, s) => sum + (s.duration || 0), 0),
      averageSessionLength: sessions.length > 0 
        ? sessions.reduce((sum, s) => sum + (s.duration || 0), 0) / sessions.length 
        : 0,
      lessonsCompleted: lessonProgress.length,
      conversationsStarted: conversations.length,
      totalMessages: conversations.reduce((sum, c) => sum + c.messageCount, 0),
      engagementScore: calculateEngagementScore(sessions, conversations, lessonProgress),
      dailyActivity: getDailyActivityPattern(sessions, args.timeframe),
    }

    return metrics
  },
})

// Start study session
export const startSession = mutation({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthorized")

    const sessionId = await ctx.db.insert("studySessions", {
      userId: args.userId,
      startTime: Date.now(),
      activities: [],
      messagesCount: 0,
      topicsDiscussed: [],
      goalsWorkedOn: [],
      performanceMetrics: {
        grammarAccuracy: 0,
        vocabularyUsage: 0,
        conversationFlow: 0,
        overallScore: 0,
      },
    })

    return sessionId
  },
})

// End study session
export const endSession = mutation({
  args: {
    sessionId: v.id("studySessions"),
    activities: v.array(v.object({
      type: v.union(
        v.literal("chat"), 
        v.literal("lesson"), 
        v.literal("exercise"),
        v.literal("pronunciation")
      ),
      resourceId: v.optional(v.string()),
      duration: v.number(),
      score: v.optional(v.number()),
    })),
    messagesCount: v.number(),
    topicsDiscussed: v.array(v.string()),
    goalsWorkedOn: v.array(v.id("learningGoals")),
    performanceMetrics: v.object({
      grammarAccuracy: v.number(),
      vocabularyUsage: v.number(),
      conversationFlow: v.number(),
      overallScore: v.number(),
    }),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthorized")

    const session = await ctx.db.get(args.sessionId)
    if (!session) throw new Error("Session not found")

    const duration = Date.now() - session.startTime

    await ctx.db.patch(args.sessionId, {
      endTime: Date.now(),
      duration,
      activities: args.activities,
      messagesCount: args.messagesCount,
      topicsDiscussed: args.topicsDiscussed,
      goalsWorkedOn: args.goalsWorkedOn,
      performanceMetrics: args.performanceMetrics,
    })

    // Update user stats
    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", session.userId))
      .first()

    if (user) {
      await ctx.db.patch(user._id, {
        stats: {
          ...user.stats,
          hoursSpent: user.stats.hoursSpent + (duration / 3600000), // Convert to hours
        },
        updatedAt: Date.now(),
      })
    }

    return args.sessionId
  },
})

// Helper functions
function calculateLearningVelocity(lessonProgress: any[]) {
  const completedLessons = lessonProgress.filter(p => p.status === "completed")
  if (completedLessons.length < 2) return 0

  const sortedLessons = completedLessons
    .filter(p => p.completedAt)
    .sort((a, b) => a.completedAt - b.completedAt)

  const timeSpan = sortedLessons[sortedLessons.length - 1].completedAt - sortedLessons[0].completedAt
  const daysSpan = timeSpan / (24 * 60 * 60 * 1000)
  
  return daysSpan > 0 ? completedLessons.length / daysSpan : 0
}

async function getStrongestAreas(ctx: any, lessonProgress: any[]) {
  const categoryScores: Record<string, { total: number; count: number; avg: number }> = {}

  for (const progress of lessonProgress) {
    if (progress.status === "completed" && progress.score !== undefined) {
      const lesson = await ctx.db.get(progress.lessonId)
      if (lesson) {
        if (!categoryScores[lesson.category]) {
          categoryScores[lesson.category] = { total: 0, count: 0, avg: 0 }
        }
        categoryScores[lesson.category].total += progress.score
        categoryScores[lesson.category].count++
      }
    }
  }

  // Calculate averages and sort
  Object.keys(categoryScores).forEach(category => {
    const cat = categoryScores[category]
    cat.avg = cat.count > 0 ? cat.total / cat.count : 0
  })

  return Object.entries(categoryScores)
    .sort(([,a], [,b]) => b.avg - a.avg)
    .slice(0, 3)
    .map(([category, data]) => ({
      category,
      averageScore: Math.round(data.avg),
      lessonsCompleted: data.count
    }))
}

async function getImprovementAreas(ctx: any, lessonProgress: any[]) {
  const categoryScores: Record<string, { total: number; count: number; avg: number }> = {}

  for (const progress of lessonProgress) {
    if (progress.status === "completed" && progress.score !== undefined) {
      const lesson = await ctx.db.get(progress.lessonId)
      if (lesson) {
        if (!categoryScores[lesson.category]) {
          categoryScores[lesson.category] = { total: 0, count: 0, avg: 0 }
        }
        categoryScores[lesson.category].total += progress.score
        categoryScores[lesson.category].count++
      }
    }
  }

  // Calculate averages and sort (lowest first)
  Object.keys(categoryScores).forEach(category => {
    const cat = categoryScores[category]
    cat.avg = cat.count > 0 ? cat.total / cat.count : 0
  })

  return Object.entries(categoryScores)
    .filter(([,data]) => data.avg < 80) // Only areas needing improvement
    .sort(([,a], [,b]) => a.avg - b.avg)
    .slice(0, 3)
    .map(([category, data]) => ({
      category,
      averageScore: Math.round(data.avg),
      lessonsCompleted: data.count,
      improvementNeeded: 80 - Math.round(data.avg)
    }))
}

function calculateStudyPatterns(lessonProgress: any[]) {
  const completedLessons = lessonProgress.filter(p => 
    p.status === "completed" && p.completedAt
  )

  if (completedLessons.length === 0) {
    return {
      preferredStudyTime: "morning",
      averageSessionLength: 0,
      studyFrequency: "irregular",
      mostProductiveDay: "monday"
    }
  }

  // Analyze study times
  const studyHours = completedLessons.map(lesson => {
    const date = new Date(lesson.completedAt)
    return date.getHours()
  })

  const hourCounts = studyHours.reduce((acc, hour) => {
    acc[hour] = (acc[hour] || 0) + 1
    return acc
  }, {} as Record<number, number>)

  const mostCommonHour = Object.entries(hourCounts)
    .sort(([,a], [,b]) => b - a)[0]?.[0]

  let preferredStudyTime = "morning"
  if (mostCommonHour) {
    const hour = parseInt(mostCommonHour)
    if (hour >= 12 && hour < 17) preferredStudyTime = "afternoon"
    else if (hour >= 17) preferredStudyTime = "evening"
  }

  // Calculate average session length
  const averageSessionLength = completedLessons.reduce((sum, lesson) => 
    sum + lesson.timeSpent, 0
  ) / completedLessons.length

  return {
    preferredStudyTime,
    averageSessionLength: Math.round(averageSessionLength / 60), // Convert to minutes
    studyFrequency: completedLessons.length > 10 ? "regular" : "irregular",
    mostProductiveDay: "monday" // Simplified for now
  }
}

async function getNextRecommendations(ctx: any, userId: string, lessonProgress: any[]) {
  // This is a simplified recommendation engine
  const completedLessonIds = lessonProgress
    .filter(p => p.status === "completed")
    .map(p => p.lessonId)

  // Get available lessons not yet completed
  const allLessons = await ctx.db
    .query("lessons")
    .filter((q) => q.eq(q.field("isPublished"), true))
    .collect()

  const uncompletedLessons = allLessons.filter(lesson => 
    !completedLessonIds.includes(lesson._id)
  )

  // Simple recommendation based on difficulty progression
  const userLevel = getUserLevelFromProgress(lessonProgress)
  const recommendedLessons = uncompletedLessons
    .filter(lesson => lesson.difficulty === userLevel)
    .slice(0, 3)

  return recommendedLessons.map(lesson => ({
    id: lesson._id,
    title: lesson.title,
    category: lesson.category,
    difficulty: lesson.difficulty,
    estimatedDuration: lesson.estimatedDuration,
    reason: `Matches your ${userLevel} level`
  }))
}

function getUserLevelFromProgress(lessonProgress: any[]) {
  const completedCount = lessonProgress.filter(p => p.status === "completed").length
  
  if (completedCount >= 20) return "advanced"
  if (completedCount >= 10) return "intermediate"
  return "beginner"
}

function generateMotivationalInsights(lessonProgress: any[], conversations: any[]) {
  const completedLessons = lessonProgress.filter(p => p.status === "completed").length
  const totalStudyTime = lessonProgress.reduce((sum, p) => sum + p.timeSpent, 0)
  const totalMessages = conversations.reduce((sum, c) => sum + c.messageCount, 0)

  const insights = []

  if (completedLessons > 0) {
    insights.push(`You've completed ${completedLessons} lesson${completedLessons > 1 ? 's' : ''}! 🎉`)
  }

  if (totalStudyTime > 3600) { // More than 1 hour
    const hours = Math.floor(totalStudyTime / 3600)
    insights.push(`You've spent ${hours} hour${hours > 1 ? 's' : ''} learning English! ⏰`)
  }

  if (totalMessages > 50) {
    insights.push(`You've sent ${totalMessages} messages in conversations! 💬`)
  }

  if (insights.length === 0) {
    insights.push("Keep up the great work! Every step counts in your learning journey! 🌟")
  }

  return insights
}

function calculateEngagementScore(sessions: any[], conversations: any[], lessonProgress: any[]) {
  let score = 0

  // Session engagement (0-30 points)
  const avgSessionLength = sessions.length > 0 
    ? sessions.reduce((sum, s) => sum + (s.duration || 0), 0) / sessions.length 
    : 0
  score += Math.min(30, (avgSessionLength / (30 * 60 * 1000)) * 30) // Max 30 points for 30+ min sessions

  // Conversation engagement (0-35 points)
  const avgMessages = conversations.length > 0
    ? conversations.reduce((sum, c) => sum + c.messageCount, 0) / conversations.length
    : 0
  score += Math.min(35, (avgMessages / 20) * 35) // Max 35 points for 20+ messages per conversation

  // Lesson completion (0-35 points)
  const completionRate = lessonProgress.length > 0
    ? lessonProgress.filter(p => p.status === "completed").length / lessonProgress.length
    : 0
  score += completionRate * 35

  return Math.round(score)
}

function getDailyActivityPattern(sessions: any[], timeframe: string) {
  const days = timeframe === "week" ? 7 : timeframe === "month" ? 30 : 90
  const dailyActivity: Record<string, number> = {}

  for (let i = 0; i < days; i++) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]
    
    const dayStart = new Date(date).setHours(0, 0, 0, 0)
    const dayEnd = dayStart + (24 * 60 * 60 * 1000)
    
    const daySessions = sessions.filter(s => 
      s.startTime >= dayStart && s.startTime < dayEnd
    )
    
    dailyActivity[dateStr] = daySessions.reduce((sum, s) => sum + (s.duration || 0), 0)
  }

  return dailyActivity
}