
import React from 'react'
import { Bot, User } from 'lucide-react'
import { Card } from '@/components/ui/card'

export interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  model?: string
  imageUrl?: string
}

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'user'
  
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-4`}>
      <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
      }`}>
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[70%]`}>
        <Card className={`p-3 ${
          isUser 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-card border-border'
        }`}>
          {message.imageUrl ? (
            <img 
              src={message.imageUrl} 
              alt="Generated image" 
              className="max-w-full h-auto rounded-md"
            />
          ) : (
            <p className="text-sm whitespace-pre-wrap">{message.text}</p>
          )}
        </Card>
        
        <div className={`flex items-center gap-2 mt-1 text-xs text-muted-foreground ${
          isUser ? 'flex-row-reverse' : 'flex-row'
        }`}>
          <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          {message.model && (
            <span className="px-2 py-1 bg-muted rounded-full text-xs">
              {message.model}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
