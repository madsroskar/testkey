import { Box, Center, Heading, HStack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

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

const mapKey = (event: KeyboardEvent): KeyType  => ({
    code: event.code,
    key: event.key,
    ctrl: event.ctrlKey,
    meta: event.metaKey,
    shift: event.shiftKey,
    location: event.location
});
type KeyBoxProps = { k: KeyType }
const KeyBox = ({k}: KeyBoxProps) => (
    <Box><Heading size='xl'>{k.key}</Heading></Box>
)

const useKeyEvents = () => {
  const [pressedKeys, setPressedKeys] = useState<Array<KeyType>>([]);

  useEffect(() => {

    const onKeyDown = (event: KeyboardEvent) => {
      if (!event.repeat) {
          setPressedKeys((pressedKeys: Array<KeyType>) => [...pressedKeys, mapKey(event)])
      }
    }

    const onKeyUp = (event: KeyboardEvent) => {
      setPressedKeys((pressedKeys: Array<KeyType>) => pressedKeys.filter(p => p.code !== event.code))
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
      window.addEventListener("blur", () => {
          console.log('focusout')
          setPressedKeys([])
      })

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [pressedKeys])

  return { pressedKeys };
}
export default function Home() {
  const { pressedKeys } = useKeyEvents();
  console.log({ pressedKeys })
  return (
    <Center>
      <HStack>
          {pressedKeys.map((k, i) => (<KeyBox key={i} k={k} />))}
      </HStack>
    </Center>
  )
}
