import { useState } from 'react'
import {
  Box,
  VStack,
  Heading,
  Text,
  Input,
  Button,
  Image,
  Spinner,
  Alert,
  AlertIcon,
  HStack,
  List,
  ListItem,
  ListIcon,
  Divider,
  SimpleGrid,
  Flex,
} from '@chakra-ui/react'
import { FaCheckCircle, FaChevronDown, FaChevronUp, FaDumbbell } from 'react-icons/fa'
import MainContainer from '../components/MainContainer'

const CLARIFAI_PAT = "f91a1a61da2744db80e5904bebb2211d"
const CLARIFAI_MODEL_ID = "food-item-recognition"
const CLARIFAI_USER_ID = "clarifai"
const CLARIFAI_APP_ID = "main"

const RAPIDAPI_KEY = '3d049de517msh326886a861ef22dp10b471jsn1f816d756202'

const ProteinScanner = () => {
  // AI Nutrition state
  const [mealDesc, setMealDesc] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState('')
  const [aiNutrition, setAiNutrition] = useState<any>(null)
  const [aiRawResponse, setAiRawResponse] = useState<any>(null)
  const [showMore, setShowMore] = useState(false)

  const handleAINutrition = async () => {
    setAiLoading(true)
    setAiError('')
    setAiNutrition(null)
    setAiRawResponse(null)
    try {
      const response = await fetch(
        'https://ai-nutritional-facts.p.rapidapi.com/getNutritionalInfo',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-rapidapi-host': 'ai-nutritional-facts.p.rapidapi.com',
            'x-rapidapi-key': RAPIDAPI_KEY,
          },
          body: JSON.stringify({ input: mealDesc }),
        }
      )
      const data = await response.json()
      setAiRawResponse(data)
      if (data && (data["calories in kcal"] || data["protein in g"])) {
        setAiNutrition(data)
      } else {
        setAiError('No nutrition info found for this description.')
      }
    } catch (e) {
      setAiError('Error fetching nutrition info.')
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <MainContainer>
      <VStack spacing={12} align="center" w="100%" minH="70vh" justify="center">
        {/* Hero Icon and Headline */}
        <Box textAlign="center" mt={8}>
          <Box
            as={FaDumbbell}
            boxSize={{ base: 20, md: 28 }}
            color="accent.500"
            mb={4}
            filter="drop-shadow(0 0 24px #85193C88)"
            mx="auto"
          />
          <Heading size="2xl" mb={2} bgGradient="linear(to-r, accent.500, accent.600)" bgClip="text">
            AI Protein & Nutrition Scanner
          </Heading>
          <Text fontSize="xl" color="gray.400" maxW="lg" mx="auto">
            Instantly estimate nutrition facts for any meal. Just describe your food and let AI do the rest!
          </Text>
        </Box>
        {/* AI Nutrition Section */}
        <Box
          w="100%"
          maxW="800px"
          bgGradient="linear(to-br, #23272A 60%, #85193C 100%)"
          boxShadow="0 8px 32px 0 #85193C33"
          borderRadius="2xl"
          p={{ base: 4, sm: 8, md: 12 }}
          mt={4}
        >
          <Heading size="md" mb={4} color="white" textAlign="center">
            AI Meal Nutrition Analysis
          </Heading>
          <HStack spacing={4} align="start" justify="center">
            <Input
              placeholder="Describe your meal (e.g. 6oz salmon, half avocado...)"
              value={mealDesc}
              onChange={e => setMealDesc(e.target.value)}
              size="lg"
              maxW="400px"
              bg="whiteAlpha.100"
              color="white"
              borderRadius="xl"
              boxShadow="md"
              _placeholder={{ color: 'gray.400' }}
              _focus={{ borderColor: 'accent.500', boxShadow: '0 0 0 2px #85193C88' }}
              onKeyDown={e => {
                if (e.key === 'Enter' && mealDesc && !aiLoading) {
                  handleAINutrition()
                }
              }}
            />
            <Button
              colorScheme="accent"
              size="lg"
              px={8}
              py={6}
              borderRadius="xl"
              fontSize="lg"
              fontWeight="bold"
              boxShadow="0 2px 16px 0 #85193C55"
              transition="all 0.2s"
              _hover={{
                transform: 'translateY(-2px) scale(1.04)',
                boxShadow: '0 4px 32px 0 #85193C99',
                bg: 'accent.600',
              }}
              onClick={handleAINutrition}
              isLoading={aiLoading}
              disabled={!mealDesc}
            >
              Analyze
            </Button>
          </HStack>
          {aiLoading && <Spinner size="xl" color="accent.500" alignSelf="center" mt={6} />}
          {aiError && (
            <Alert status="error" borderRadius="md" mt={4}>
              <AlertIcon />
              {aiError}
            </Alert>
          )}
          {aiError && aiRawResponse && (
            <Box mt={2} bg="gray.800" p={4} borderRadius="md" fontSize="sm" color="gray.200" overflowX="auto">
              <pre style={{ margin: 0 }}>{JSON.stringify(aiRawResponse, null, 2)}</pre>
            </Box>
          )}
          {aiNutrition && (() => {
            // Parse values as numbers (fallback to 0 if missing or NaN)
            const protein = Number(aiNutrition["protein in g"] ?? 0)
            const carbs = Number(aiNutrition["total carbohydrate in g"] ?? 0)
            const fat = Number(aiNutrition["total fat in g"] ?? 0)
            // Pair with label and key
            const macros = [
              { label: 'Protein', value: protein, key: 'protein in g', unit: 'g', raw: aiNutrition["protein in g"] },
              { label: 'Carbs', value: carbs, key: 'total carbohydrate in g', unit: 'g', raw: aiNutrition["total carbohydrate in g"] },
              { label: 'Fat', value: fat, key: 'total fat in g', unit: 'g', raw: aiNutrition["total fat in g"] },
            ]
            // Sort by value descending
            const sorted = [...macros].sort((a, b) => b.value - a.value)
            // Assign colors and glow
            const colorMap = ["red.400", "blue.300", "green.300"]
            const glowMap = [
              '0 0 16px #e53e3e, 0 0 32px #e53e3e',
              '0 0 16px #63b3ed, 0 0 32px #63b3ed',
              '0 0 16px #68d391, 0 0 32px #68d391',
            ]
            const colorByKey = Object.fromEntries(sorted.map((f, i) => [f.key, colorMap[i]]))
            const glowByKey = Object.fromEntries(sorted.map((f, i) => [f.key, glowMap[i]]))
            return (
              <Box bg="brand.100" p={8} borderRadius="xl" boxShadow="xl" border="1px" borderColor="whiteAlpha.200" mt={4} position="relative">
                {/* Calories in corner */}
                <Box position="absolute" top={4} right={4} bg="accent.500" color="white" px={4} py={2} borderRadius="lg" fontWeight="bold" fontSize="lg" boxShadow="0 0 12px #85193C">
                  {aiNutrition["calories in kcal"]} kcal
                </Box>
                <VStack spacing={6} align="stretch">
                  <Heading size="md">Nutrition Facts</Heading>
                  <Text color="gray.300">{mealDesc}</Text>
                  {/* Main macros as glowing boxes */}
                  <SimpleGrid columns={3} spacing={8} w="100%" justifyItems="center">
                    {macros.map(macro => (
                      <Box
                        key={macro.key}
                        bg="whiteAlpha.100"
                        color={colorByKey[macro.key]}
                        borderRadius="xl"
                        px={8}
                        py={6}
                        minW="120px"
                        maxW="220px"
                        textAlign="center"
                        fontWeight="bold"
                        fontSize="2xl"
                        boxShadow={glowByKey[macro.key]}
                        borderWidth={2}
                        borderColor={colorByKey[macro.key]}
                        transition="box-shadow 0.3s, border-color 0.3s"
                        w="100%"
                      >
                        {macro.label}
                        <Box fontSize="3xl" fontWeight="extrabold" mt={2}>{macro.raw}{macro.unit}</Box>
                      </Box>
                    ))}
                  </SimpleGrid>
                  {/* Toggle for other nutrients */}
                  <Button
                    onClick={() => setShowMore(v => !v)}
                    variant="ghost"
                    colorScheme="accent"
                    alignSelf="center"
                    rightIcon={showMore ? <FaChevronUp /> : <FaChevronDown />}
                    mt={2}
                  >
                    {showMore ? 'Hide Other Nutrients' : 'Show Other Nutrients'}
                  </Button>
                  {showMore && (
                    <VStack spacing={2} align="stretch" bg="whiteAlpha.50" p={4} borderRadius="lg" boxShadow="md">
                      <Text color="gray.400">Fiber: {aiNutrition["dietary fiber in g"]}g</Text>
                      <Text color="gray.400">Sugar: {aiNutrition["total sugars in g"]}g</Text>
                      <Text color="gray.400">Sodium: {aiNutrition["sodium in mg"]}mg</Text>
                    </VStack>
                  )}
                </VStack>
              </Box>
            )
          })()}
        </Box>
      </VStack>
    </MainContainer>
  )
}

export default ProteinScanner 