import { Sun, Moon } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-12 w-24 items-center rounded-full bg-gradient-primary shadow-warm transition-all duration-300 hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
    >
      <div
        className={`absolute h-10 w-10 rounded-full bg-card shadow-lg transition-all duration-300 transform flex items-center justify-center ${
          theme === 'dark' ? 'translate-x-12' : 'translate-x-1'
        }`}
      >
        {theme === 'dark' ? (
          <Moon className="h-5 w-5 text-primary" />
        ) : (
          <Sun className="h-5 w-5 text-primary" />
        )}
      </div>
      <div className="flex w-full justify-between px-3">
        <Sun className={`h-5 w-5 transition-opacity ${theme === 'light' ? 'opacity-0' : 'opacity-50'}`} />
        <Moon className={`h-5 w-5 transition-opacity ${theme === 'dark' ? 'opacity-0' : 'opacity-50'}`} />
      </div>
    </button>
  )
}