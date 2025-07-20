'use client'

import { UserButton, useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Menu, 
  Bell, 
  Settings, 
  HelpCircle,
  Zap
} from 'lucide-react'
// import { useDIDCredits } from '@/hooks/useDIDCredits'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

interface HeaderProps {
  onMenuClick?: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user } = useUser()
  // const { credits, loading: creditsLoading } = useDIDCredits()
  const credits = 1000 // Mock data
  const creditsLoading = false

  return (
    <header className="border-b bg-white/95 dark:bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-950/60">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick || (() => {})}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <h1 className="text-xl font-bold freddy-text-gradient hidden sm:block">
              Freddy
            </h1>
          </div>
        </div>

        {/* Center - Welcome message */}
        <div className="hidden md:flex items-center space-x-2">
          {user && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Welcome back, <span className="font-medium">{user.firstName}</span>!
              </p>
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-2">
          {/* Credits Display */}
          {!creditsLoading && credits !== null && (
            <Badge variant="secondary" className="gap-1">
              <Zap className="h-3 w-3" />
              {credits} credits
            </Badge>
          )}

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-2">
                <h3 className="font-semibold mb-2">Notifications</h3>
                <div className="space-y-2">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <p className="text-sm font-medium">New lesson available!</p>
                    <p className="text-xs text-muted-foreground">
                      Check out "Advanced Business Conversations"
                    </p>
                  </div>
                  <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
                    <p className="text-sm font-medium">Weekly progress report</p>
                    <p className="text-xs text-muted-foreground">
                      You've improved by 15% this week!
                    </p>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Help */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <HelpCircle className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                Help Center
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Keyboard Shortcuts
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Contact Support
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-8 h-8"
              }
            }}
          />
        </div>
      </div>
    </header>
  )
}