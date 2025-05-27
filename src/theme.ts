import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: {
      50: '#18191A',
      100: '#23272A',
      200: '#404040',
      300: '#535353',
      400: '#666666',
      500: '#808080',
      600: '#999999',
      700: '#b3b3b3',
      800: '#cccccc',
      900: '#e6e6e6',
    },
    accent: {
      500: '#85193C',
      600: '#85193C',
    },
    gradient: {
      primary: 'linear-gradient(135deg, #85193C 0%, #4ECDC4 100%)',
      secondary: 'linear-gradient(135deg, #4ECDC4 0%, #45B7AF 100%)',
      dark: 'linear-gradient(135deg, #2D3748 0%, #1A202C 100%)',
    }
  },
  shadows: {
    ...extendTheme().shadows,
    neonAccent: '0 0 8px #85193C, 0 0 16px #FF4F8B, 0 0 24px #85193C',
  },
  textShadows: {
    neonAccent: '0 0 8px #85193C, 0 0 16px #FF4F8B',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'lg',
      },
      variants: {
        solid: {
          background: 'none',
          backgroundImage: 'linear-gradient(135deg, #85193C 0%, #4ECDC4 100%)',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          border: 'none',
          color: 'white',
          _hover: {
            backgroundImage: 'linear-gradient(135deg, #4ECDC4 0%, #45B7AF 100%)',
            transform: 'translateY(-2px)',
          },
          _active: {
            backgroundImage: 'linear-gradient(135deg, #4ECDC4 0%, #45B7AF 100%)',
            transform: 'translateY(0)',
          },
        },
        ghost: {
          _hover: {
            bg: 'whiteAlpha.200',
          },
        },
      },
      defaultProps: {
        colorScheme: 'brand',
      },
    },
    Card: {
      baseStyle: {
        container: {
          bg: 'brand.100',
          borderRadius: 'xl',
          boxShadow: 'xl',
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'brand.50',
        color: 'white',
      },
    },
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
})

export default theme 