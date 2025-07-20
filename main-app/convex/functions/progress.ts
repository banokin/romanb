import { v } from "convex/values"
import { mutation, query } from "../_generated/server"
import { Doc, Id } from "../_generated/dataModel"

// Get user's overall progress dashboard
export const getDashboard = query({
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

    // Get learning goals
    const learningGoals = await ctx.db
      .query("learningGoals")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect()

    // Get study sessions (last 30 days)
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000)
    const recentSessions = await ctx.db
      .query("studySessions")
      .withIndex("by_user_date", (q) => 
        q.eq("userId", args.userId).gte("startTime", thirtyDaysAgo)
      )
      .collect()

    // Calculate statistics
    const completedLessons = lessonProgress.filter(p => p.status === "completed").length
    const totalLessons = lessonProgress.length
    const totalStudyTime = lessonProgress.reduce((sum, p) => sum + p.timeSpent, 0)
    const averageScore = lessonProgress
      .filter(p => p.score !== undefined)
      .reduce((sum, p, _, arr) => sum + (p.score || 0) / arr.length, 0)

    // Category breakdown
    const categoryStats = await getCategoryBreakdown(ctx, args.userId)

    // Weekly progress
    const weeklyProgress = await getWeeklyProgressData(ctx, args.userId)

    // Recent achievements
    const recentAchievements = await getRecentAchievements(ctx, args.userId)

    // Learning streak
    const streak = await calculateLearningStreak(ctx, args.userId)

    return {
      user: {
        level: user.stats.currentLevel,
        totalMessages: user.stats.totalMessages,
        totalConversations: user.stats.totalConversations,
        hoursSpent: user.stats.hoursSpent,
        improvementScore: user.stats.improvementScore,
      },
      lessons: {
        completed: completedLessons,
        total: totalLessons,
        averageScore: Math.round(averageScore),
        totalStudyTime,
      },
      conversations: {
        total: conversations.length,
        totalMessages: conversations.reduce((sum, c) => sum + c.messageCount, 0),
      },
      goals: {
        total: learningGoals.length,
        completed: learningGoals.filter(g => g.completed).length,
        inProgress: learningGoals.filter(g => !g.completed && g.progress > 0).length,
      },
      categoryStats,
      weeklyProgress,
      recentAchievements,
      streak,
      studyTime: {
        thisWeek: recentSessions
          .filter(s => s.startTime > Date.now() - (7 * 24 * 60 * 60 * 1000))
          .reduce((sum, s) => sum + (s.duration || 0), 0),
        thisMonth: recentSessions.reduce((sum, s) => sum + (s.duration || 0), 0),
      }
    }
  },
})

// Get detailed lesson analytics
export const getLessonAnalytics = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthorized")

    const progress = await ctx.db
      .query("userProgress")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect()

    const analytics = {
      totalLessons: progress.length,
      completedLessons: progress.filter(p => p.status === "completed").length,
      inProgressLessons: progress.filter(p => p.status === "in_progress").length,
      averageScore: 0,
      totalTimeSpent: 0,
      categoryBreakdown: {} as Record<string, { completed: number; total: number; avgScore: number }>,
      difficultyBreakdown: {} as Record<string, { completed: number; total: number; avgScore: number }>,
      recentProgress: [] as any[],
    }

    // Calculate averages and breakdowns
    let totalScore = 0
    let scoredLessons = 0

    for (const p of progress) {
      analytics.totalTimeSpent += p.timeSpent

      if (p.score !== undefined) {
        totalScore += p.score
        scoredLessons++
      }

      // Get lesson details for categorization
      const lesson = await ctx.db.get(p.lessonId)
      if (lesson) {
        // Category breakdown
        if (!analytics.categoryBreakdown[lesson.category]) {
          analytics.categoryBreakdown[lesson.category] = { completed: 0, total: 0, avgScore: 0 }
        }
        analytics.categoryBreakdown[lesson.category].total++
        if (p.status === "completed") {
          analytics.categoryBreakdown[lesson.category].completed++
        }

        // Difficulty breakdown
        if (!analytics.difficultyBreakdown[lesson.difficulty]) {
          analytics.difficultyBreakdown[lesson.difficulty] = { completed: 0, total: 0, avgScore: 0 }
        }
        analytics.difficultyBreakdown[lesson.difficulty].total++
        if (p.status === "completed") {
          analytics.difficultyBreakdown[lesson.difficulty].completed++
        }
      }
    }

    analytics.averageScore = scoredLessons > 0 ? Math.round(totalScore / scoredLessons) : 0

    // Calculate category and difficulty average scores
    for (const category of Object.keys(analytics.categoryBreakdown)) {
      const categoryProgress = progress.filter(async p => {
        const lesson = await ctx.db.get(p.lessonId)
        return lesson?.category === category && p.score !== undefined
      })
      // This would need to be refactored for proper async handling
    }

    // Get recent progress (last 10 completed lessons)
    const recentCompleted = progress
      .filter(p => p.status === "completed" && p.completedAt)
      .sort((a, b) => (b.completedAt || 0) - (a.completedAt || 0))
      .slice(0, 10)

    for (const p of recentCompleted) {
      const lesson = await ctx.db.get(p.lessonId)
      if (lesson) {
        analytics.recentProgress.push({
          lessonTitle: lesson.title,
          category: lesson.category,
          difficulty: lesson.difficulty,
          score: p.score,
          completedAt: p.completedAt,
          timeSpent: p.timeSpent,
        })
      }
    }

    return analytics
  },
})

// Get conversation analytics
export const getConversationAnalytics = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthorized")

    const conversations = await ctx.db
      .query("conversations")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect()

    const analytics = {
      totalConversations: conversations.length,
      totalMessages: 0,
      averageMessagesPerConversation: 0,
      topicDistribution: {} as Record<string, number>,
      difficultyDistribution: {} as Record<string, number>,
      recentActivity: [] as any[],
      monthlyActivity: [] as any[],
    }

    // Calculate totals
    analytics.totalMessages = conversations.reduce((sum, c) => sum + c.messageCount, 0)
    analytics.averageMessagesPerConversation = conversations.length > 0 
      ? Math.round(analytics.totalMessages / conversations.length) 
      : 0

    // Topic and difficulty distribution
    conversations.forEach(conv => {
      // Topic distribution
      conv.tags.forEach(tag => {
        analytics.topicDistribution[tag] = (analytics.topicDistribution[tag] || 0) + 1
      })

      // Difficulty distribution
      const difficulty = conv.settings.difficulty
      analytics.difficultyDistribution[difficulty] = (analytics.difficultyDistribution[difficulty] || 0) + 1
    })

    // Recent activity (last 7 days)
    const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000)
    const recentConversations = conversations
      .filter(c => c.lastMessageAt && c.lastMessageAt > sevenDaysAgo)
      .sort((a, b) => (b.lastMessageAt || 0) - (a.lastMessageAt || 0))
      .slice(0, 5)

    analytics.recentActivity = recentConversations.map(conv => ({
      title: conv.title,
      messageCount: conv.messageCount,
      lastMessageAt: conv.lastMessageAt,
      difficulty: conv.settings.difficulty,
      topics: conv.tags,
    }))

    // Monthly activity (last 6 months)
    for (let i = 0; i < 6; i++) {
      const monthStart = new Date()
      monthStart.setMonth(monthStart.getMonth() - i)
      monthStart.setDate(1)
      monthStart.setHours(0, 0, 0, 0)
      
      const monthEnd = new Date(monthStart)
      monthEnd.setMonth(monthEnd.getMonth() + 1)

      const monthConversations = conversations.filter(c => 
        c._creationTime >= monthStart.getTime() && c._creationTime < monthEnd.getTime()
      )

      analytics.monthlyActivity.unshift({
        month: monthStart.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        conversations: monthConversations.length,
        messages: monthConversations.reduce((sum, c) => sum + c.messageCount, 0),
      })
    }

    return analytics
  },
})

// Helper functions
async function getCategoryBreakdown(ctx: any, userId: string) {
  const progress = await ctx.db
    .query("userProgress")
    .withIndex("by_user", (q) => q.eq("userId", userId))
    .collect()

  const breakdown: Record<string, { completed: number; total: number; progress: number }> = {}

  for (const p of progress) {
    const lesson = await ctx.db.get(p.lessonId)
    if (lesson) {
      if (!breakdown[lesson.category]) {
        breakdown[lesson.category] = { completed: 0, total: 0, progress: 0 }
      }
      breakdown[lesson.category].total++
      if (p.status === "completed") {
        breakdown[lesson.category].completed++
      }
    }
  }

  // Calculate progress percentages
  Object.keys(breakdown).forEach(category => {
    const cat = breakdown[category]
    cat.progress = cat.total > 0 ? Math.round((cat.completed / cat.total) * 100) : 0
  })

  return breakdown
}

async function getWeeklyProgressData(ctx: any, userId: string) {
  const fourWeeksAgo = Date.now() - (4 * 7 * 24 * 60 * 60 * 1000)
  
  const sessions = await ctx.db
    .query("studySessions")
    .withIndex("by_user_date", (q) => 
      q.eq("userId", userId).gte("startTime", fourWeeksAgo)
    )
    .collect()

  const weeklyData = Array.from({ length: 4 }, (_, i) => {
    const weekStart = Date.now() - ((i + 1) * 7 * 24 * 60 * 60 * 1000)
    const weekEnd = Date.now() - (i * 7 * 24 * 60 * 60 * 1000)
    
    const weekSessions = sessions.filter(s =>
      s.startTime >= weekStart && s.startTime < weekEnd
    )

    return {
      week: `Week ${4 - i}`,
      sessions: weekSessions.length,
      totalTime: weekSessions.reduce((sum, s) => sum + (s.duration || 0), 0),
      averageScore: weekSessions.length > 0 
        ? Math.round(weekSessions.reduce((sum, s) => sum + s.performanceMetrics.overallScore, 0) / weekSessions.length)
        : 0,
    }
  }).reverse()

  return weeklyData
}

async function getRecentAchievements(ctx: any, userId: string) {
  // This would typically query an achievements table
  // For now, return mock achievements based on progress
  const progress = await ctx.db
    .query("userProgress")
    .withIndex("by_user", (q) => q.eq("userId", userId))
    .collect()

  const achievements = []
  const completedCount = progress.filter(p => p.status === "completed").length

  if (completedCount >= 1) {
    achievements.push({
      title: "First Lesson Complete",
      description: "Completed your first lesson",
      earnedAt: Date.now() - (7 * 24 * 60 * 60 * 1000), // 1 week ago
      icon: "🎉"
    })
  }

  if (completedCount >= 5) {
    achievements.push({
      title: "Learning Momentum",
      description: "Completed 5 lessons",
      earnedAt: Date.now() - (3 * 24 * 60 * 60 * 1000), // 3 days ago
      icon: "🚀"
    })
  }

  if (completedCount >= 10) {
    achievements.push({
      title: "Dedicated Learner",
      description: "Completed 10 lessons",
      earnedAt: Date.now() - (1 * 24 * 60 * 60 * 1000), // 1 day ago
      icon: "📚"
    })
  }

  return achievements.slice(0, 3) // Return most recent 3
}

async function calculateLearningStreak(ctx: any, userId: string) {
  const sessions = await ctx.db
    .query("studySessions")
    .withIndex("by_user_date", (q) => q.eq("userId", userId))
    .order("desc")
    .collect()

  if (sessions.length === 0) return 0

  let streak = 0
  let currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)

  // Check each day backwards
  for (let i = 0; i < 365; i++) { // Max 365 day streak
    const dayStart = currentDate.getTime()
    const dayEnd = dayStart + (24 * 60 * 60 * 1000)

    const dayHasActivity = sessions.some(s => 
      s.startTime >= dayStart && s.startTime < dayEnd
    )

    if (dayHasActivity) {
      streak++
    } else if (i === 0) {
      // If today has no activity, check yesterday
      currentDate.setDate(currentDate.getDate() - 1)
      continue
    } else {
      // Streak broken
      break
    }

    currentDate.setDate(currentDate.getDate() - 1)
  }

  return streak
}