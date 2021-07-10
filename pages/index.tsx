import { Badge, Box, Center, Link, Heading, Stack, HStack, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

const DEBUG = process.env.NODE_ENV !== "production" && (process.env.NEXT_PUBLIC_DEBUG === "true" || false);

const dummyKeys = [
  {
    "code": "ControlRight",
    "key": "Control",
    "ctrl": true,
    "meta": false,
    "shift": false,
    "location": 2
  },
  {
    "code": "ControlLeft",
    "key": "Control",
    "ctrl": true,
    "meta": false,
    "shift": false,
    "location": 1
  },
  {
    "code": "KeyA",
    "key": "a",
    "ctrl": true,
    "meta": false,
    "shift": false,
    "location": 0
  },
  {
    "code": "KeyS",
    "key": "s",
    "ctrl": true,
    "meta": false,
    "shift": false,
    "location": 0
  },
  {
    "code": "Quote",
    "key": "Dead",
    "ctrl": true,
    "meta": false,
    "shift": false,
    "location": 0
  },
  {
    "code": "Semicolon",
    "key": ";",
    "ctrl": true,
    "meta": false,
    "shift": false,
    "location": 0
  },
  {
    "code": "Comma",
    "key": ",",
    "ctrl": true,
    "meta": false,
    "shift": false,
    "location": 0
  },
  {
    "code": "KeyV",
    "key": "v",
    "ctrl": true,
    "meta": false,
    "shift": false,
    "location": 0
  }
];

enum Location {
  Standard = 0x00,
  Left = 0x01,
  Right = 0x02,
  Numpad = 0x03
}

type KeyType = {
  code: string,
  key: string,
  ctrl: boolean,
  meta: boolean,
  shift: boolean,
  location: Location
}

const mapKey = (event: KeyboardEvent): KeyType => ({
  code: event.code,
  key: event.key,
  ctrl: event.ctrlKey,
  meta: event.metaKey,
  shift: event.shiftKey,
  location: event.location
});
type KeyBoxProps = { k: KeyType }

const KeyBox = ({ k }: KeyBoxProps) => (
  <Box
    borderWidth={2}
    border='solid black'
    borderRadius='10px'
  >
    <Heading size='xl'>{k.key}</Heading>
    <Text>{k.code}</Text>
    <HStack>
      {k.ctrl && (<Badge colorScheme='red'>CTRL</Badge>)}
      {k.shift && (<Badge colorScheme='green'>Shift</Badge>)}
      {k.meta && (<Badge colorScheme='yellow'>Meta</Badge>)}
    </HStack>
  </Box>
)

const useKeyEvents = () => {
  const [pressedKeys, setPressedKeys] = useState<Array<KeyType>>(DEBUG ? dummyKeys : []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!event.repeat) {
        setPressedKeys((pressedKeys: Array<KeyType>) => [...pressedKeys, mapKey(event)])
      }
    }

    const onKeyUp = (event: KeyboardEvent) => {
      setPressedKeys((pressedKeys: Array<KeyType>) => pressedKeys.filter(p => p.code !== event.code))
    }

    const resetKeys = () => {
      if (!DEBUG) {
        setPressedKeys([])
      }
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener("blur", resetKeys)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [pressedKeys])

  return { pressedKeys };
}

const DebugWarning = () => DEBUG ? (<Text position='fixed' top={0} left={0} color='red.400'>Debug is active</Text>) : null;

export default function Home() {
  const { pressedKeys } = useKeyEvents();
  return (
    <>
      <DebugWarning />
      <Center width='100vw' mt='10vh' height='80vh'>
        <HStack>
          {pressedKeys.map((k, i) => (<KeyBox key={i} k={k} />))}
        </HStack>
      </Center>
      <Stack
        isInline
        fontSize="16"
        textAlign="center"
        align="center"
        justify="center"
        color="gray.500"
      >
        <Text>Fork this on </Text>
        <Link href="https://github.com/madsroskar/testkey" color='yellow' isExternal>
          GitHub
        </Link>
      </Stack>
    </>
  )
}
