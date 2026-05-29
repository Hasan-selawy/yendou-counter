import { Box, Button, Flex, Text, useToast } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { MAX_COUNT, useCounter } from '../context/CounterContext';

// ─── Motion wrappers ──────────────────────────────────────────────────────────

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

// ─── Check Circle Icon ────────────────────────────────────────────────────────

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

// ─── Warning Icon ─────────────────────────────────────────────────────────────

function WarningIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <circle cx="12" cy="12" r="10.25" stroke="#F6AD55" strokeWidth="1.5" />
      <path d="M12 8v5" stroke="#F6AD55" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="15.5" r="0.75" fill="#F6AD55" />
    </svg>
  );
}

// ─── Toast component ──────────────────────────────────────────────────────────

interface CounterToastProps {
  newCount: number;
  isMax?: boolean;
}

function CounterToast({ newCount, isMax = false }: CounterToastProps) {
  return (
    <MotionFlex
      initial={{ opacity: 0, x: 60, scale: 0.92 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 60, scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 420, damping: 30 }}
      display="inline-flex"
      borderRadius="8px"
      p="1px"
      background={
        isMax
          ? 'radial-gradient(53.57% 282.15% at 2.14% 50%, rgba(246,173,85,0.65) 0%, rgba(246,173,85,0.1) 100%)'
          : 'radial-gradient(53.57% 282.15% at 2.14% 50%, rgba(116, 200, 152, 0.65) 0%, rgba(116, 200, 152, 0.1) 100%)'
      }
      boxShadow="0px 0px 0px 1px rgba(40, 41, 50, 0.04), 0px 2px 2px -1px rgba(40, 41, 50, 0.04), 0px 4px 4px -2px rgba(40, 41, 50, 0.04), 0px 8px 8px -4px rgba(40, 41, 50, 0.06), 0px 16px 32px rgba(40, 41, 50, 0.06)"
    >
      <Flex
        flexDirection="row"
        alignItems="center"
        padding="12px 20px 12px 16px"
        gap="8px"
        borderRadius="7px"
        background={
          isMax
            ? 'radial-gradient(53.57% 282.15% at 2.14% 50%, rgba(246,173,85,0.15) 0%, rgba(246,173,85,0.03) 100%), #46474F'
            : 'radial-gradient(53.57% 282.15% at 2.14% 50%, rgba(116, 200, 152, 0.15) 0%, rgba(116, 200, 152, 0.03) 100%), #46474F'
        }
        minW="220px"
      >
        {isMax ? <WarningIcon /> : <CheckCircleIcon />}
        <Box>
          <Text
            fontFamily="Inter, sans-serif"
            fontWeight="700"
            fontSize="15px"
            lineHeight="20px"
            color="#FFFFFF"
            mb="1px"
          >
            {isMax ? 'Maximum reached' : 'Incremented'}
          </Text>
          <Text
            fontFamily="Inter, sans-serif"
            fontWeight="400"
            fontSize="13px"
            lineHeight="16px"
            color="rgba(255, 255, 255, 0.75)"
          >
            {isMax
              ? `Counter is capped at ${MAX_COUNT.toLocaleString()}`
              : `Counter is now ${newCount.toLocaleString()}`}
          </Text>
        </Box>
      </Flex>
    </MotionFlex>
  );
}

// ─── Animated count number ────────────────────────────────────────────────────

function AnimatedCount({ count }: { count: number }) {
  return (
    <Box
      as="span"
      display="inline-block"
      overflow="hidden"
      verticalAlign="middle"
      h="24px"
      position="relative"
      minW="2ch"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <MotionBox
          key={count}
          as="span"
          display="inline-block"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ type: 'spring', stiffness: 500, damping: 32 }}
          position="absolute"
          left={0}
          right={0}
          textAlign="center"
        >
          {count.toLocaleString()}
        </MotionBox>
      </AnimatePresence>
    </Box>
  );
}

// ─── Counter Component ────────────────────────────────────────────────────────

export function Counter() {
  const { count, isAtMax, increment, reset } = useCounter();
  const toast = useToast();

  const handleIncrement = () => {
    if (isAtMax) {
      toast({
        position: 'bottom-right',
        duration: 3000,
        isClosable: false,
        render: () => <CounterToast newCount={count} isMax />,
      });
      return;
    }

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
    <Flex minH="100vh" alignItems="center" justifyContent="center" flexDir="column" gap={6} bg="white">
      {/* Counter display */}
      <Flex alignItems="center" gap={4}>
        <Text
          fontFamily="Inter, sans-serif"
          fontSize="16px"
          color="gray.600"
          fontWeight="400"
          display="flex"
          alignItems="center"
          gap="6px"
        >
          Current count{' '}
          <AnimatedCount count={count} />
        </Text>

        {/* +1 Button with spring press */}
        <motion.div
          whileTap={{ scale: 0.88 }}
          transition={{ type: 'spring', stiffness: 600, damping: 28 }}
        >
          <Button
            onClick={handleIncrement}
            isDisabled={isAtMax}
            bg={isAtMax ? 'gray.50' : 'gray.100'}
            color={isAtMax ? 'gray.300' : 'gray.500'}
            fontWeight="500"
            fontSize="14px"
            fontFamily="Inter, sans-serif"
            borderRadius="8px"
            px={4}
            h="auto"
            py="6px"
            cursor={isAtMax ? 'not-allowed' : 'pointer'}
            _hover={isAtMax ? {} : { bg: 'gray.200' }}
            _active={isAtMax ? {} : { bg: 'gray.300' }}
            // Brand-matched green focus ring
            _focusVisible={{
              outline: 'none',
              boxShadow: '0 0 0 3px rgba(116, 200, 152, 0.45)',
            }}
            transition="background 0.15s ease, box-shadow 0.15s ease"
          >
            +1
          </Button>
        </motion.div>
      </Flex>

      {/* Reset button — only visible at max */}
      <AnimatePresence>
        {isAtMax && (
          <MotionBox
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            <Button
              onClick={reset}
              variant="ghost"
              size="sm"
              color="gray.400"
              fontFamily="Inter, sans-serif"
              fontWeight="400"
              fontSize="13px"
              _hover={{ color: 'gray.600', bg: 'gray.50' }}
              _focusVisible={{
                outline: 'none',
                boxShadow: '0 0 0 3px rgba(116, 200, 152, 0.45)',
              }}
            >
              Reset counter
            </Button>
          </MotionBox>
        )}
      </AnimatePresence>
    </Flex>
  );
}
