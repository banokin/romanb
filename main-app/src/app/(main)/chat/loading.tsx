import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { Card, CardContent } from '@/components/ui/card'

export default function ChatLoading() {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="py-12">
          <div className="space-y-4">
            <LoadingSpinner className="w-8 h-8 mx-auto" />
            <div>
              <h3 className="text-lg font-medium">Loading Chat</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Preparing your conversation with Freddy...
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 