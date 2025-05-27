import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface Quest {
  id: string;
  name: string;
  description: string;
  isCompleted: boolean;
  dateCompleted?: string;
  type: 'daily' | 'weekly';
  reward: number;
}

const defaultQuests: Quest[] = [
  // Daily Quests
  {
    id: 'no-pain-no-gain',
    name: 'No Pain No Gain',
    description: 'Reach your max rep for 5 times in a week.',
    isCompleted: false,
    type: 'weekly',
    reward: 200,
  },
  {
    id: 'early-bird',
    name: 'Early Bird',
    description: 'Complete a workout before 7am for 3 days in a row.',
    isCompleted: false,
    type: 'weekly',
    reward: 150,
  },
  {
    id: 'hydration-hero',
    name: 'Hydration Hero',
    description: 'Log your water intake every day for a week.',
    isCompleted: false,
    type: 'weekly',
    reward: 120,
  },
  {
    id: 'protein-power',
    name: 'Protein Power',
    description: 'Hit your daily protein goal for 7 days straight.',
    isCompleted: false,
    type: 'weekly',
    reward: 250,
  },
  {
    id: 'cardio-king',
    name: 'Cardio King',
    description: 'Do 30 minutes of cardio 5 times in a week.',
    isCompleted: false,
    type: 'weekly',
    reward: 180,
  },
  // New Daily Quests
  {
    id: 'pushup-daily',
    name: 'Push-up Daily',
    description: 'Do 50 push-ups today.',
    isCompleted: false,
    type: 'daily',
    reward: 30,
  },
  {
    id: 'drink-water-daily',
    name: 'Hydrate Now',
    description: 'Drink at least 2000ml of water today.',
    isCompleted: false,
    type: 'daily',
    reward: 20,
  },
  {
    id: 'run-daily',
    name: 'Daily Runner',
    description: 'Run at least 3km today.',
    isCompleted: false,
    type: 'daily',
    reward: 50,
  },
];

interface QuestsContextType {
  quests: Quest[];
  completeQuest: (id: string) => void;
  getTotalCoins: () => number;
}

const QuestsContext = createContext<QuestsContextType | undefined>(undefined);

export const QuestsProvider = ({ children }: { children: ReactNode }) => {
  const [quests, setQuests] = useState<Quest[]>(() => {
    const stored = localStorage.getItem('quests');
    return stored ? JSON.parse(stored) : defaultQuests;
  });

  useEffect(() => {
    localStorage.setItem('quests', JSON.stringify(quests));
  }, [quests]);

  const completeQuest = (id: string) => {
    setQuests((prev) =>
      prev.map((quest) =>
        quest.id === id && !quest.isCompleted
          ? { ...quest, isCompleted: true, dateCompleted: new Date().toISOString() }
          : quest
      )
    );
  };

  const getTotalCoins = () =>
    quests.filter(q => q.isCompleted).reduce((sum, q) => sum + q.reward, 0);

  return (
    <QuestsContext.Provider value={{ quests, completeQuest, getTotalCoins }}>
      {children}
    </QuestsContext.Provider>
  );
};

export const useQuests = () => {
  const context = useContext(QuestsContext);
  if (!context) throw new Error('useQuests must be used within QuestsProvider');
  return context;
}; 