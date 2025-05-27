import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  criteria: string;
  isCompleted: boolean;
  dateCompleted?: string;
}

const defaultAchievements: Achievement[] = [
  {
    id: 'pushup-50-2min',
    title: 'Push-up Pro',
    description: 'Complete 50 push-ups in 2 minutes',
    criteria: '50 push-ups in 2 minutes',
    isCompleted: false,
  },
  {
    id: 'plank-5min',
    title: 'Plank Master',
    description: 'Hold a plank for 5 minutes',
    criteria: '5 minute plank',
    isCompleted: false,
  },
  {
    id: 'run-10k',
    title: '10K Runner',
    description: 'Run 10 kilometers in one session',
    criteria: '10km run',
    isCompleted: false,
  },
  {
    id: 'squat-100',
    title: 'Squat Century',
    description: 'Do 100 bodyweight squats in a row',
    criteria: '100 squats in a row',
    isCompleted: false,
  },
  {
    id: 'pullup-20',
    title: 'Pull-up King',
    description: 'Do 20 pull-ups in a row',
    criteria: '20 pull-ups in a row',
    isCompleted: false,
  },
];

interface AchievementsContextType {
  achievements: Achievement[];
  completeAchievement: (id: string) => void;
  resetAchievements: () => void;
}

const AchievementsContext = createContext<AchievementsContextType | undefined>(undefined);

export const AchievementsProvider = ({ children }: { children: ReactNode }) => {
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const stored = localStorage.getItem('achievements');
    return stored ? JSON.parse(stored) : defaultAchievements;
  });

  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(achievements));
  }, [achievements]);

  const completeAchievement = (id: string) => {
    setAchievements((prev) =>
      prev.map((ach) =>
        ach.id === id && !ach.isCompleted
          ? { ...ach, isCompleted: true, dateCompleted: new Date().toISOString() }
          : ach
      )
    );
  };

  const resetAchievements = () => {
    setAchievements(defaultAchievements);
    localStorage.removeItem('achievements');
  };

  return (
    <AchievementsContext.Provider value={{ achievements, completeAchievement, resetAchievements }}>
      {children}
    </AchievementsContext.Provider>
  );
};

export const useAchievements = () => {
  const context = useContext(AchievementsContext);
  if (!context) throw new Error('useAchievements must be used within AchievementsProvider');
  return context;
}; 