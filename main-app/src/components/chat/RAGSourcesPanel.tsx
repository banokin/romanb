'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  BookOpen, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp,
  FileText,
  Globe,
  Database
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface RAGSource {
  id: string
  title: string
  url?: string
  content: string
  score: number
  type: 'document' | 'webpage' | 'database'
  metadata?: Record<string, any>
}

interface RAGSourcesPanelProps {
  sources: RAGSource[]
  isVisible: boolean
  onToggle: () => void
  onSourceClick?: (source: RAGSource) => void
  className?: string
}

export function RAGSourcesPanel({
  sources,
  isVisible,
  onToggle,
  onSourceClick,
  className
}: RAGSourcesPanelProps) {
  const [expandedSources, setExpandedSources] = useState<Set<string>>(new Set())

  const toggleSource = (sourceId: string) => {
    const newExpanded = new Set(expandedSources)
    if (newExpanded.has(sourceId)) {
      newExpanded.delete(sourceId)
    } else {
      newExpanded.add(sourceId)
    }
    setExpandedSources(newExpanded)
  }

  const getSourceIcon = (type: RAGSource['type']) => {
    switch (type) {
      case 'document':
        return <FileText className="w-4 h-4" />
      case 'webpage':
        return <Globe className="w-4 h-4" />
      case 'database':
        return <Database className="w-4 h-4" />
      default:
        return <BookOpen className="w-4 h-4" />
    }
  }

  const getSourceTypeLabel = (type: RAGSource['type']) => {
    switch (type) {
      case 'document':
        return 'Document'
      case 'webpage':
        return 'Webpage'
      case 'database':
        return 'Database'
      default:
        return 'Source'
    }
  }

  if (!isVisible) {
    return null
  }

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Knowledge Sources
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="h-8 w-8 p-0"
          >
            <ChevronUp className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {sources.length} sources
          </Badge>
          <span className="text-xs text-muted-foreground">
            Used to generate response
          </span>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <ScrollArea className="h-64">
          <div className="space-y-3">
            {sources.map((source, index) => (
              <div
                key={source.id}
                className="border rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                {/* Source Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    {getSourceIcon(source.type)}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">
                        {source.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {getSourceTypeLabel(source.type)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Score: {(source.score * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {source.url && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(source.url, '_blank')}
                        className="h-6 w-6 p-0"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleSource(source.id)}
                      className="h-6 w-6 p-0"
                    >
                      {expandedSources.has(source.id) ? (
                        <ChevronUp className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Source Content */}
                {expandedSources.has(source.id) && (
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {source.content}
                    </p>
                    
                    {source.metadata && Object.keys(source.metadata).length > 0 && (
                      <div className="mt-2 pt-2 border-t border-dashed">
                        <div className="text-xs text-muted-foreground">
                          <strong>Metadata:</strong>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {Object.entries(source.metadata).map(([key, value]) => (
                            <div key={key} className="flex gap-2">
                              <span className="font-medium">{key}:</span>
                              <span>{String(value)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        {sources.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No sources used for this response</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 