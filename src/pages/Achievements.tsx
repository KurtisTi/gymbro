import { Box, Heading, VStack, SimpleGrid, Text, Button, Tag, TagLabel, HStack, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react'
import MainContainer from '../components/MainContainer'
import { useAchievements, Achievement } from '../context/AchievementsContext'
import { useState } from 'react'
import { FaTrophy, FaMedal, FaStar } from 'react-icons/fa'

const Achievements = () => {
  const { achievements, completeAchievement, resetAchievements } = useAchievements()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)

  const handleView = (ach: Achievement) => {
    setSelectedAchievement(ach)
    onOpen()
  }

  return (
    <MainContainer>
      <VStack spacing={8} align="stretch" w="100%">
        <Button colorScheme="red" variant="outline" alignSelf="flex-end" mb={2} onClick={resetAchievements}>
          Reset Progress
        </Button>
        <Box textAlign="center">
          <Heading size="2xl" mb={2}>
            Achievements
          </Heading>
          <Text color="gray.400" fontSize="lg">
            High-level fitness milestones. No rewards, just glory!
          </Text>
        </Box>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {achievements.map((ach: Achievement, idx: number) => (
            <Box
              key={ach.id}
              bg="brand.100"
              p={6}
              borderRadius="xl"
              boxShadow="xl"
              border="2px"
              borderColor={ach.isCompleted ? 'green.400' : 'whiteAlpha.200'}
              opacity={ach.isCompleted ? 1 : 0.85}
              position="relative"
              transition="box-shadow 0.3s, border-color 0.3s, transform 0.3s"
              _hover={ach.isCompleted ? { boxShadow: '0 0 24px #39ff14, 0 0 48px #39ff14' } : { boxShadow: 'xl', transform: 'scale(1.03)' }}
              sx={ach.isCompleted ? { boxShadow: '0 0 16px #39ff14, 0 0 32px #39ff14' } : {}}
            >
              <VStack align="start" spacing={3}>
                <HStack spacing={3}>
                  {/* Icon based on index for variety */}
                  {idx % 3 === 0 && <FaTrophy color="#FFD700" size={28} />}
                  {idx % 3 === 1 && <FaMedal color="#C0C0C0" size={28} />}
                  {idx % 3 === 2 && <FaStar color="#FFB300" size={28} />}
                  <Heading size="md">{ach.title}</Heading>
                  {ach.isCompleted && (
                    <Tag colorScheme="green" size="md">
                      <TagLabel>Completed</TagLabel>
                    </Tag>
                  )}
                </HStack>
                <Text color="gray.300">{ach.description}</Text>
                <Text color="gray.500" fontSize="sm">Criteria: {ach.criteria}</Text>
                {/* Progress bar for incomplete achievements */}
                {!ach.isCompleted && (
                  <Box w="100%" pt={2}>
                    <Box h="8px" bg="gray.700" borderRadius="full" overflow="hidden">
                      <Box h="8px" bgGradient="linear(to-r, accent.500, accent.600)" w="40%" borderRadius="full" />
                    </Box>
                  </Box>
                )}
                {ach.isCompleted && ach.dateCompleted && (
                  <Text color="green.400" fontSize="sm">
                    Completed on {new Date(ach.dateCompleted).toLocaleDateString()}
                  </Text>
                )}
                <HStack>
                  {!ach.isCompleted && (
                    <Button
                      colorScheme="accent"
                      variant="solid"
                      onClick={() => completeAchievement(ach.id)}
                    >
                      Mark as Completed
                    </Button>
                  )}
                  {ach.isCompleted && (
                    <Button
                      colorScheme="brand"
                      variant="outline"
                      onClick={() => handleView(ach)}
                    >
                      View Achievement
                    </Button>
                  )}
                </HStack>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader bgGradient="linear(to-r, accent.500, accent.600)" color="white" borderTopRadius="md" display="flex" alignItems="center">
              <Box mr={3}>
                <FaTrophy color="#FFD700" size={24} />
              </Box>
              {selectedAchievement?.title}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack align="start" spacing={3}>
                <Text color="gray.300">{selectedAchievement?.description}</Text>
                <Text color="gray.500" fontSize="sm">Criteria: {selectedAchievement?.criteria}</Text>
                {selectedAchievement?.dateCompleted && (
                  <Text color="green.400" fontSize="sm">
                    Completed on {new Date(selectedAchievement.dateCompleted).toLocaleDateString()}
                  </Text>
                )}
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose} colorScheme="accent">Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </MainContainer>
  )
}

export default Achievements
