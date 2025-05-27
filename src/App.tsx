import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ProteinScanner from './pages/ProteinScanner'
import Quests from './pages/Quests'
import Rewards from './pages/Rewards'
import Profile from './pages/Profile'
import Achievements from './pages/Achievements'
import theme from './theme'
import { StreakProvider } from './context/StreakContext'
import { ProfileProvider } from './context/ProfileContext'
import { AchievementsProvider } from './context/AchievementsContext'
import { QuestsProvider } from './context/QuestsContext'

function App() {
  return (
    <AchievementsProvider>
      <QuestsProvider>
        <ChakraProvider theme={theme}>
          <ProfileProvider>
            <StreakProvider>
              <Router>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/protein-scanner" element={<ProteinScanner />} />
                  <Route path="/quests" element={<Quests />} />
                  <Route path="/rewards" element={<Rewards />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/achievements" element={<Achievements />} />
                </Routes>
              </Router>
            </StreakProvider>
          </ProfileProvider>
        </ChakraProvider>
      </QuestsProvider>
    </AchievementsProvider>
  )
}

export default App
