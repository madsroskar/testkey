import { ChakraTheme, extendTheme } from "@chakra-ui/react";

type Color = string;
const isColor = (c: Color | string): c is Color => {
    const hexRegex: RegExp = /^(?:0x|#)(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
    return hexRegex.test(c);
}

type ThemeColor = keyof typeof ThemeColors;
const ThemeColors = {
    "black":
    {
        50: '#f3f1f3',
        100: '#d8d7d8',
        200: '#bebdbe',
        300: '#a7a2a7',
        400: '#8e888e',
        500: '#746d74',
        600: '#5a555a',
        700: '#403e40',
        800: '#272527',
        900: '#0e0c0e',
    },
    "blue":

    {
        50: '#e8f0ff',
        100: '#c2d3f0',
        200: '#9bb6e3',
        300: '#7398d8',
        400: '#4d7bcd',
        500: '#3562b3',
        600: '#284c8c',
        700: '#1c3664',
        800: '#0f213d',
        900: '#020b18',
    },
    "green":
    {
        50: '#eef9e4',
        100: '#d7e9c6',
        200: '#bfd8a4',
        300: '#a6c882',
        400: '#8eb960',
        500: '#759f46',
        600: '#5a7c36',
        700: '#405925',
        800: '#253613',
        900: '#081400',
    },
    "red":
    {
        50: '#ffe8e4',
        100: '#f9c3ba',
        200: '#f09d8f',
        300: '#e87663',
        400: '#e15038',
        500: '#c7361e',
        600: '#9c2917',
        700: '#701d0f',
        800: '#451007',
        900: '#1d0200',
    },
    "yellow": {
        50: '#fff4dd',
        100: '#fbe2b3',
        200: '#f5ce87',
        300: '#f0bb59',
        400: '#eca72c',
        500: '#d38e13',
        600: '#a46e0c',
        700: '#764f06',
        800: '#472f00',
        900: '#1b0f00',
    }
};


const getColor = (name: ThemeColor) => {
    //if (!isColor(name)) {
    //const hexRegex: RegExp = /(?:0x|#)(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})/;
    //        throw new Error(`Could not get color ${name} - ${ThemeColors[name] as string} - ${hexRegex.test(name)}`)
    //}
    return ThemeColors[name];
}

const Theme: ChakraTheme = extendTheme({
    colors: {
        black: getColor('black'),
        blue: getColor('blue'),
        red: getColor('red'),
        yellow: getColor('yellow'),
        green: getColor('green'),
    },
    config: {
        useSystemColorMode: false,
        initialColorMode: "dark",
        cssVarPrefix: "testkey",
    }
});

export default Theme;
