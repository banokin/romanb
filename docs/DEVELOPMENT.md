# Development Guide

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git
- VS Code (recommended)

### Initial Setup

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd freddy-english-tutor
   
   # Install main app dependencies
   cd main-app
   npm install
   
   # Install admin site dependencies
   cd ../admin-site
   npm install
   ```

2. **Environment configuration**
   ```bash
   # Copy environment templates
   cp main-app/.env.local.example main-app/.env.local
   cp admin-site/.env.local.example admin-site/.env.local
   ```

3. **Configure environment variables**
   - Add your API keys to `.env.local` files
   - Set up database connections
   - Configure authentication providers

## 🚀 Development Workflow

### Starting Development Servers

```bash
# Terminal 1 - Main app (port 3000)
cd main-app
npm run dev

# Terminal 2 - Admin site (port 3001)
cd admin-site
npm run dev
```

### Code Quality Tools

```bash
# Linting
npm run lint

# Type checking
npm run type-check

# Formatting
npm run format
```

### Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:coverage
```

## 📁 Project Structure Guidelines

### Component Organization

```
src/components/
├── ui/                    # Reusable UI components
│   ├── button.tsx
│   ├── input.tsx
│   └── index.ts          # Export all UI components
├── feature/               # Feature-specific components
│   ├── chat/
│   ├── avatar/
│   └── layout/
└── common/                # Shared components
    ├── LoadingSpinner.tsx
    └── ErrorBoundary.tsx
```

### File Naming Conventions

- **Components**: PascalCase (e.g., `ChatInput.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useVoiceChat.ts`)
- **Utilities**: camelCase (e.g., `formatMessage.ts`)
- **Types**: PascalCase (e.g., `ChatMessage.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)

### Import Organization

```typescript
// 1. React and Next.js imports
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// 2. Third-party libraries
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// 3. Local imports
import { useVoiceChat } from '@/hooks/useVoiceChat';
import { ChatMessage } from '@/types/chat';

// 4. Styles
import styles from './Component.module.css';
```

## 🎨 Styling Guidelines

### Tailwind CSS

- Use Tailwind utility classes for styling
- Create custom components for complex UI patterns
- Use CSS variables for theme customization

```typescript
// Good
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">

// Avoid
<div className="flex items-center justify-between p-4" style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
```

### Component Variants

Use `class-variance-authority` for component variants:

```typescript
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

## 🔧 API Development

### API Route Structure

```
src/app/api/
├── auth/                   # Authentication endpoints
├── openai/                 # OpenAI integration
├── did/                    # D-ID avatar endpoints
├── knowledge-base/         # RAG endpoints
└── health/                 # Health check
```

### API Response Format

```typescript
// Success response
{
  success: true,
  data: {
    // Response data
  },
  message?: string
}

// Error response
{
  success: false,
  error: {
    code: string,
    message: string,
    details?: any
  }
}
```

### Error Handling

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // API logic
    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An internal error occurred'
        }
      },
      { status: 500 }
    );
  }
}
```

## 🗄️ Database Development

### Convex Functions

```typescript
// convex/functions/messages.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    conversationId: v.id("conversations"),
    content: v.string(),
    role: v.union(v.literal("user"), v.literal("assistant")),
  },
  handler: async (ctx, args) => {
    const messageId = await ctx.db.insert("messages", {
      conversationId: args.conversationId,
      content: args.content,
      role: args.role,
      timestamp: Date.now(),
    });
    return messageId;
  },
});

export const list = query({
  args: { conversationId: v.id("conversations") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("conversationId"), args.conversationId))
      .order("asc")
      .collect();
  },
});
```

### Schema Definition

```typescript
// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    level: v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("advanced")),
    goals: v.array(v.string()),
    createdAt: v.number(),
    lastActive: v.number(),
  }),
  
  conversations: defineTable({
    userId: v.id("users"),
    title: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),
  
  messages: defineTable({
    conversationId: v.id("conversations"),
    role: v.union(v.literal("user"), v.literal("assistant")),
    content: v.string(),
    timestamp: v.number(),
    metadata: v.optional(v.any()),
  }),
});
```

## 🧪 Testing Guidelines

### Unit Tests

```typescript
// __tests__/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Integration Tests

```typescript
// __tests__/pages/chat.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { ChatPage } from '@/app/(main)/chat/page';

describe('Chat Page', () => {
  it('loads chat interface', async () => {
    render(<ChatPage />);
    
    await waitFor(() => {
      expect(screen.getByTestId('chat-input')).toBeInTheDocument();
      expect(screen.getByTestId('voice-input')).toBeInTheDocument();
    });
  });
});
```

### E2E Tests

```typescript
// e2e/chat.spec.ts
import { test, expect } from '@playwright/test';

test('user can send a message', async ({ page }) => {
  await page.goto('/chat');
  
  await page.fill('[data-testid="chat-input"]', 'Hello, Freddy!');
  await page.click('[data-testid="send-button"]');
  
  await expect(page.locator('[data-testid="message-list"]')).toContainText('Hello, Freddy!');
});
```

## 🔍 Debugging

### Development Tools

- **React DevTools**: Component inspection
- **Next.js DevTools**: Performance monitoring
- **Convex DevTools**: Database inspection
- **Browser DevTools**: Network and console debugging

### Logging

```typescript
// lib/logger.ts
export const logger = {
  info: (message: string, data?: any) => {
    console.log(`[INFO] ${message}`, data);
  },
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${message}`, error);
  },
  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${message}`, data);
  },
};
```

### Error Boundaries

```typescript
// components/common/ErrorBoundary.tsx
import React from 'react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error }>;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error!} />;
    }

    return this.props.children;
  }
}
```

## 📦 Build and Deployment

### Build Process

```bash
# Build main app
cd main-app
npm run build

# Build admin site
cd ../admin-site
npm run build
```

### Environment-specific Builds

```bash
# Development
npm run dev

# Staging
npm run build:staging

# Production
npm run build:production
```

### Deployment Checklist

- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Static assets optimized
- [ ] Performance benchmarks met
- [ ] Security audit completed

## 🤝 Contributing

### Pull Request Process

1. Create feature branch from `main`
2. Make changes following coding standards
3. Add tests for new functionality
4. Update documentation if needed
5. Submit pull request with detailed description
6. Address review feedback
7. Merge after approval

### Code Review Guidelines

- **Functionality**: Does the code work as intended?
- **Performance**: Are there any performance implications?
- **Security**: Are there any security concerns?
- **Maintainability**: Is the code easy to understand and maintain?
- **Testing**: Are there adequate tests?

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test changes
- `chore`: Build/tooling changes

Example:
```
feat(chat): add voice input functionality

- Implement speech recognition
- Add voice input UI component
- Integrate with OpenAI API

Closes #123
```
