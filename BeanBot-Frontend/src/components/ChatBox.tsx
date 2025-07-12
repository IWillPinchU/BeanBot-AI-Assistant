
import React, { useState, useRef, useEffect } from 'react'
import { Send, ChevronUp, MessageSquare, Image, Bot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { ChatContainer } from './ChatContainer'
import { type Message } from './ChatMessage'

type ModelType = 'openai-chat' | 'stable-image' | 'ollama-chat' | 'gemini-chat'

interface ModelOption {
  id: ModelType
  label: string
  icon: React.ReactNode
  description: string
}

const modelOptions: ModelOption[] = [
  {
    id: 'openai-chat',
    label: 'OpenAI Chat',
    icon: <MessageSquare className="h-4 w-4" />,
    description: 'Chat with OpenAI GPT models'
  },
  {
    id: 'stable-image',
    label: 'Stable Diffusion Images',
    icon: <Image className="h-4 w-4" />,
    description: 'Generate images with Stable Diffusion'
  },
  {
    id: 'ollama-chat',
    label: 'Ollama Chat',
    icon: <Bot className="h-4 w-4" />,
    description: 'Chat with local Ollama models'
  },
  {
    id: 'gemini-chat',
    label: 'Gemini Chat',
    icon: <MessageSquare className="h-4 w-4" />,
    description: 'Chat with Google Gemini models'
  }
]

export function ChatBox() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedModel, setSelectedModel] = useState<ModelOption>(modelOptions[0])
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [isExpanded, setIsExpanded] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSend = async () => {
    if (!message.trim()) return
    
    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
      model: selectedModel.label
    }
    
    setMessages(prev => [...prev, userMessage])
    setMessage('')
    setIsTyping(true)
    
    // Expand chat after first message
    if (!isExpanded) {
      setIsExpanded(true)
    }
    
    try {
      const endpoint = `http://localhost:8000/${selectedModel.id}/${encodeURIComponent(message)}`
      console.log('Calling:', endpoint)
      
      const response = await fetch(endpoint)
      
      if (response.ok) {
        const data = await response.text()
        
        const botMessage: Message = {
          id: crypto.randomUUID(),
          text: data,
          sender: 'bot',
          timestamp: new Date(),
          model: selectedModel.label,
          ...(selectedModel.id === 'stable-image' && data.startsWith('http') && {
            imageUrl: data,
            text: 'Generated image'
          })
        }
        
        setMessages(prev => [...prev, botMessage])
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
    } catch (error) {
      console.error('Error:', error)
      
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        text: `Error: ${error instanceof Error ? error.message : 'Failed to get response from server'}`,
        sender: 'bot',
        timestamp: new Date(),
        model: selectedModel.label
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleCollapse = () => {
    setIsExpanded(false)
  }

  const handleClear = () => {
    setMessages([])
    setIsExpanded(false)
  }

  return (
    <div className="fixed bottom-6 left-6 z-50" ref={dropdownRef}>
      <ChatContainer
        messages={messages}
        isExpanded={isExpanded}
        onCollapse={handleCollapse}
        onClear={handleClear}
      >
        {/* Dropdown Menu */}
        {isOpen && !isExpanded && (
          <Card className="absolute bottom-16 left-0 w-72 p-2 bg-card/95 backdrop-blur-sm border-primary/20 shadow-warm animate-in slide-in-from-bottom-2">
            <div className="space-y-1">
              {modelOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    setSelectedModel(option)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 hover:bg-muted/50 ${
                    selectedModel.id === option.id ? 'bg-primary/10 border border-primary/20' : ''
                  }`}
                >
                  <div className="text-primary">{option.icon}</div>
                  <div className="flex-1">
                    <div className="font-medium text-sm text-foreground">{option.label}</div>
                    <div className="text-xs text-muted-foreground">{option.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        )}

        {/* Chat Input */}
        <Card className={`flex items-center gap-2 p-2 bg-card/95 backdrop-blur-sm border-primary/20 shadow-warm ${
          isExpanded ? 'w-full' : 'min-w-[400px]'
        }`}>
          {/* Model Selector Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 text-primary hover:bg-primary/10 transition-all duration-200"
            disabled={isExpanded}
          >
            {selectedModel.icon}
            <span className="hidden sm:inline text-xs font-medium">{selectedModel.label}</span>
            {!isExpanded && (
              <ChevronUp className={`h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            )}
          </Button>

          {/* Message Input */}
          <div className="flex-1 relative">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask BeanBot anything..."
              className="pr-12 bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-200"
              disabled={isTyping}
            />
            {isTyping && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                  <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                  <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                </div>
              </div>
            )}
          </div>

          {/* Send Button */}
          <Button
            onClick={handleSend}
            disabled={!message.trim() || isTyping}
            size="sm"
            className="bg-gradient-primary hover:shadow-glow transition-all duration-200 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </Button>
        </Card>
      </ChatContainer>
    </div>
  )
}
