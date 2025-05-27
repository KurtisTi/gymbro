import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  HStack,
  Icon,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  useToast,
  Tag,
  TagLabel,
  TagCloseButton,
  InputGroup,
  InputRightElement,
  Flex,
  Progress,
} from '@chakra-ui/react'
import { FaMedal, FaTrophy, FaPlus, FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import { useState } from 'react'
import MainContainer from '../components/MainContainer'
import { useProfile } from '../context/ProfileContext'
import { useQuests } from '../context/QuestsContext'
import { useStreak } from '../context/StreakContext'

const experienceLevels = [
  { value: 'beginner', label: 'Beginner (0-1 years)', description: 'Just starting your fitness journey' },
  { value: 'intermediate', label: 'Intermediate (1-3 years)', description: 'Regular gym-goer with good form' },
  { value: 'advanced', label: 'Advanced (3-5 years)', description: 'Experienced with complex routines' },
  { value: 'expert', label: 'Expert (5+ years)', description: 'Master of various training methods' },
]

const workoutDays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

const commonGoals = [
  'Build Muscle',
  'Lose Weight',
  'Improve Strength',
  'Increase Endurance',
  'Maintain Fitness',
  'Sports Performance',
]

const steps = [
  { id: 'name', title: 'What\'s your name?', description: 'Let\'s get to know you' },
  { id: 'experience', title: 'Your Experience Level', description: 'Help us understand your fitness background' },
  { id: 'goals', title: 'Your Fitness Goals', description: 'What do you want to achieve?' },
  { id: 'schedule', title: 'Workout Schedule', description: 'When do you prefer to train?' },
  { id: 'details', title: 'Additional Details', description: 'Tell us more about yourself' },
]

const Profile = () => {
  const { profile, updateProfile } = useProfile()
  const { quests } = useQuests()
  const { streak } = useStreak()
  const [isEditing, setIsEditing] = useState(!profile)
  const [currentStep, setCurrentStep] = useState(0)
  const [newGoal, setNewGoal] = useState('')
  const toast = useToast()

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    setIsEditing(false)
    toast({
      title: 'Profile Updated',
      description: 'Your profile has been successfully updated.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  const handleAddGoal = () => {
    if (newGoal && !profile?.goals.includes(newGoal)) {
      updateProfile({ goals: [...(profile?.goals || []), newGoal] })
      setNewGoal('')
    }
  }

  const handleRemoveGoal = (goal: string) => {
    updateProfile({ goals: profile?.goals.filter(g => g !== goal) || [] })
  }

  const handleToggleWorkoutDay = (day: string) => {
    const currentDays = profile?.preferredWorkoutDays || []
    const newDays = currentDays.includes(day)
      ? currentDays.filter(d => d !== day)
      : [...currentDays, day]
    updateProfile({ preferredWorkoutDays: newDays })
  }

  const renderStep = () => {
    switch (steps[currentStep].id) {
      case 'name':
        return (
          <VStack spacing={6} align="stretch">
            <Heading size="lg">What's your name?</Heading>
            <Text color="gray.400">Let's get to know you</Text>
            <FormControl isRequired>
              <Input
                size="lg"
                value={profile?.name || ''}
                onChange={(e) => updateProfile({ name: e.target.value })}
                placeholder="Enter your name"
                fontSize="xl"
                py={8}
              />
            </FormControl>
          </VStack>
        )

      case 'experience':
        return (
          <VStack spacing={6} align="stretch">
            <Heading size="lg">Your Experience Level</Heading>
            <Text color="gray.400">Help us understand your fitness background</Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {experienceLevels.map((level) => (
                <Box
                  key={level.value}
                  p={6}
                  borderRadius="xl"
                  border="2px"
                  borderColor={profile?.experienceLevel === level.value ? 'accent.500' : 'whiteAlpha.200'}
                  bg={profile?.experienceLevel === level.value ? 'whiteAlpha.100' : 'transparent'}
                  cursor="pointer"
                  onClick={() => updateProfile({ experienceLevel: level.value as any })}
                  _hover={{ borderColor: 'accent.500', bg: 'whiteAlpha.100' }}
                  transition="all 0.2s"
                >
                  <VStack align="start" spacing={2}>
                    <Heading size="md">{level.label}</Heading>
                    <Text color="gray.400">{level.description}</Text>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        )

      case 'goals':
        return (
          <VStack spacing={6} align="stretch">
            <Heading size="lg">Your Fitness Goals</Heading>
            <Text color="gray.400">What do you want to achieve?</Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {commonGoals.map((goal) => (
                <Box
                  key={goal}
                  p={6}
                  borderRadius="xl"
                  border="2px"
                  borderColor={profile?.goals.includes(goal) ? 'accent.500' : 'whiteAlpha.200'}
                  bg={profile?.goals.includes(goal) ? 'whiteAlpha.100' : 'transparent'}
                  cursor="pointer"
                  onClick={() => {
                    const currentGoals = profile?.goals || []
                    const newGoals = currentGoals.includes(goal)
                      ? currentGoals.filter(g => g !== goal)
                      : [...currentGoals, goal]
                    updateProfile({ goals: newGoals })
                  }}
                  _hover={{ borderColor: 'accent.500', bg: 'whiteAlpha.100' }}
                  transition="all 0.2s"
                >
                  <Text fontSize="lg">{goal}</Text>
                </Box>
              ))}
            </SimpleGrid>
            <InputGroup size="lg">
              <Input
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                placeholder="Add a custom goal"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleAddGoal}>
                  Add
                </Button>
              </InputRightElement>
            </InputGroup>
          </VStack>
        )

      case 'schedule':
        return (
          <VStack spacing={6} align="stretch">
            <Heading size="lg">Workout Schedule</Heading>
            <Text color="gray.400">When do you prefer to train?</Text>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
              {workoutDays.map((day) => (
                <Box
                  key={day}
                  p={4}
                  borderRadius="xl"
                  border="2px"
                  borderColor={profile?.preferredWorkoutDays.includes(day) ? 'accent.500' : 'whiteAlpha.200'}
                  bg={profile?.preferredWorkoutDays.includes(day) ? 'whiteAlpha.100' : 'transparent'}
                  cursor="pointer"
                  onClick={() => handleToggleWorkoutDay(day)}
                  _hover={{ borderColor: 'accent.500', bg: 'whiteAlpha.100' }}
                  transition="all 0.2s"
                  textAlign="center"
                >
                  <Text fontSize="lg">{day}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        )

      case 'details':
        return (
          <VStack spacing={6} align="stretch">
            <Heading size="lg">Additional Details</Heading>
            <Text color="gray.400">Tell us more about yourself</Text>
            <FormControl>
              <FormLabel>Height (cm)</FormLabel>
              <NumberInput
                min={100}
                max={250}
                value={profile?.height || ''}
                onChange={(_, value) => updateProfile({ height: value })}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl>
              <FormLabel>Weight (kg)</FormLabel>
              <NumberInput
                min={30}
                max={200}
                value={profile?.weight || ''}
                onChange={(_, value) => updateProfile({ weight: value })}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl>
              <FormLabel>Bio</FormLabel>
              <Textarea
                value={profile?.bio || ''}
                onChange={(e) => updateProfile({ bio: e.target.value })}
                placeholder="Tell us about yourself and your fitness journey"
                rows={4}
              />
            </FormControl>
          </VStack>
        )

      default:
        return null
    }
  }

  return (
    <MainContainer>
      <VStack spacing={8} align="stretch" w="100%">
        {isEditing ? (
          <>
            <Progress value={(currentStep / (steps.length - 1)) * 100} colorScheme="accent" borderRadius="full" />
            <Box
              bg="brand.100"
              p={8}
              borderRadius="xl"
              boxShadow="xl"
              border="1px"
              borderColor="whiteAlpha.200"
              transition="all 0.3s"
            >
              {renderStep()}
            </Box>
            <HStack justify="space-between">
              <Button
                leftIcon={<FaArrowLeft />}
                onClick={handleBack}
                isDisabled={currentStep === 0}
                variant="outline"
              >
                Back
              </Button>
              <Button
                rightIcon={currentStep === steps.length - 1 ? undefined : <FaArrowRight />}
                onClick={handleNext}
                colorScheme="accent"
                isDisabled={
                  (currentStep === 0 && !profile?.name) ||
                  (currentStep === 1 && !profile?.experienceLevel) ||
                  (currentStep === 2 && (!profile?.goals || profile.goals.length === 0)) ||
                  (currentStep === 3 && (!profile?.preferredWorkoutDays || profile.preferredWorkoutDays.length === 0))
                }
              >
                {currentStep === steps.length - 1 ? 'Complete Profile' : 'Next'}
              </Button>
            </HStack>
          </>
        ) : (
          <>
            <VStack spacing={8} align="stretch">
              <Box textAlign="center" py={8}>
                <Heading size="2xl" mb={2} bgGradient="linear(to-r, accent.500, accent.600)" bgClip="text">
                  {profile?.name}
                </Heading>
                <Text fontSize="xl" color="gray.400">
                  {profile?.experienceLevel
                    ? profile.experienceLevel.charAt(0).toUpperCase() + profile.experienceLevel.slice(1) + ' Level'
                    : ''}
                </Text>
              </Box>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                <Box bg="brand.100" p={6} borderRadius="xl" boxShadow="xl" border="1px" borderColor="whiteAlpha.200">
                  <VStack align="start" spacing={4}>
                    <Heading size="md">About Me</Heading>
                    {profile?.bio && (
                      <Text color="gray.300">{profile.bio}</Text>
                    )}
                    <HStack spacing={4} wrap="wrap">
                      {profile?.height && (
                        <Tag size="lg" variant="subtle" colorScheme="accent">
                          <TagLabel>Height: {profile.height} cm</TagLabel>
                        </Tag>
                      )}
                      {profile?.weight && (
                        <Tag size="lg" variant="subtle" colorScheme="accent">
                          <TagLabel>Weight: {profile.weight} kg</TagLabel>
                        </Tag>
                      )}
                    </HStack>
                  </VStack>
                </Box>

                <Box bg="brand.100" p={6} borderRadius="xl" boxShadow="xl" border="1px" borderColor="whiteAlpha.200">
                  <VStack align="start" spacing={4}>
                    <Heading size="md">Fitness Goals</Heading>
                    <HStack spacing={2} wrap="wrap">
                      {profile?.goals.map((goal) => (
                        <Tag
                          key={goal}
                          size="lg"
                          borderRadius="full"
                          variant="solid"
                          colorScheme="accent"
                        >
                          <TagLabel>{goal}</TagLabel>
                        </Tag>
                      ))}
                    </HStack>
                  </VStack>
                </Box>

                <Box bg="brand.100" p={6} borderRadius="xl" boxShadow="xl" border="1px" borderColor="whiteAlpha.200">
                  <VStack align="start" spacing={4}>
                    <Heading size="md">Workout Schedule</Heading>
                    <SimpleGrid columns={{ base: 2, md: 4 }} spacing={2}>
                      {workoutDays.map((day) => (
                        <Tag
                          key={day}
                          size="lg"
                          borderRadius="full"
                          variant={profile?.preferredWorkoutDays.includes(day) ? "solid" : "outline"}
                          colorScheme={profile?.preferredWorkoutDays.includes(day) ? "green" : "gray"}
                        >
                          <TagLabel>{day}</TagLabel>
                        </Tag>
                      ))}
                    </SimpleGrid>
                  </VStack>
                </Box>

                <Box bg="brand.100" p={6} borderRadius="xl" boxShadow="xl" border="1px" borderColor="whiteAlpha.200">
                  <VStack align="start" spacing={4}>
                    <Heading size="md">Achievements</Heading>
                    <SimpleGrid columns={2} spacing={4} w="100%">
                      <Box>
                        <Text fontSize="sm" color="gray.400">Total Workouts</Text>
                        <Text fontSize="2xl" fontWeight="bold" color="accent.500">{quests?.filter(q => q.isCompleted).length || 0}</Text>
                      </Box>
                      <Box>
                        <Text fontSize="sm" color="gray.400">Quests Completed</Text>
                        <Text fontSize="2xl" fontWeight="bold" color="accent.500">{quests?.filter(q => q.isCompleted).length || 0}</Text>
                      </Box>
                      <Box>
                        <Text fontSize="sm" color="gray.400">Rewards Earned</Text>
                        <Text fontSize="2xl" fontWeight="bold" color="accent.500">{quests?.filter(q => q.isCompleted).reduce((sum, q) => sum + q.reward, 0) || 0}</Text>
                      </Box>
                      <Box>
                        <Text fontSize="sm" color="gray.400">Current Streak</Text>
                        <Text fontSize="2xl" fontWeight="bold" color="accent.500">{streak} days</Text>
                      </Box>
                    </SimpleGrid>
                  </VStack>
                </Box>
              </SimpleGrid>

              <Box textAlign="center" pt={4}>
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="solid"
                  size="lg"
                  colorScheme="accent"
                >
                  Edit Profile
                </Button>
              </Box>
            </VStack>
          </>
        )}
      </VStack>
    </MainContainer>
  )
}

export default Profile 