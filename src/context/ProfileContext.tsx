import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface Profile {
  name: string
  experienceLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  goals: string[]
  preferredWorkoutDays: string[]
  height?: number
  weight?: number
  bio?: string
}

interface ProfileContextType {
  profile: Profile | null
  updateProfile: (data: Partial<Profile>) => void
  isProfileComplete: boolean
}

const defaultProfile: Profile = {
  name: '',
  experienceLevel: 'beginner',
  goals: [],
  preferredWorkoutDays: [],
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<Profile | null>(() => {
    const savedProfile = localStorage.getItem('userProfile')
    return savedProfile ? JSON.parse(savedProfile) : null
  })

  const [isProfileComplete, setIsProfileComplete] = useState(false)

  useEffect(() => {
    if (profile) {
      localStorage.setItem('userProfile', JSON.stringify(profile))
      setIsProfileComplete(
        profile.name !== '' &&
        profile.experienceLevel !== '' &&
        profile.goals.length > 0 &&
        profile.preferredWorkoutDays.length > 0
      )
    }
  }, [profile])

  const updateProfile = (data: Partial<Profile>) => {
    setProfile(prev => prev ? { ...prev, ...data } : { ...defaultProfile, ...data })
  }

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, isProfileComplete }}>
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfile = () => {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return context
} 