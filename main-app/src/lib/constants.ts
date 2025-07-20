// Application constants

export const APP_CONFIG = {
    name: 'Freddy English Tutor',
    shortName: 'Freddy',
    description: 'AI-powered English learning with voice conversations and personalized lessons',
    version: '1.0.0',
    author: 'Freddy Team',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  } as const
  
  export const ROUTES = {
    home: '/',
    chat: '/chat',
    lessons: '/lessons',
    progress: '/progress',
    profile: '/profile',
    signIn: '/sign-in',
    signUp: '/sign-up',
    admin: '/admin',
  } as const
  
  export const API_ENDPOINTS = {
    openai: {
      chat: '/api/openai/chat',
      assistant: '/api/openai/assistant',
      grammar: '/api/openai/grammar',
    },
    did: {
      talks: '/api/did/talks',
      voices: '/api/did/voices',
      credits: '/api/did/credits',
    },
    knowledgeBase: {
      search: '/api/knowledge-base/search',
      stats: '/api/knowledge-base/stats',
    },
    auth: {
      webhook: '/api/auth/webhook',
    },
    health: '/api/health',
  } as const
  
  export const ENGLISH_LEVELS = {
    beginner: {
      label: 'Beginner',
      description: 'Basic vocabulary and simple sentences',
      color: 'green',
      icon: '🌱',
    },
    intermediate: {
      label: 'Intermediate',
      description: 'Comfortable with everyday conversations',
      color: 'yellow',
      icon: '📈',
    },
    advanced: {
      label: 'Advanced',
      description: 'Fluent in complex topics and nuances',
      color: 'red',
      icon: '🎯',
    },
  } as const
  
  export const LESSON_CATEGORIES = {
    grammar: {
      label: 'Grammar',
      description: 'Learn English grammar rules and structures',
      icon: '📝',
      color: 'blue',
    },
    vocabulary: {
      label: 'Vocabulary',
      description: 'Expand your English vocabulary',
      icon: '📚',
      color: 'green',
    },
    pronunciation: {
      label: 'Pronunciation',
      description: 'Improve your English pronunciation',
      icon: '🗣️',
      color: 'purple',
    },
    conversation: {
      label: 'Conversation',
      description: 'Practice real-world conversations',
      icon: '💬',
      color: 'orange',
    },
    writing: {
      label: 'Writing',
      description: 'Develop your English writing skills',
      icon: '✍️',
      color: 'red',
    },
    reading: {
      label: 'Reading',
      description: 'Enhance your reading comprehension',
      icon: '📖',
      color: 'teal',
    },
  } as const
  
  export const PERSONALITY_TYPES = {
    encouraging: {
      label: 'Encouraging',
      description: 'Supportive and motivating teaching style',
      traits: ['patient', 'positive', 'supportive'],
    },
    strict: {
      label: 'Strict',
      description: 'Focused on accuracy and proper form',
      traits: ['precise', 'thorough', 'detail-oriented'],
    },
    casual: {
      label: 'Casual',
      description: 'Relaxed and informal approach',
      traits: ['friendly', 'laid-back', 'conversational'],
    },
    professional: {
      label: 'Professional',
      description: 'Business-focused and formal',
      traits: ['formal', 'structured', 'goal-oriented'],
    },
  } as const
  
  export const VOICE_LANGUAGES = {
    'en-US': { label: 'English (US)', flag: '🇺🇸' },
    'en-GB': { label: 'English (UK)', flag: '🇬🇧' },
    'en-AU': { label: 'English (Australia)', flag: '🇦🇺' },
    'en-CA': { label: 'English (Canada)', flag: '🇨🇦' },
  } as const
  
  export const SUBSCRIPTION_PLANS = {
    free: {
      label: 'Free',
      price: 0,
      features: [
        'Basic chat with Freddy',
        '5 lessons per month',
        'Basic progress tracking',
      ],
      limits: {
        messagesPerDay: 50,
        lessonsPerMonth: 5,
        voiceMinutesPerDay: 10,
      },
    },
    premium: {
      label: 'Premium',
      price: 9.99,
      features: [
        'Unlimited chat with Freddy',
        'Access to all lessons',
        'Voice conversations',
        'Detailed analytics',
        'Priority support',
      ],
      limits: {
        messagesPerDay: Infinity,
        lessonsPerMonth: Infinity,
        voiceMinutesPerDay: 60,
      },
    },
    pro: {
      label: 'Pro',
      price: 19.99,
      features: [
        'Everything in Premium',
        'Animated avatar',
        'Custom lesson plans',
        'Advanced analytics',
        'Export progress data',
        '1-on-1 support calls',
      ],
      limits: {
        messagesPerDay: Infinity,
        lessonsPerMonth: Infinity,
        voiceMinutesPerDay: Infinity,
      },
    },
  } as const
  
  export const ACHIEVEMENT_TYPES = {
    firstLesson: {
      title: 'First Steps',
      description: 'Completed your first lesson',
      icon: '🎯',
      points: 10,
    },
    streakWeek: {
      title: 'Week Warrior',
      description: '7-day learning streak',
      icon: '🔥',
      points: 50,
    },
    streakMonth: {
      title: 'Monthly Master',
      description: '30-day learning streak',
      icon: '📅',
      points: 200,
    },
    lessonsComplete: {
      title: 'Lesson Lover',
      description: 'Completed 50 lessons',
      icon: '📚',
      points: 100,
    },
    conversationalist: {
      title: 'Conversationalist',
      description: 'Had 100 conversations with Freddy',
      icon: '💬',
      points: 150,
    },
    grammarGuru: {
      title: 'Grammar Guru',
      description: 'Perfect grammar score 10 times',
      icon: '📝',
      points: 75,
    },
  } as const
  
  export const ERROR_MESSAGES = {
    network: 'Network error. Please check your connection.',
    unauthorized: 'You need to sign in to access this feature.',
    forbidden: 'You don\'t have permission to perform this action.',
    notFound: 'The requested resource was not found.',
    serverError: 'Server error. Please try again later.',
    voiceNotSupported: 'Voice features are not supported in this browser.',
    microphoneAccess: 'Microphone access is required for voice features.',
    invalidInput: 'Please provide valid input.',
    rateLimited: 'Too many requests. Please try again later.',
  } as const
  
  export const SUCCESS_MESSAGES = {
    profileUpdated: 'Profile updated successfully!',
    lessonCompleted: 'Congratulations! Lesson completed.',
    goalAchieved: 'Goal achieved! Well done!',
    streakExtended: 'Learning streak extended!',
    dataExported: 'Data exported successfully.',
    settingsSaved: 'Settings saved successfully.',
  } as const
  
  export const REGEX_PATTERNS = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^\+?[\d\s\-\(\)]+$/,
    url: /^https?:\/\/[^\s]+$/,
    strongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  } as const
  
  export const ANIMATION_DURATIONS = {
    fast: 150,
    normal: 300,
    slow: 500,
  } as const
  
  export const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  } as const
  
  export const STORAGE_KEYS = {
    theme: 'freddy-theme',
    language: 'freddy-language',
    voiceSettings: 'freddy-voice-settings',
    chatSettings: 'freddy-chat-settings',
    onboardingCompleted: 'freddy-onboarding-completed',
  } as const