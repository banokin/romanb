import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
            F
          </div>
          <h1 className="text-3xl font-bold freddy-text-gradient mb-2">
            Welcome back!
          </h1>
          <p className="text-muted-foreground">
            Sign in to continue your English learning journey with Freddy
          </p>
        </div>
        
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: 'freddy-gradient hover:opacity-90',
              card: 'shadow-xl border-0',
              headerTitle: 'hidden',
              headerSubtitle: 'hidden'
            }
          }}
          redirectUrl="/chat"
        />
      </div>
    </div>
  )
}