'use client'

import { ConvexReactClient } from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { useAuth } from '@clerk/nextjs'

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export function ConvexClientProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const auth = useAuth()

  // Отладка — можно удалить после тестов
  console.log("🔍 useAuth():", auth)
  console.log("✅ isSignedIn:", auth.isSignedIn)
  console.log("✅ isLoaded:", auth.isLoaded)

  if (!auth.isLoaded) {
    return null // или <LoadingScreen /> если хочешь
  }

  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  )
}
