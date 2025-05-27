import {
  Box,
  Container,
  Heading,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Button,
  VStack,
  HStack,
  Icon,
  useToast,
  Progress,
} from '@chakra-ui/react'
import { FaDumbbell, FaQrcode, FaTrophy, FaFire, FaCheck } from 'react-icons/fa'
import { Link as RouterLink } from 'react-router-dom'
import { useStreak } from '../context/StreakContext'
import { useQuests, Quest } from '../context/QuestsContext'
import MainContainer from '../components/MainContainer'
import { useEffect, useState } from 'react'
import { keyframes } from '@emotion/react'

const Home = () => {
  const { streak, completeDailyTask, isTaskCompletedToday, setStreak } = useStreak()
  const { quests } = useQuests()
  const dailyQuests = quests.filter(q => q.type === 'daily')
  const completedDaily = dailyQuests.filter(q => q.isCompleted).length
  const toast = useToast()
  const [animatedProgress, setAnimatedProgress] = useState(0)
  const targetProgress = dailyQuests.length === 0 ? 0 : (completedDaily / dailyQuests.length) * 100
  const [fireActive, setFireActive] = useState(false)
  const [showToast, setShowToast] = useState(false)

  // Neon burst keyframes
  const neonBurst = keyframes`
    0% { filter: drop-shadow(0 0 0px #ff2d55) drop-shadow(0 0 0px #fff); }
    30% { filter: drop-shadow(0 0 32px #ff2d55) drop-shadow(0 0 48px #fff); }
    60% { filter: drop-shadow(0 0 24px #ff2d55) drop-shadow(0 0 32px #fff); }
    100% { filter: drop-shadow(0 0 0px #ff2d55) drop-shadow(0 0 0px #fff); }
  `

  // Motivational quotes (like Minecraft splash)
  const quotes = [
    "No pain, no gain!",
    "Stay strong, GymBro!",
    "One more rep!",
    "Progress, not perfection.",
    "You are your only limit.",
    "Sweat now, shine later.",
    "Stronger every day.",
    "Push yourself, no one else will do it for you.",
    "Dream. Believe. Achieve.",
    "The only bad workout is the one you didn't do.",
    "Beast mode: ON!",
    "Train insane or remain the same.",
    "Don't wish for it. Work for it.",
    "Your body can stand almost anything. It's your mind you have to convince.",
    "Champions train, losers complain."
  ]
  const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)])

  useEffect(() => {
    let frame: number
    let start: number | null = null
    const duration = 700 // ms
    const initial = animatedProgress
    const change = targetProgress - initial
    function animate(ts: number) {
      if (start === null) start = ts
      const elapsed = ts - start
      const progress = Math.min(elapsed / duration, 1)
      setAnimatedProgress(initial + change * progress)
      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      } else {
        setAnimatedProgress(targetProgress)
      }
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetProgress])

  const handleCompleteTask = () => {
    completeDailyTask()
    setShowToast(true)
  }

  useEffect(() => {
    if (showToast) {
      toast({
        title: 'Task Completed!',
        description: `Your streak is now ${streak} days!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      setShowToast(false)
    }
  }, [streak, showToast, toast])

  return (
    <MainContainer>
      <VStack spacing={12} align="center" w="100%" minH="70vh" justify="center">
        <SimpleGrid columns={1} spacing={8} justifyItems="center">
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center">
            <Icon
              as={FaFire}
              boxSize={14}
              color={streak > 0 ? 'red.500' : 'accent.500'}
              cursor="pointer"
              transition="color 0.2s"
              onClick={() => {
                setFireActive(true)
                handleCompleteTask()
                setTimeout(() => setFireActive(false), 500)
              }}
              _hover={{ color: 'red.400' }}
              sx={fireActive ? { animation: `${neonBurst} 0.5s linear` } : {}}
            />
            <HStack spacing={2} mt={2}>
              <Box color="white" fontSize="3xl" fontWeight="bold">{streak}</Box>
              <Box color="gray.400" fontSize="lg">days</Box>
            </HStack>
            <Box color="gray.400" fontSize="lg">Streak</Box>
          </Box>
          {/* Motivational Quote: right side below streak, Minecraft style, no background */}
          <Box w="100%" display="flex" flexDirection="row" alignItems="flex-start" mt={2} mb={-4}>
            <Box flex="1" />
            <Text
              color="accent.500"
              fontWeight="bold"
              fontSize="xl"
              letterSpacing="wider"
              transform="rotate(-3deg)"
              transition="all 0.2s"
              _hover={{ transform: 'rotate(3deg) scale(1.04)' }}
              style={{ whiteSpace: 'nowrap' }}
            >
              {quote}
            </Text>
          </Box>
        </SimpleGrid>

        <Box bg="brand.100" p={8} borderRadius="xl" boxShadow="xl" border="1px" borderColor="whiteAlpha.200" w="100%" maxW="800px">
          <Heading size="lg" mb={6} color="white">Today's Progress</Heading>
          <VStack spacing={6} align="stretch">
            <Box>
              <HStack justify="space-between" mb={3}>
                <Text color="gray.400" fontSize="lg">Daily Quests</Text>
                <Text color="gray.400" fontSize="lg">{completedDaily}/{dailyQuests.length}</Text>
              </HStack>
              <Progress
                value={animatedProgress}
                size="lg"
                colorScheme={dailyQuests.length > 0 && completedDaily === dailyQuests.length ? 'green' : 'pink'}
                borderRadius="full"
                transition="all 0.3s"
              />
            </Box>
          </VStack>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          <Box bg="brand.100" p={8} borderRadius="xl" boxShadow="xl" border="1px" borderColor="whiteAlpha.200">
            <HStack spacing={4} mb={6}>
              <Icon as={FaDumbbell} boxSize={8} color="accent.500" />
              <Heading size="lg" color="white">Quick Start</Heading>
            </HStack>
            <Text color="gray.400" fontSize="lg" mb={6}>
              Start your fitness journey with our guided workouts and protein tracking.
            </Text>
            <Button variant="solid" w="full" size="lg" height="60px" fontSize="lg">
              Get Started
            </Button>
          </Box>

          <Box bg="brand.100" p={8} borderRadius="xl" boxShadow="xl" border="1px" borderColor="whiteAlpha.200">
            <HStack spacing={4} mb={6}>
              <Icon as={FaTrophy} boxSize={8} color="accent.500" />
              <Heading size="lg" color="white">Achievements</Heading>
            </HStack>
            <Text color="gray.400" fontSize="lg" mb={6}>
              Track your progress and earn rewards for your dedication.
            </Text>
            <Button
              as={RouterLink}
              to="/achievements"
              variant="solid"
              w="full"
              size="lg"
              height="60px"
              fontSize="lg"
            >
              View Achievements
            </Button>
          </Box>

          <Box bg="brand.100" p={8} borderRadius="xl" boxShadow="xl" border="1px" borderColor="whiteAlpha.200">
            <HStack spacing={4} mb={6}>
              <Icon as={FaQrcode} boxSize={8} color="accent.500" />
              <Heading size="lg" color="white">Protein Scanner</Heading>
            </HStack>
            <Text color="gray.400" fontSize="lg" mb={6}>
              Scan protein products to track your nutrition and get personalized recommendations.
            </Text>
            <Button
              as={RouterLink}
              to="/protein-scanner"
              variant="solid"
              w="full"
              size="lg"
              height="60px"
              fontSize="lg"
            >
              Start Scanning
            </Button>
          </Box>
        </SimpleGrid>
      </VStack>
    </MainContainer>
  )
}

export default Home 