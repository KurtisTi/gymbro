import { Box, Heading, VStack, Text, Button, HStack, Icon, Progress } from '@chakra-ui/react'
import MainContainer from '../components/MainContainer'
import { useQuests, Quest } from '../context/QuestsContext'
import { FaCheck, FaCoins } from 'react-icons/fa'

const Quests = () => {
  const { quests, completeQuest, getTotalCoins } = useQuests()
  const dailyQuests = quests.filter(q => q.type === 'daily')
  const weeklyQuests = quests.filter(q => q.type === 'weekly')

  const renderQuest = (quest: Quest) => (
    <Box
      key={quest.id}
      bg="brand.100"
      p={6}
      borderRadius="xl"
      boxShadow="xl"
      border="1px"
      borderColor="whiteAlpha.200"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box>
        <Heading size="md" mb={1}>{quest.name}</Heading>
        <Text color="gray.300" mb={2}>{quest.description}</Text>
        <HStack mb={2} spacing={2}>
          <Icon as={FaCoins} color="yellow.400" />
          <Text color="yellow.300" fontWeight="bold">{quest.reward} coins</Text>
        </HStack>
        {quest.isCompleted && quest.dateCompleted && (
          <Text color="green.400" fontSize="sm">
            Completed on {new Date(quest.dateCompleted).toLocaleDateString()}
          </Text>
        )}
      </Box>
      <Box>
        {quest.isCompleted ? (
          <Button
            leftIcon={<Icon as={FaCheck} />}
            colorScheme="green"
            variant="solid"
            size="lg"
            isDisabled
          >
            Completed
          </Button>
        ) : (
          <Button
            colorScheme="accent"
            variant="solid"
            size="lg"
            onClick={() => completeQuest(quest.id)}
          >
            Complete Quest
          </Button>
        )}
      </Box>
    </Box>
  )

  return (
    <MainContainer>
      <VStack spacing={8} align="stretch" w="100%">
        <Box textAlign="center">
          <Heading size="2xl" mb={2}>
            Quests
          </Heading>
          <Text color="gray.400" fontSize="lg">
            Take on memorable challenges and track your progress!
          </Text>
          <HStack justify="center" mt={4} spacing={2}>
            <Icon as={FaCoins} color="yellow.400" boxSize={6} />
            <Text color="yellow.200" fontWeight="bold" fontSize="2xl">
              {getTotalCoins()} coins
            </Text>
          </HStack>
        </Box>
        <VStack spacing={10} align="stretch">
          <Box>
            <Heading size="lg" mb={4} color="accent.500">Daily Quests</Heading>
            <VStack spacing={6} align="stretch">
              {dailyQuests.length > 0 ? dailyQuests.map(renderQuest) : <Text color="gray.500">No daily quests.</Text>}
            </VStack>
          </Box>
          <Box mb={2}>
            <Heading size="md" mb={2} color="accent.500">Daily Quest Progress</Heading>
            <Progress
              value={dailyQuests.length === 0 ? 0 : (dailyQuests.filter(q => q.isCompleted).length / dailyQuests.length) * 100}
              colorScheme="accent"
              size="lg"
              borderRadius="full"
              mb={2}
            />
            <Text color="gray.400" fontWeight="bold" textAlign="right">
              {`Daily Progress: ${dailyQuests.filter(q => q.isCompleted).length} / ${dailyQuests.length}`}
            </Text>
          </Box>
          <Box>
            <Heading size="lg" mb={4} color="accent.500">Weekly Quests</Heading>
            <VStack spacing={6} align="stretch">
              {weeklyQuests.length > 0 ? weeklyQuests.map(renderQuest) : <Text color="gray.500">No weekly quests.</Text>}
            </VStack>
          </Box>
        </VStack>
      </VStack>
    </MainContainer>
  )
}

export default Quests 