import { Box, Button, Flex, Text, useToast } from '@chakra-ui/react';
import { useCounter } from '../context/CounterContext';

// ─── Check Circle Icon ────────────────────────────────────────────────────────
// Custom SVG to match the outlined circle-check shown in the Figma design

function CheckCircleIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <circle cx="12" cy="12" r="10.25" stroke="#74C898" strokeWidth="1.5" />
      <path
        d="M8.5 12.5L10.5 15L15.5 9"
        stroke="#74C898"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Custom Toast ─────────────────────────────────────────────────────────────
// Matches the Figma spec: dark background, green radial gradient, gradient border

interface CounterToastProps {
  newCount: number;
}

function CounterToast({ newCount }: CounterToastProps) {
  return (
    // Outer wrapper creates the gradient border via a 1px gradient padding
    <Box
      display="inline-flex"
      borderRadius="8px"
      p="1px"
      background="radial-gradient(53.57% 282.15% at 2.14% 50%, rgba(116, 200, 152, 0.65) 0%, rgba(116, 200, 152, 0.1) 100%)"
      boxShadow="0px 0px 0px 1px rgba(40, 41, 50, 0.04), 0px 2px 2px -1px rgba(40, 41, 50, 0.04), 0px 4px 4px -2px rgba(40, 41, 50, 0.04), 0px 8px 8px -4px rgba(40, 41, 50, 0.06), 0px 16px 32px rgba(40, 41, 50, 0.06)"
    >
      {/* Inner box: the actual content with dark background + green radial overlay */}
      <Flex
        flexDirection="row"
        alignItems="center"
        padding="12px 20px 12px 16px"
        gap="8px"
        borderRadius="7px"
        background="radial-gradient(53.57% 282.15% at 2.14% 50%, rgba(116, 200, 152, 0.15) 0%, rgba(116, 200, 152, 0.03) 100%), #46474F"
        minW="220px"
      >
        <CheckCircleIcon />
        <Box>
          <Text
            fontFamily="Inter, sans-serif"
            fontWeight="700"
            fontSize="15px"
            lineHeight="20px"
            color="#FFFFFF"
            mb="1px"
          >
            Incremented
          </Text>
          <Text
            fontFamily="Inter, sans-serif"
            fontWeight="400"
            fontSize="13px"
            lineHeight="16px"
            color="rgba(255, 255, 255, 0.75)"
          >
            Counter is now {newCount}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

// ─── Counter Component ────────────────────────────────────────────────────────

export function Counter() {
  const { count, increment } = useCounter();
  const toast = useToast();

  const handleIncrement = () => {
    increment();
    const newCount = count + 1;

    toast({
      position: 'bottom-right',
      duration: 3000,
      isClosable: false,
      render: () => <CounterToast newCount={newCount} />,
    });
  };

  return (
    <Flex
      minH="100vh"
      alignItems="center"
      justifyContent="center"
      gap={4}
      bg="white"
    >
      <Text
        fontFamily="Inter, sans-serif"
        fontSize="16px"
        color="gray.600"
        fontWeight="400"
      >
        Current count {count}
      </Text>

      <Button
        onClick={handleIncrement}
        bg="gray.100"
        color="gray.500"
        fontWeight="500"
        fontSize="14px"
        fontFamily="Inter, sans-serif"
        borderRadius="8px"
        px={4}
        h="auto"
        py="6px"
        _hover={{ bg: 'gray.200' }}
        _active={{ bg: 'gray.300' }}
      >
        +1
      </Button>
    </Flex>
  );
}
