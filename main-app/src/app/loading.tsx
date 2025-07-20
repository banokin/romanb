import { LoadingSpinner } from '@/components/common/LoadingSpinner'

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
          F
        </div>
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <h2 className="text-xl font-semibold freddy-text-gradient mb-2">
          Loading Freddy...
        </h2>
        <p className="text-muted-foreground">
          Please wait while we prepare your English learning experience
        </p>
      </div>
    </div>
  )
}