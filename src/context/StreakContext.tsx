import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface StreakContextType {
  streak: number
  lastCompletedDate: string | null
  completeDailyTask: () => void
  isTaskCompletedToday: boolean
  setStreak: React.Dispatch<React.SetStateAction<number>>
}

const StreakContext = createContext<StreakContextType | undefined>(undefined)

export const StreakProvider = ({ children }: { children: ReactNode }) => {
  const [streak, setStreak] = useState(0)
  const [lastCompletedDate, setLastCompletedDate] = useState<string | null>(null)

  const isTaskCompletedToday = () => {
    if (!lastCompletedDate) return false
    const today = new Date().toISOString().split('T')[0]
    return lastCompletedDate === today
  }

  const completeDailyTask = () => {
    const today = new Date().toISOString().split('T')[0]
    
    if (isTaskCompletedToday()) {
      return // Already completed today
    }

    setStreak(prev => prev + 1)
    setLastCompletedDate(today)
  }

  return (
    <StreakContext.Provider value={{
      streak,
      lastCompletedDate,
      completeDailyTask,
      isTaskCompletedToday: isTaskCompletedToday(),
      setStreak
    }}>
      {children}
    </StreakContext.Provider>
  )
}

export const useStreak = () => {
  const context = useContext(StreakContext)
  if (context === undefined) {
    throw new Error('useStreak must be used within a StreakProvider')
  }
  return context
} 