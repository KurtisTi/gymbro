import { Box, BoxProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface MainContainerProps extends BoxProps {
  children: ReactNode
}

const MainContainer = ({ children, ...rest }: MainContainerProps) => (
  <Box maxW="1400px" mx="auto" p={8} {...rest}>
    {children}
  </Box>
)

export default MainContainer 