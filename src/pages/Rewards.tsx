import {
  Box,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Button,
  HStack,
  Icon,
  Image,
  Badge,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useState, useRef } from 'react'
import { FaTrophy, FaGift, FaLock, FaCoins } from 'react-icons/fa'
import MainContainer from '../components/MainContainer'
import { useQuests } from '../context/QuestsContext'
import { motion, AnimatePresence } from 'framer-motion'

const rewards = [
  {
    id: 1,
    title: 'Premium Protein Shaker',
    points: 1000,
    image: 'https://img.theproteinworks.com/v7/_media/catalog/product/cache/d37e42c448b3dbec3a8a7ecf127990cd/a/c/active_shaker.1_1.png',
    description: 'High-quality protein shaker with mixing ball',
    available: true,
  },
  {
    id: 2,
    title: 'GymBro T-Shirt',
    points: 800,
    image: 'https://img.shoplineapp.com/media/image_clips/66d2e262f74ac9000dca3c92/original.png?1725096544',
    description: 'Exclusive GymBro branded t-shirt',
    available: true,
  },
  {
    id: 3,
    title: 'Protein Powder Sample Pack',
    points: 500,
    image: 'https://content.optimumnutrition.com/i/on/on-100-casein-time-release-proteine_Image_01?$TTL_PRODUCT_IMAGES$&locale=en-us,en-gb,*',
    description: 'Try different protein flavors',
    available: true,
  },
  {
    id: 4,
    title: 'Premium Gym Membership',
    points: 5000,
    image: 'https://www.plasticresource.com/dynamic-media/products/images/membership/21622-Front.png?v=carousel&k=PN7nPxw6wDxrKPGYvTmPyw',
    description: '1 month premium gym membership',
    available: false,
  },
]

const rewardIcons = [
  '🥤', // Shaker
  '👕', // T-shirt
  '💪', // Protein
  '🎫', // Membership
]

const Rewards = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedReward, setSelectedReward] = useState<any>(null)
  const { getTotalCoins } = useQuests()
  const [userCoins, setUserCoins] = useState(getTotalCoins())
  const [currentIdx, setCurrentIdx] = useState(0)
  const [dragStartX, setDragStartX] = useState<number | null>(null)
  const [dragDelta, setDragDelta] = useState(0)
  const dragging = useRef(false)

  const handleRedeem = (reward: any) => {
    setSelectedReward(reward)
    onOpen()
  }

  const handleConfirmRedeem = () => {
    if (selectedReward && userCoins >= selectedReward.points) {
      setUserCoins(userCoins - selectedReward.points)
      onClose()
    }
  }

  const handleDragStart = (e: React.PointerEvent) => {
    setDragStartX(e.clientX)
    dragging.current = true
  }
  const handleDragMove = (e: React.PointerEvent) => {
    if (dragStartX !== null && dragging.current) {
      setDragDelta(e.clientX - dragStartX)
    }
  }
  const handleDragEnd = () => {
    if (!dragging.current) return
    if (dragDelta < -80 && currentIdx < rewards.length - 1) {
      setCurrentIdx(currentIdx + 1)
    } else if (dragDelta > 80 && currentIdx > 0) {
      setCurrentIdx(currentIdx - 1)
    }
    setDragStartX(null)
    setDragDelta(0)
    dragging.current = false
  }

  const getIndex = (offset: number) => {
    const len = rewards.length
    return (currentIdx + offset + len) % len
  }

  return (
    <MainContainer>
      <VStack spacing={8} align="stretch" w="100%">
        <Box textAlign="center" mt={4} mb={-2}>
          <HStack justify="center" spacing={4}>
            <Box
              bgGradient="linear(to-r, yellow.400, yellow.200, yellow.400)"
              px={6}
              py={3}
              borderRadius="full"
              boxShadow="0 0 32px #FFD70088"
              display="flex"
              alignItems="center"
              fontWeight="extrabold"
              fontSize="2xl"
              color="white"
              letterSpacing="wider"
              animation="coinGlow 1.5s infinite alternate"
              style={{ filter: 'drop-shadow(0 0 12px #FFD700)' }}
            >
              <FaCoins style={{ marginRight: 12, color: 'white', fontSize: 32 }} />
              {userCoins} Coins
            </Box>
          </HStack>
        </Box>

        {/* Subtle note below coin counter */}
        <Box textAlign="center" mt={1} mb={-4}>
          <Text fontSize="sm" color="accent.500" fontWeight="semibold">
            New rewards are added monthly. Keep earning coins for epic loot!
          </Text>
        </Box>

        <Box w="100%" display="flex" justifyContent="center" alignItems="center" minH="60vh" userSelect="none" position="relative" overflow="visible">
          <Box position="relative" width="480px" height="420px" display="flex" alignItems="center" justifyContent="center">
            <AnimatePresence initial={false}>
              <motion.div
                key={getIndex(-1)}
                style={{ position: 'absolute', left: 0, top: 40, width: 240, zIndex: 1, pointerEvents: 'none' }}
                initial={{ opacity: 0, x: -80, scale: 0.7, rotateY: 40 }}
                animate={{ opacity: 0.7, x: 0, scale: 0.85, rotateY: 40 }}
                exit={{ opacity: 0, x: -80, scale: 0.7, rotateY: 40 }}
                transition={{ type: 'spring', stiffness: 200, damping: 30 }}
              >
                <Image
                  src={rewards[getIndex(-1)].image}
                  alt={rewards[getIndex(-1)].title}
                  w="220px"
                  h="220px"
                  objectFit="contain"
                  borderRadius="xl"
                  opacity={0.7}
                  filter="blur(1px) grayscale(0.5)"
                  boxShadow="none"
                  bg="none"
                />
              </motion.div>
            </AnimatePresence>
            <AnimatePresence initial={false}>
              <motion.div
                key={currentIdx}
                style={{ position: 'absolute', left: 80, top: 0, width: 320, zIndex: 2, cursor: 'grab', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                initial={{ scale: 0.8, opacity: 0, x: dragDelta > 0 ? 120 : -120 }}
                animate={{ scale: 1.1, opacity: 1, x: 0 }}
                exit={{ scale: 0.8, opacity: 0, x: dragDelta > 0 ? -120 : 120 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                onPointerDown={handleDragStart}
                onPointerMove={handleDragMove}
                onPointerUp={handleDragEnd}
                onPointerLeave={handleDragEnd}
              >
                <Image
                  src={rewards[currentIdx].image}
                  alt={rewards[currentIdx].title}
                  w="320px"
                  h="320px"
                  objectFit="contain"
                  mb={4}
                  borderRadius="2xl"
                  boxShadow="none"
                  bg="none"
                />
                <Heading size="lg" color="white" mb={2} textAlign="center" bg="none" boxShadow="none">
                  {rewards[currentIdx].title}
                </Heading>
                <Text color="gray.300" fontSize="lg" mb={2} textAlign="center">
                  {rewards[currentIdx].description}
                </Text>
                <HStack spacing={4} mb={4}>
                  <Text fontWeight="bold" color={userCoins >= rewards[currentIdx].points ? 'yellow.300' : 'gray.500'} fontSize="2xl">
                    <FaCoins style={{ marginRight: 4, color: 'white', display: 'inline' }} />
                    {rewards[currentIdx].points}
                  </Text>
                  {rewards[currentIdx].available ? (
                    userCoins >= rewards[currentIdx].points ? (
                      <Button
                        colorScheme="accent"
                        size="lg"
                        fontWeight="bold"
                        px={8}
                        py={3}
                        borderRadius="full"
                        boxShadow="0 0 16px #39ff14"
                        _hover={{ boxShadow: '0 0 32px #39ff14', transform: 'scale(1.08)' }}
                        onClick={() => handleRedeem(rewards[currentIdx])}
                      >
                        Redeem
                      </Button>
                    ) : (
                      <Button
                        leftIcon={<FaLock />}
                        size="lg"
                        isDisabled
                        variant="outline"
                        colorScheme="gray"
                      >
                        Insufficient coins
                      </Button>
                    )
                  ) : (
                    <Button
                      leftIcon={<FaLock />}
                      size="lg"
                      isDisabled
                      variant="outline"
                      colorScheme="gray"
                    >
                      Locked
                    </Button>
                  )}
                </HStack>
              </motion.div>
            </AnimatePresence>
            <AnimatePresence initial={false}>
              <motion.div
                key={getIndex(1)}
                style={{ position: 'absolute', right: 0, top: 40, width: 240, zIndex: 1, pointerEvents: 'none' }}
                initial={{ opacity: 0, x: 80, scale: 0.7, rotateY: -40 }}
                animate={{ opacity: 0.7, x: 0, scale: 0.85, rotateY: -40 }}
                exit={{ opacity: 0, x: 80, scale: 0.7, rotateY: -40 }}
                transition={{ type: 'spring', stiffness: 200, damping: 30 }}
              >
                <Image
                  src={rewards[getIndex(1)].image}
                  alt={rewards[getIndex(1)].title}
                  w="220px"
                  h="220px"
                  objectFit="contain"
                  borderRadius="xl"
                  opacity={0.7}
                  filter="blur(1px) grayscale(0.5)"
                  boxShadow="none"
                  bg="none"
                />
              </motion.div>
            </AnimatePresence>
          </Box>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent bg="brand.100" color="white" borderRadius="xl">
            <ModalHeader fontWeight="bold" fontSize="2xl" textAlign="center">
              🎉 Redeem Reward
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              {selectedReward && (
                <VStack spacing={4} align="stretch">
                  <Text fontSize="lg" color="yellow.200" fontWeight="bold">
                    Are you sure you want to redeem {selectedReward.title} for {selectedReward.points} coins?
                  </Text>
                  <Button
                    colorScheme="accent"
                    size="lg"
                    fontWeight="bold"
                    borderRadius="full"
                    boxShadow="0 0 16px #39ff14"
                    _hover={{ boxShadow: '0 0 32px #39ff14', transform: 'scale(1.06)' }}
                    onClick={handleConfirmRedeem}
                    isDisabled={userCoins < selectedReward.points}
                  >
                    Confirm Redemption
                  </Button>
                  {userCoins < selectedReward.points && (
                    <Text color="red.300" fontWeight="bold">You don't have enough coins!</Text>
                  )}
                  {userCoins >= selectedReward.points && (
                    <Text color="green.300" fontWeight="bold">New Balance: {userCoins - selectedReward.points} coins</Text>
                  )}
                </VStack>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      </VStack>
    </MainContainer>
  )
}

export default Rewards 