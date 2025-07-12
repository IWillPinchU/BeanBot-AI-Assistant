import { ThemeToggle } from '@/components/ThemeToggle'
import { ChatBox } from '@/components/ChatBox'
import coffeeBg from '@/assets/coffee-bg.jpg'
import { Coffee, Sparkles, Bot } from 'lucide-react'

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-subtle">
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${coffeeBg})` }}
      />
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-subtle opacity-80" />
      
      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Coffee className="h-8 w-8 text-primary animate-pulse" />
            <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-accent animate-bounce" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              BeanBot
            </h1>
            <p className="text-xs text-muted-foreground">AI-Powered Assistant</p>
          </div>
        </div>
        
        <ThemeToggle />
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="mb-12">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-gradient-primary blur-3xl opacity-30 rounded-full" />
              <Bot className="relative h-24 w-24 text-primary mx-auto animate-bounce" />
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-warm bg-clip-text text-transparent">
              Welcome to BeanBot
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Your intelligent assistant powered by multiple AI models
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-primary/20">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm font-medium text-foreground">OpenAI Chat</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-primary/20">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{animationDelay: '0.5s'}} />
                <span className="text-sm font-medium text-foreground">Stable Diffusion Images</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-primary/20">
                <div className="w-2 h-2 bg-primary-glow rounded-full animate-pulse" style={{animationDelay: '1s'}} />
                <span className="text-sm font-medium text-foreground">Ollama Models</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-primary/20">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{animationDelay: '1.5s'}} />
                <span className="text-sm font-medium text-foreground">Gemini Chat</span>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-warm">
              <div className="h-12 w-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 mx-auto shadow-glow">
                <Bot className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Smart Conversations</h3>
              <p className="text-sm text-muted-foreground">Engage in intelligent conversations with advanced AI models</p>
            </div>
            
            <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-warm">
              <div className="h-12 w-12 bg-gradient-warm rounded-lg flex items-center justify-center mb-4 mx-auto shadow-glow">
                <Sparkles className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Image Creation</h3>
              <p className="text-sm text-muted-foreground">Generate stunning images using stable diffusion running locally</p>
            </div>
            
            <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-warm">
              <div className="h-12 w-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 mx-auto shadow-glow">
                <Coffee className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Local Models</h3>
              <p className="text-sm text-muted-foreground">Chat with powerful Ollama models running locally</p>
            </div>

            <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-warm">
              <div className="h-12 w-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 mx-auto shadow-glow">
                <Bot className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Gemini Chat</h3>
              <p className="text-sm text-muted-foreground">Advanced conversations with Google's Gemini AI models</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 mb-8">
            <p className="text-lg text-muted-foreground mb-4">
              Ready to start chatting?
            </p>
            <div className="animate-bounce">
              <div className="w-8 h-8 border-2 border-primary rounded-full flex items-center justify-center mx-auto">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Click the chat box in the bottom left corner
            </p>
          </div>
        </div>
      </main>

      {/* Chat Interface */}
      <ChatBox />

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-primary/20 rounded-full animate-pulse" />
      <div className="absolute top-40 right-20 w-6 h-6 bg-accent/20 rounded-full animate-pulse" style={{animationDelay: '1s'}} />
      <div className="absolute bottom-40 right-10 w-3 h-3 bg-primary-glow/30 rounded-full animate-pulse" style={{animationDelay: '2s'}} />
      <div className="absolute bottom-60 left-20 w-5 h-5 bg-primary/10 rounded-full animate-pulse" style={{animationDelay: '0.5s'}} />
    </div>
  );
};

export default Index;