# Architecture Overview

## System Architecture

Freddy English Tutor is built as a modern web application with a microservices-inspired architecture, leveraging Next.js App Router and various AI services.

## 🏗️ High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Main App      │    │   Admin Site    │    │   External      │
│   (Next.js)     │    │   (Next.js)     │    │   Services      │
│   Port: 3000    │    │   Port: 3001    │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Convex DB     │    │   File Storage  │    │   OpenAI API    │
│   (Real-time)   │    │   (Uploads)     │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Clerk Auth    │    │   LangChain     │    │   D-ID API      │
│   (Users)       │    │   (RAG)         │    │   (Avatar)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📁 Application Structure

### Main App (`main-app/`)

The main application serves as the primary user interface for English learning.

#### Key Components:
- **Authentication**: Clerk-based user management
- **Chat Interface**: Real-time conversation with AI tutor
- **Voice Integration**: Speech recognition and synthesis
- **Avatar Display**: D-ID powered AI avatar
- **Progress Tracking**: User learning analytics

#### Directory Structure:
```
main-app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication routes
│   │   ├── (main)/            # Main application routes
│   │   └── api/               # API routes
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components
│   │   ├── chat/             # Chat-related components
│   │   ├── avatar/           # Avatar components
│   │   └── layout/           # Layout components
│   ├── lib/                  # Utility libraries
│   │   ├── openai/           # OpenAI integration
│   │   ├── did/              # D-ID integration
│   │   ├── langchain/        # RAG implementation
│   │   └── convex/           # Database operations
│   ├── hooks/                # Custom React hooks
│   ├── types/                # TypeScript type definitions
│   └── styles/               # Global styles
├── convex/                   # Convex database functions
└── public/                   # Static assets
```

### Admin Site (`admin-site/`)

The admin panel provides administrative capabilities for managing the knowledge base and monitoring system performance.

#### Key Features:
- **Document Management**: Upload and manage learning materials
- **Knowledge Base Stats**: Monitor system performance
- **User Analytics**: Track user engagement and progress

#### Directory Structure:
```
admin-site/
├── src/
│   ├── app/                  # Next.js App Router
│   │   └── api/              # Admin API routes
│   ├── components/           # Admin components
│   └── lib/                  # Admin utilities
├── uploads/                  # Document storage
└── public/                   # Static assets
```

## 🔄 Data Flow

### User Authentication Flow
1. User visits main app
2. Clerk handles authentication
3. User session stored in Convex
4. Access granted to protected routes

### Chat Flow
1. User sends message (text/voice)
2. Message stored in Convex
3. OpenAI processes message
4. RAG system searches knowledge base
5. Response generated with context
6. D-ID creates avatar video
7. Response sent back to user

### Document Processing Flow
1. Admin uploads document via admin panel
2. Document stored in file system
3. LangChain processes document
4. Chunks created and indexed
5. Knowledge base updated
6. Document available for RAG queries

## 🗄️ Database Schema

### Convex Collections

#### Users
```typescript
interface User {
  _id: Id<"users">;
  clerkId: string;
  email: string;
  name: string;
  level: "beginner" | "intermediate" | "advanced";
  goals: string[];
  createdAt: number;
  lastActive: number;
}
```

#### Conversations
```typescript
interface Conversation {
  _id: Id<"conversations">;
  userId: Id<"users">;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}
```

#### Messages
```typescript
interface Message {
  _id: Id<"messages">;
  conversationId: Id<"conversations">;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  metadata?: {
    voiceUrl?: string;
    avatarUrl?: string;
    sources?: string[];
  };
}
```

#### Progress
```typescript
interface Progress {
  _id: Id<"progress">;
  userId: Id<"users">;
  lessonId: string;
  completed: boolean;
  score: number;
  timeSpent: number;
  completedAt: number;
}
```

## 🔐 Security Architecture

### Authentication
- **Clerk**: Handles user authentication and session management
- **JWT Tokens**: Secure API communication
- **Role-based Access**: Admin vs user permissions

### Data Protection
- **Environment Variables**: Sensitive data stored securely
- **API Rate Limiting**: Prevents abuse
- **Input Validation**: Sanitizes user inputs
- **HTTPS**: Encrypted communication

### Privacy
- **Data Minimization**: Only necessary data collected
- **User Consent**: Clear privacy policies
- **Data Retention**: Configurable retention periods

## 🚀 Performance Considerations

### Frontend Optimization
- **Code Splitting**: Lazy loading of components
- **Image Optimization**: Next.js image optimization
- **Caching**: Static asset caching
- **Bundle Analysis**: Regular bundle size monitoring

### Backend Optimization
- **Database Indexing**: Optimized queries
- **API Caching**: Redis for frequently accessed data
- **CDN**: Global content delivery
- **Load Balancing**: Horizontal scaling capability

### AI Service Optimization
- **Request Batching**: Efficient API usage
- **Response Caching**: Cache common responses
- **Streaming**: Real-time response streaming
- **Fallback Mechanisms**: Graceful degradation

## 🔧 Configuration Management

### Environment Variables
- **Development**: `.env.local` for local development
- **Production**: Secure environment variable management
- **Secrets**: API keys and sensitive data

### Feature Flags
- **A/B Testing**: Feature rollout control
- **Environment-specific**: Different configs per environment
- **Runtime Configuration**: Dynamic feature toggles

## 📊 Monitoring & Analytics

### Application Monitoring
- **Error Tracking**: Sentry integration
- **Performance Monitoring**: Core Web Vitals
- **User Analytics**: Usage patterns and engagement

### AI Service Monitoring
- **API Usage**: Token consumption tracking
- **Response Quality**: User feedback collection
- **Cost Optimization**: Usage analytics

## 🔄 Deployment Architecture

### Development
- **Local Development**: Docker containers
- **Hot Reloading**: Fast development iteration
- **Environment Isolation**: Separate dev/staging/prod

### Production
- **Vercel**: Main app deployment
- **Database**: Convex cloud hosting
- **CDN**: Global content delivery
- **Monitoring**: Real-time performance tracking
