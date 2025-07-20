'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Heart, 
  Github, 
  Twitter, 
  Mail, 
  BookOpen,
  Users,
  Award
} from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Freddy</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your AI-powered English tutor, helping you master the language through personalized conversations and interactive learning.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span className="text-xs text-muted-foreground">for language learners</span>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="font-semibold">Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Interactive Conversations
              </li>
              <li className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                Personalized Learning
              </li>
              <li className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Grammar & Vocabulary
              </li>
              <li className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                Progress Tracking
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/lessons" className="text-muted-foreground hover:text-foreground transition-colors">
                  Lessons
                </Link>
              </li>
              <li>
                <Link href="/progress" className="text-muted-foreground hover:text-foreground transition-colors">
                  Progress
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-muted-foreground hover:text-foreground transition-colors">
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-muted-foreground hover:text-foreground transition-colors">
                  Chat with Freddy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">Connect</h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="mailto:support@freddy-english.com">
                  <Mail className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="space-y-2">
              <Badge variant="outline" className="text-xs">
                Version 1.0.0
              </Badge>
              <div className="text-xs text-muted-foreground">
                Built with Next.js & AI
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            © {currentYear} Freddy English Tutor. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/support" className="hover:text-foreground transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}