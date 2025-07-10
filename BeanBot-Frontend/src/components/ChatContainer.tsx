
import React, { useRef, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X, Minimize2 } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChatMessage, type Message } from './ChatMessage'

interface ChatContainerProps {
  messages: Message[]
  isExpanded: boolean
  onCollapse: () => void
  onClear: () => void
  children: React.ReactNode
}

export function ChatContainer({ messages, isExpanded, onCollapse, onClear, children }: ChatContainerProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  if (!isExpanded) {
    return <>{children}</>
  }

  return (
    <Card className="fixed bottom-6 left-6 right-6 top-24 z-50 bg-card/95 backdrop-blur-sm border-primary/20 shadow-warm animate-in slide-in-from-bottom-2 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-foreground">BeanBot Conversation</h3>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
            {messages.length} messages
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCollapse}
            className="text-muted-foreground hover:text-foreground"
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-2">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <p>Start a conversation with BeanBot!</p>
            </div>
          ) : (
            messages.map(message => (
              <ChatMessage key={message.id} message={message} />
            ))
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-border p-4">
        {children}
      </div>
    </Card>
  )
}
