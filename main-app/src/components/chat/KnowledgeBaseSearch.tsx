'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { 
  Search, 
  BookOpen, 
  FileText, 
  Globe,
  Database,
  Filter,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchResult {
  id: string
  title: string
  content: string
  url?: string
  type: 'document' | 'webpage' | 'database'
  score: number
  metadata?: Record<string, any>
}

interface KnowledgeBaseSearchProps {
  onSearch: (query: string) => Promise<SearchResult[]>
  onResultSelect?: (result: SearchResult) => void
  className?: string
}

export function KnowledgeBaseSearch({
  onSearch,
  onResultSelect,
  className
}: KnowledgeBaseSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedType, setSelectedType] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) return

    setIsLoading(true)
    try {
      const searchResults = await onSearch(query)
      setResults(searchResults)
    } catch (error) {
      console.error('Search failed:', error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const clearSearch = () => {
    setQuery('')
    setResults([])
  }

  const filteredResults = results.filter(result => {
    if (selectedType === 'all') return true
    return result.type === selectedType
  })

  const getTypeIcon = (type: SearchResult['type']) => {
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

  const getTypeLabel = (type: SearchResult['type']) => {
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

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Knowledge Base Search
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Search Input */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search knowledge base..."
              className="pl-10 pr-10"
            />
            {query && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>
          <Button onClick={handleSearch} disabled={isLoading || !query.trim()}>
            {isLoading ? (
              <LoadingSpinner className="w-4 h-4" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          
          {results.length > 0 && (
            <span className="text-sm text-muted-foreground">
              {filteredResults.length} of {results.length} results
            </span>
          )}
        </div>

        {showFilters && (
          <div className="flex gap-2 flex-wrap">
            {['all', 'document', 'webpage', 'database'].map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type)}
                className="text-xs"
              >
                {type === 'all' ? 'All' : getTypeLabel(type as SearchResult['type'])}
              </Button>
            ))}
          </div>
        )}

        {/* Results */}
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner className="w-6 h-6" />
            <span className="ml-2 text-sm text-muted-foreground">Searching...</span>
          </div>
        )}

        {!isLoading && results.length > 0 && (
          <ScrollArea className="h-64">
            <div className="space-y-3">
              {filteredResults.map((result) => (
                <div
                  key={result.id}
                  className="border rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  onClick={() => onResultSelect?.(result)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getTypeIcon(result.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-medium truncate">
                          {result.title}
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          {getTypeLabel(result.type)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {(result.score * 100).toFixed(1)}%
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {result.content}
                      </p>
                      
                      {result.url && (
                        <div className="mt-2">
                          <span className="text-xs text-blue-600 dark:text-blue-400 truncate">
                            {result.url}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        {!isLoading && results.length === 0 && query && (
          <div className="text-center py-8 text-muted-foreground">
            <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No results found for "{query}"</p>
            <p className="text-xs mt-1">Try different keywords or check your spelling</p>
          </div>
        )}

        {!isLoading && !query && (
          <div className="text-center py-8 text-muted-foreground">
            <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Enter a search query to find information</p>
            <p className="text-xs mt-1">Search through documents, webpages, and databases</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 