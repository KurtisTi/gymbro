import { Box, Container, Flex, Button, HStack, Icon, Text, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { FaDumbbell, FaQrcode, FaTrophy, FaUser, FaMedal, FaGift, FaChevronDown } from 'react-icons/fa'

const Navbar = () => {
  return (
    <Box
      bg="rgba(24,25,26,0.35)"
      borderBottom="1px"
      borderColor="whiteAlpha.400"
      position="sticky"
      top={0}
      zIndex={1000}
      sx={{
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: '0 4px 32px 0 rgba(0,0,0,0.10)',
        borderBottom: '2px solid rgba(255,255,255,0.18)',
      }}
    >
      <Container w="100%" maxW="1400px" mx="auto">
        <Flex h={20} alignItems="center" justifyContent="space-between">
          <HStack spacing={8} alignItems="center">
            <RouterLink to="/">
              <HStack spacing={3}>
                <Icon as={FaDumbbell} boxSize={8} color="accent.500" />
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                  bgGradient="linear(to-r, accent.500, accent.600)"
                  bgClip="text"
                >
                  GymBro
                </Text>
              </HStack>
            </RouterLink>
          </HStack>

          <HStack spacing={6}>
            <Button
              as={RouterLink}
              to="/protein-scanner"
              variant="ghost"
              leftIcon={<FaQrcode />}
              size="lg"
              fontSize="lg"
              _hover={{
                bg: 'whiteAlpha.200',
              }}
            >
              Scanner
            </Button>
            <Menu>
              <MenuButton as={Button} rightIcon={<FaChevronDown />} variant="ghost" size="lg" fontSize="lg">
                Progress
              </MenuButton>
              <MenuList bg="brand.100" borderColor="whiteAlpha.200">
                <MenuItem as={RouterLink} to="/achievements" icon={<FaMedal />}>
                  Achievements
                </MenuItem>
                <MenuItem as={RouterLink} to="/quests" icon={<FaDumbbell />}>
                  Quests
                </MenuItem>
                <MenuItem as={RouterLink} to="/rewards" icon={<FaGift />}>
                  Rewards
                </MenuItem>
              </MenuList>
            </Menu>
            <Button
              as={RouterLink}
              to="/profile"
              variant="ghost"
              leftIcon={<FaUser />}
              size="lg"
              fontSize="lg"
              _hover={{
                bg: 'whiteAlpha.200',
              }}
            >
              Profile
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}

export default Navbar 