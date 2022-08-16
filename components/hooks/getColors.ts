import { useColorMode } from '@chakra-ui/react';

const colorSet: Record<string, string> = {
    'gray.50': 'gray.800',
    'gray.100': 'gray.700',
    'gray.200': 'gray.600',
    'gray.300': 'gray.500',
};

export const useGetColor = (color: string): string => {
    const { colorMode } = useColorMode();
    return colorSet.hasOwnProperty(color) && colorMode === 'dark' ? colorSet[color] : color;
};
