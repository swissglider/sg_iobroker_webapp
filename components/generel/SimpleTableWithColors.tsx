import { Box, Grid, GridItem, IconButton, Text } from '@chakra-ui/react';
import { useGetColor } from '../hooks/getColors';
import SimpleContainerWithColor from './SimpleContainerWithColor';
import { v4 as uuidv4 } from 'uuid';

export type T_TableCol = {
    title?: string | string[];
    param: string | string[];
    colSpan: number;
    align: string;
    type?: 'text' | 'textArray' | 'icon';
    onClick?: any;
    icon?: any;
    disabled?: (config: any) => boolean;
}[];

export type T_SimpleTableWithColors = {
    tableTitle?: string;
    tableCols: T_TableCol;
    valueList: Record<string, any>;
    withoutContainer?: boolean;
};

const SimpleTableWithColors = ({ tableTitle, tableCols, valueList, withoutContainer }: T_SimpleTableWithColors) => {
    const firstRowBG = useGetColor('gray.200');
    const secondRowBG = useGetColor('gray.300');
    const errorRowBG = useGetColor('red.300');
    const colSpanTotal = tableCols.map((e) => e.colSpan).reduce((partialSum, a) => partialSum + a, 0);
    return (
        <SimpleContainerWithColor withoutContainer={withoutContainer ?? false}>
            {tableTitle && (
                <Box p={1} textAlign="center">
                    <Text fontWeight={'bold'} fontSize={{ base: '15px', md: '20px', lg: '30px' }}>
                        {tableTitle}
                    </Text>
                </Box>
            )}

            {tableCols.some((e) => e.title) && (
                <Grid templateColumns={`repeat(${colSpanTotal}, 1fr)`} gap={1} p={2}>
                    {tableCols.map((e) => (
                        <GridItem key={uuidv4()} colSpan={e.colSpan} textAlign={e.align as any}>
                            {e.title &&
                                (Array.isArray(e.title) ? (
                                    e.title.map((tt) => (
                                        <Text
                                            key={uuidv4()}
                                            fontWeight={'bold'}
                                            fontSize={{ base: '12px', md: '16px', lg: '25px' }}
                                        >
                                            {tt}
                                        </Text>
                                    ))
                                ) : (
                                    <Text fontWeight={'bold'} fontSize={{ base: '12px', md: '16px', lg: '25px' }}>
                                        {e.title}
                                    </Text>
                                ))}
                        </GridItem>
                    ))}
                </Grid>
            )}
            {Object.entries(valueList).map(([wlKey, wlValue]: [string, any], index: number) => (
                <Grid
                    key={uuidv4()}
                    templateColumns={`repeat(${colSpanTotal}, 1fr)`}
                    gap={1}
                    // bg={index & 1 ? firstRowBG : secondRowBG}
                    bg={wlValue.hasOwnProperty['error'] ? errorRowBG : index & 1 ? firstRowBG : secondRowBG}
                    p={2}
                >
                    {tableCols.map((e) => (
                        <GridItem key={uuidv4()} colSpan={e.colSpan} textAlign={e.align as any}>
                            {e.type === 'text' ? (
                                <Text fontSize={{ base: '12px', md: '16px', lg: '25px' }}>
                                    {wlValue[e.param as string]}
                                </Text>
                            ) : e.type === 'textArray' && Array.isArray(e.param) ? (
                                e.param.map((tt) => (
                                    <Text key={uuidv4()} fontSize={{ base: '12px', md: '16px', lg: '25px' }}>
                                        {wlValue[tt]}
                                    </Text>
                                ))
                            ) : (
                                <IconButton
                                    size={{ base: 'xs', md: 'lg', lg: 'lg' }}
                                    variant={{ base: 'outline', md: 'ghost', lg: 'ghost' }}
                                    colorScheme="teal"
                                    aria-label=""
                                    icon={e.icon ? e.icon : undefined}
                                    onClick={e.onClick ? () => e.onClick(wlKey, wlValue) : () => {}}
                                    disabled={e.hasOwnProperty('disabled') && e.disabled ? e.disabled(wlValue) : false}
                                />
                            )}
                        </GridItem>
                    ))}
                </Grid>
            ))}
        </SimpleContainerWithColor>
    );
};

export default SimpleTableWithColors;
