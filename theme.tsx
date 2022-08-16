// theme.ts

// 1. import `extendTheme` function
import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { StyleFunctionProps } from '@chakra-ui/theme-tools';

// 2. Add your color mode config
const config: ThemeConfig = {
    // initialColorMode: 'dark',
    // useSystemColorMode: false,
};

const colors = {
    primary: '#e29578',
};

const styles = {
    global: (props: StyleFunctionProps) => ({
        // body: {
        //     bg: mode('#a8dadc', '#301934')(props),
        //     color: mode('#301934', '#a8dadc')(props),
        // },
    }),
};

// 3. extend the theme
const theme = extendTheme({ config, colors, styles });

export default theme;
