import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { SignInButton, SignUpButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  MessageSquare, 
  Mic, 
  BookOpen, 
  TrendingUp, 
  Users, 
  Star,
  Play,
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default async function HomePage() {
  const { userId } = auth()

  if (userId) {
    redirect('/chat')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <h1 className="text-2xl font-bold freddy-text-gradient">Freddy</h1>
          </div>
          <div className="flex items-center space-x-2">
            <SignInButton mode="modal">
              <Button variant="ghost">Sign In</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button>Get Started</Button>
            </SignUpButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            AI-Powered English Learning
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 freddy-text-gradient">
            Meet Freddy, Your
            <br />
            AI English Tutor
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience personalized English learning with voice conversations, 
            real-time feedback, and adaptive lessons powered by advanced AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignUpButton mode="modal">
              <Button size="lg" className="freddy-gradient text-white">
                <Play className="mr-2 h-5 w-5" />
                Start Learning Free
              </Button>
            </SignUpButton>
            <Button size="lg" variant="outline">
              <MessageSquare className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Freddy?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Advanced AI technology meets personalized learning
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <MessageSquare className="h-8 w-8 text-blue-500" />,
                title: "Natural Conversations",
                description: "Practice speaking with AI that understands context and provides natural responses"
              },
              {
                icon: <Mic className="h-8 w-8 text-green-500" />,
                title: "Voice Recognition",
                description: "Advanced speech recognition technology for pronunciation practice and feedback"
              },
              {
                icon: <BookOpen className="h-8 w-8 text-purple-500" />,
                title: "Personalized Lessons",
                description: "Adaptive learning that adjusts to your level and learning style"
              },
              {
                icon: <TrendingUp className="h-8 w-8 text-orange-500" />,
                title: "Progress Tracking",
                description: "Detailed analytics to monitor your improvement and identify areas for growth"
              },
              {
                icon: <Users className="h-8 w-8 text-red-500" />,
                title: "Real-time Feedback",
                description: "Instant corrections and suggestions to accelerate your learning"
              },
              {
                icon: <Star className="h-8 w-8 text-yellow-500" />,
                title: "Interactive Avatar",
                description: "Engaging visual conversations with Freddy's lifelike avatar"
              }
            ].map((feature, index) => (
              <Card key={index} className="glass-morphism border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="mb-2">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Get started in 3 simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Sign Up & Assessment",
                description: "Create your account and take a quick assessment to determine your English level"
              },
              {
                step: "2",
                title: "Start Conversations",
                description: "Begin chatting with Freddy about topics that interest you and practice your skills"
              },
              {
                step: "3",
                title: "Track Progress",
                description: "Monitor your improvement with detailed analytics and personalized recommendations"
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                {index < 2 && (
                  <ArrowRight className="h-6 w-6 text-gray-400 mx-auto mt-4 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Students Say</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Real feedback from learners around the world
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Maria Rodriguez",
                role: "Business Professional",
                content: "Freddy helped me improve my English for work presentations. The voice practice feature is amazing!",
                rating: 5
              },
              {
                name: "Ahmed Hassan",
                role: "University Student",
                content: "The personalized lessons adapted to my learning style perfectly. My IELTS score improved significantly!",
                rating: 5
              },
              {
                name: "Li Wei",
                role: "Software Developer",
                content: "Natural conversations with Freddy feel like talking to a real tutor. Best language learning app I've used.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="glass-morphism border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 italic">
                    "{testimonial.content}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Card className="max-w-4xl mx-auto freddy-gradient border-0 text-white">
            <CardContent className="p-12">
              <h2 className="text-4xl font-bold mb-4">
                Ready to Transform Your English?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of learners who are already improving their English with Freddy
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <SignUpButton mode="modal">
                  <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Start Free Trial
                  </Button>
                </SignUpButton>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Learn More
                </Button>
              </div>
              <p className="text-sm mt-4 opacity-80">
                No credit card required • 7-day free trial • Cancel anytime
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">F</span>
                </div>
                <h3 className="text-xl font-bold">Freddy</h3>
              </div>
              <p className="text-gray-400">
                Your AI-powered English tutor for personalized learning experiences.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/features" className="hover:text-white">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/demo" className="hover:text-white">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="/community" className="hover:text-white">Community</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Freddy English Tutor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}