import { Grid, GridItem, Box, Text } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import ObliqueBox from './ObliqueBox';
import { T_Rows } from '../../../lib/switchConsumerMapping/types/T_MappingList';
import { T_SelectList } from '../../../lib/switchConsumerMapping/types/T_SelectList';

export type T_MappingBoxProps = {
    title: string;
    switchAdapter: string;
    bgMain: string;
    howerBG: string;
    rows: T_Rows;
    onClick: (selectLists: { parentList: T_SelectList; list: T_SelectList }) => void;
};

const MappingBox = ({ title, bgMain, howerBG, rows, onClick, switchAdapter }: T_MappingBoxProps) => {
    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" bg={bgMain} alignSelf="start" pb={3}>
            <Box p={1}>
                <Text fontWeight={'bold'} fontSize={{ base: '12px', md: '14px', lg: '20px' }} textAlign="start" px={4}>
                    {title}
                </Text>
                <Text fontSize={{ base: '12px', md: '14px', lg: '20px' }} textAlign="center" px={4}>
                    {switchAdapter}
                </Text>
            </Box>
            {rows.map((row) => (
                <Grid
                    key={uuidv4()}
                    templateColumns={`repeat(${row.reduce(
                        (previousValue, column) => previousValue + column.colSpan,
                        0,
                    )}, 1fr)`}
                    gap={0}
                    py={1}
                    px={4}
                    _hover={{ bg: howerBG }}
                >
                    {row.map((column) => (
                        <GridItem colSpan={column.colSpan} key={uuidv4()} onClick={() => onClick(column.selectLists)}>
                            <ObliqueBox lineOneText={column.lineOne} lineTwoText={column.lineTwo} bg={column.bg} />
                        </GridItem>
                    ))}
                </Grid>
            ))}
        </Box>
    );
};

export default MappingBox;
