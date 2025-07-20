'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  CheckCircle, 
  Clock, 
  Star,
  BookOpen,
  Target,
  Award
} from 'lucide-react'

interface Lesson {
  id: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: number
  topics: string[]
  content: string
  exercises: Exercise[]
}

interface Exercise {
  id: string
  type: 'multiple-choice' | 'fill-blank' | 'conversation'
  question: string
  options?: string[]
  correctAnswer: string
  explanation: string
}

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const lessonId = params.id as string
  
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentExercise, setCurrentExercise] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({})
  const [isCompleted, setIsCompleted] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockLesson: Lesson = {
      id: lessonId,
      title: 'Basic Greetings',
      description: 'Learn how to greet people in English in different situations.',
      difficulty: 'beginner',
      duration: 15,
      topics: ['greetings', 'conversation'],
      content: `
        <h2>Introduction to Greetings</h2>
        <p>Greetings are the first words we say when meeting someone. In English, there are many ways to greet people depending on the time of day and the formality of the situation.</p>
        
        <h3>Common Greetings</h3>
        <ul>
          <li><strong>Good morning</strong> - Used from sunrise until noon</li>
          <li><strong>Good afternoon</strong> - Used from noon until 5 PM</li>
          <li><strong>Good evening</strong> - Used from 5 PM until bedtime</li>
          <li><strong>Hello</strong> - Can be used at any time</li>
          <li><strong>Hi</strong> - Informal greeting</li>
        </ul>
        
        <h3>Formal vs Informal</h3>
        <p>In formal situations, use "Good morning/afternoon/evening" or "Hello". In informal situations, you can use "Hi" or "Hey".</p>
      `,
      exercises: [
        {
          id: '1',
          type: 'multiple-choice',
          question: 'What greeting would you use at 2 PM?',
          options: ['Good morning', 'Good afternoon', 'Good evening', 'Good night'],
          correctAnswer: 'Good afternoon',
          explanation: 'Good afternoon is used from noon until 5 PM.'
        },
        {
          id: '2',
          type: 'multiple-choice',
          question: 'Which greeting is most informal?',
          options: ['Good morning', 'Hello', 'Hi', 'Good evening'],
          correctAnswer: 'Hi',
          explanation: 'Hi is the most informal greeting among the options.'
        },
        {
          id: '3',
          type: 'fill-blank',
          question: 'Complete the greeting: "Good _____, how are you?"',
          correctAnswer: 'morning',
          explanation: 'Good morning is used to greet someone in the morning.'
        }
      ]
    }

    setLesson(mockLesson)
    setIsLoading(false)
  }, [lessonId])

  const handleAnswer = (exerciseId: string, answer: string) => {
    setUserAnswers(prev => ({ ...prev, [exerciseId]: answer }))
  }

  const handleNext = () => {
    if (currentExercise < (lesson?.exercises.length || 0) - 1) {
      setCurrentExercise(prev => prev + 1)
    } else {
      // Calculate score
      const totalExercises = lesson?.exercises.length || 0
      const correctAnswers = lesson?.exercises.filter(ex => 
        userAnswers[ex.id] === ex.correctAnswer
      ).length || 0
      const finalScore = Math.round((correctAnswers / totalExercises) * 100)
      
      setScore(finalScore)
      setIsCompleted(true)
    }
  }

  const handleRetry = () => {
    setCurrentExercise(0)
    setUserAnswers({})
    setIsCompleted(false)
    setScore(0)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="container mx-auto p-6">
        <Card className="text-center py-12">
          <CardContent>
            <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Lesson not found</h3>
            <p className="text-muted-foreground mb-4">
              The lesson you're looking for doesn't exist.
            </p>
            <Button onClick={() => router.push('/lessons')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Lessons
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isCompleted) {
    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <Card className="text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Lesson Completed!</CardTitle>
            <CardDescription>
              Congratulations! You've completed "{lesson.title}"
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{score}%</div>
              <p className="text-muted-foreground">Your score</p>
            </div>
            
            <Separator />
            
            <div className="flex gap-4">
              <Button onClick={handleRetry} variant="outline" className="flex-1">
                <Target className="w-4 h-4 mr-2" />
                Retry
              </Button>
              <Button onClick={() => router.push('/lessons')} className="flex-1">
                <BookOpen className="w-4 h-4 mr-2" />
                More Lessons
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentExerciseData = lesson.exercises[currentExercise]
  const progress = ((currentExercise + 1) / lesson.exercises.length) * 100

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={() => router.push('/lessons')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{lesson.title}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge className={getDifficultyColor(lesson.difficulty)}>
              {lesson.difficulty}
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="w-4 h-4 mr-1" />
              {lesson.duration} min
            </div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">
              {currentExercise + 1} of {lesson.exercises.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content */}
        <Card>
          <CardHeader>
            <CardTitle>Lesson Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: lesson.content }}
            />
          </CardContent>
        </Card>

        {/* Exercise */}
        <Card>
          <CardHeader>
            <CardTitle>Exercise {currentExercise + 1}</CardTitle>
            <CardDescription>
              {currentExerciseData.question}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentExerciseData.type === 'multiple-choice' && currentExerciseData.options && (
              <div className="space-y-2">
                {currentExerciseData.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={userAnswers[currentExerciseData.id] === option ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => handleAnswer(currentExerciseData.id, option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            )}

            {currentExerciseData.type === 'fill-blank' && (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Type your answer..."
                  className="w-full p-2 border rounded-md"
                  value={userAnswers[currentExerciseData.id] || ''}
                  onChange={(e) => handleAnswer(currentExerciseData.id, e.target.value)}
                />
              </div>
            )}

            <Button 
              onClick={handleNext}
              disabled={!userAnswers[currentExerciseData.id]}
              className="w-full"
            >
              {currentExercise === lesson.exercises.length - 1 ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Complete Lesson
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Next Exercise
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}