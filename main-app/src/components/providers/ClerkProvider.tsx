'use client'

import { ClerkProvider as ClerkReactProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'

interface ClerkProviderProps {
  children: React.ReactNode
}

export function ClerkProvider({ children }: ClerkProviderProps) {
  const { theme } = useTheme()

  return (
    <ClerkReactProvider
      appearance={{
        baseTheme: theme === 'dark' ? dark : undefined,
        variables: {
          colorPrimary: '#3b82f6',
          colorBackground: theme === 'dark' ? '#0f172a' : '#ffffff',
          colorInputBackground: theme === 'dark' ? '#1e293b' : '#f8fafc',
          colorText: theme === 'dark' ? '#f1f5f9' : '#0f172a',
          colorTextSecondary: theme === 'dark' ? '#94a3b8' : '#64748b',
          colorTextOnPrimaryBackground: '#ffffff',
          colorInputText: theme === 'dark' ? '#f1f5f9' : '#0f172a',
          colorSuccess: '#10b981',
          colorDanger: '#ef4444',
          colorWarning: '#f59e0b',
          borderRadius: '0.5rem',
          fontFamily: 'Inter, system-ui, sans-serif',
        },
        elements: {
          formButtonPrimary: {
            backgroundColor: '#3b82f6',
            '&:hover': {
              backgroundColor: '#2563eb',
            },
          },
          card: {
            backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
            border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
          },
          headerTitle: {
            color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
          },
          headerSubtitle: {
            color: theme === 'dark' ? '#94a3b8' : '#64748b',
          },
          socialButtonsBlockButton: {
            backgroundColor: theme === 'dark' ? '#334155' : '#f8fafc',
            border: `1px solid ${theme === 'dark' ? '#475569' : '#e2e8f0'}`,
            color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
            '&:hover': {
              backgroundColor: theme === 'dark' ? '#475569' : '#f1f5f9',
            },
          },
          formFieldInput: {
            backgroundColor: theme === 'dark' ? '#334155' : '#f8fafc',
            border: `1px solid ${theme === 'dark' ? '#475569' : '#e2e8f0'}`,
            color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
            '&:focus': {
              borderColor: '#3b82f6',
              boxShadow: '0 0 0 1px #3b82f6',
            },
          },
          formFieldLabel: {
            color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
          },
          formFieldHintText: {
            color: theme === 'dark' ? '#94a3b8' : '#64748b',
          },
          footerActionLink: {
            color: '#3b82f6',
            '&:hover': {
              color: '#2563eb',
            },
          },
          identityPreviewText: {
            color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
          },
          identityPreviewEditButton: {
            color: '#3b82f6',
            '&:hover': {
              color: '#2563eb',
            },
          },
        },
      }}
    >
      {children}
    </ClerkReactProvider>
  )
} 