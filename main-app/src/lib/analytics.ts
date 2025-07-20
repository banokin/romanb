// Analytics service for tracking user interactions and events

export interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
  userId?: string
  timestamp?: number
}

export interface PageView {
  path: string
  title: string
  userId?: string
  timestamp?: number
}

class Analytics {
  private isEnabled: boolean
  private userId?: string

  constructor() {
    this.isEnabled = process.env.NODE_ENV === 'production' && 
                    !!process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
  }

  setUserId(userId: string) {
    this.userId = userId
  }

  trackEvent(event: AnalyticsEvent) {
    if (!this.isEnabled) {
      console.log('Analytics Event:', event)
      return
    }

    const eventData = {
      ...event,
      userId: event.userId || this.userId,
      timestamp: event.timestamp || (typeof window !== 'undefined' ? Date.now() : Math.floor(Math.random() * 1000000))
    }

    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.name, {
        ...eventData.properties,
        user_id: eventData.userId
      })
    }

    // Mixpanel
    if (typeof window !== 'undefined' && (window as any).mixpanel) {
      (window as any).mixpanel.track(event.name, {
        ...eventData.properties,
        distinct_id: eventData.userId
      })
    }

    // Send to backend API
    this.sendToBackend(eventData)
  }

  trackPageView(pageView: PageView) {
    if (!this.isEnabled) {
      console.log('Page View:', pageView)
      return
    }

    const pageData = {
      ...pageView,
      userId: pageView.userId || this.userId,
      timestamp: pageView.timestamp || (typeof window !== 'undefined' ? Date.now() : Math.floor(Math.random() * 1000000))
    }

    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, {
        page_path: pageData.path,
        page_title: pageData.title,
        user_id: pageData.userId
      })
    }

    // Send to backend API
    this.sendToBackend({ ...pageData, name: 'page_view' })
  }

  private async sendToBackend(data: any) {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    } catch (error) {
      console.error('Failed to send analytics to backend:', error)
    }
  }

  // Predefined events
  trackChatStarted() {
    this.trackEvent({
      name: 'chat_started',
      properties: {
        source: 'main_app'
      }
    })
  }

  trackMessageSent(messageLength: number, hasVoice: boolean) {
    this.trackEvent({
      name: 'message_sent',
      properties: {
        message_length: messageLength,
        has_voice: hasVoice,
        source: 'main_app'
      }
    })
  }

  trackMessageReceived(responseTime: number, hasSources: boolean) {
    this.trackEvent({
      name: 'message_received',
      properties: {
        response_time: responseTime,
        has_sources: hasSources,
        source: 'main_app'
      }
    })
  }

  trackVoiceInputUsed(duration: number, language: string) {
    this.trackEvent({
      name: 'voice_input_used',
      properties: {
        duration,
        language,
        source: 'main_app'
      }
    })
  }

  trackAvatarInteraction(action: string) {
    this.trackEvent({
      name: 'avatar_interaction',
      properties: {
        action,
        source: 'main_app'
      }
    })
  }

  trackLessonStarted(lessonId: string, lessonType: string) {
    this.trackEvent({
      name: 'lesson_started',
      properties: {
        lesson_id: lessonId,
        lesson_type: lessonType,
        source: 'main_app'
      }
    })
  }

  trackLessonCompleted(lessonId: string, score: number, timeSpent: number) {
    this.trackEvent({
      name: 'lesson_completed',
      properties: {
        lesson_id: lessonId,
        score,
        time_spent: timeSpent,
        source: 'main_app'
      }
    })
  }

  trackError(error: string, context: string) {
    this.trackEvent({
      name: 'error_occurred',
      properties: {
        error,
        context,
        source: 'main_app'
      }
    })
  }

  trackFeatureUsage(feature: string, action: string) {
    this.trackEvent({
      name: 'feature_usage',
      properties: {
        feature,
        action,
        source: 'main_app'
      }
    })
  }
}

// Export singleton instance
export const analytics = new Analytics()

// Hook for React components
export function useAnalytics() {
  return {
    trackEvent: analytics.trackEvent.bind(analytics),
    trackPageView: analytics.trackPageView.bind(analytics),
    trackChatStarted: analytics.trackChatStarted.bind(analytics),
    trackMessageSent: analytics.trackMessageSent.bind(analytics),
    trackMessageReceived: analytics.trackMessageReceived.bind(analytics),
    trackVoiceInputUsed: analytics.trackVoiceInputUsed.bind(analytics),
    trackAvatarInteraction: analytics.trackAvatarInteraction.bind(analytics),
    trackLessonStarted: analytics.trackLessonStarted.bind(analytics),
    trackLessonCompleted: analytics.trackLessonCompleted.bind(analytics),
    trackError: analytics.trackError.bind(analytics),
    trackFeatureUsage: analytics.trackFeatureUsage.bind(analytics),
    setUserId: analytics.setUserId.bind(analytics),
  }
} 