'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
// import { useQuery, useMutation } from 'convex/react'
// import { api } from '../../../convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import {
  MessageSquare,
  BookOpen,
  TrendingUp,
  User,
  Plus,
  X,
  MoreHorizontal,
  Trash2,
  Edit,
  Calendar
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'

interface SidebarProps {
  onClose?: () => void
}

const navigation = [
  {
    name: 'Chat',
    href: '/chat',
    icon: MessageSquare,
    description: 'Practice conversations'
  },
  {
    name: 'Lessons',
    href: '/lessons',
    icon: BookOpen,
    description: 'Structured learning'
  },
  {
    name: 'Progress',
    href: '/progress',
    icon: TrendingUp,
    description: 'Track your improvement'
  },
  {
    name: 'Profile',
    href: '/profile',
    icon: User,
    description: 'Manage your account'
  }
]

export function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname()
  const { user } = useUser()
  const [isCreating, setIsCreating] = useState(false)

  // Convex queries and mutations - temporarily disabled
  // const conversations = useQuery(
  //   api.conversations.getUserConversations,
  //   user ? { userId: user.id } : 'skip'
  // )
  // const createConversation = useMutation(api.conversations.create)
  // const deleteConversation = useMutation(api.conversations.remove)
  // const updateConversation = useMutation(api.conversations.update)
  
  // Mock data for development
  const conversations: any[] = []
  const createConversation = async (data: any) => {
    console.log('Creating conversation:', data)
    return 'mock-conversation-id'
  }
  const deleteConversation = async (data: any) => {
    console.log('Deleting conversation:', data)
  }
  const updateConversation = async (data: any) => {
    console.log('Updating conversation:', data)
  }

  const handleCreateConversation = async () => {
    if (!user) return
    
    setIsCreating(true)
    try {
      const conversationId = await createConversation({
        userId: user.id,
        title: `Chat ${new Date().toLocaleDateString()}`,
        settings: {
          voiceEnabled: true,
          avatarEnabled: true,
          ragEnabled: true,
          difficulty: 'intermediate',
          topics: ['general']
        }
      })
      
      // Navigate to new conversation
      window.location.href = `/chat?id=${conversationId}`
      onClose?.()
    } catch (error) {
      console.error('Failed to create conversation:', error)
      toast.error('Failed to create new conversation')
    } finally {
      setIsCreating(false)
    }
  }

  const handleDeleteConversation = async (conversationId: string) => {
    try {
      await deleteConversation({ conversationId })
      toast.success('Conversation deleted')
    } catch (error) {
      console.error('Failed to delete conversation:', error)
      toast.error('Failed to delete conversation')
    }
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    if (days < 7) return `${days} days ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="h-full bg-white dark:bg-gray-950 border-r flex flex-col">
      {/* Close button for mobile */}
      {onClose && (
        <div className="flex items-center justify-between p-4 lg:hidden">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">F</span>
            </div>
            <span className="font-semibold">Freddy</span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}

      {/* Navigation */}
      <div className="p-4">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
              (item.href === '/chat' && pathname.startsWith('/chat'))
            
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <item.icon className="h-4 w-4" />
                <div className="flex-1">
                  <div>{item.name}</div>
                  <div className="text-xs opacity-70">{item.description}</div>
                </div>
              </Link>
            )
          })}
        </nav>
      </div>

      <Separator />

      {/* Recent Conversations */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-muted-foreground">
              Recent Chats
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCreateConversation}
              disabled={isCreating}
              className="h-6 w-6"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <ScrollArea className="flex-1">
            <div className="space-y-1">
              {conversations?.length === 0 ? (
                <div className="text-center py-6">
                  <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No conversations yet
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCreateConversation}
                    disabled={isCreating}
                    className="mt-2"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Start Chat
                  </Button>
                </div>
              ) : (
                conversations?.map((conversation) => (
                  <div
                    key={conversation._id}
                    className="group relative"
                  >
                    <Link
                      href={`/chat?id=${conversation._id}`}
                      onClick={onClose}
                      className={cn(
                        'flex items-center gap-2 rounded-lg px-2 py-2 text-sm transition-colors w-full',
                        pathname.includes(conversation._id)
                          ? 'bg-accent text-accent-foreground'
                          : 'hover:bg-accent hover:text-accent-foreground'
                      )}
                    >
                      <MessageSquare className="h-3 w-3 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="truncate font-medium">
                          {conversation.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(conversation._creationTime)}
                        </div>
                      </div>
                    </Link>

                    {/* Conversation menu */}
                    <div className="absolute right-1 top-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                          >
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-3 w-3" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteConversation(conversation._id)}
                            className="text-destructive"
                          >
                            <Trash2 className="mr-2 h-3 w-3" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-4 border-t">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">This week</span>
            <Badge variant="secondary" className="h-5 text-xs">
              5 hours
            </Badge>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Streak</span>
            <Badge variant="secondary" className="h-5 text-xs">
              12 days 🔥
            </Badge>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Level</span>
            <Badge variant="secondary" className="h-5 text-xs">
              Intermediate
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}