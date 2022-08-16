import { Box, Text } from '@chakra-ui/react';

export type T_ObliqueBoxProps = {
    lineOneText: string;
    lineTwoText?: string;
    bg?: string;
};

const ObliqueBox = ({ lineOneText, lineTwoText, bg }: T_ObliqueBoxProps) => {
    return (
        <Box className="rhombus" bg={bg}>
            <Text fontSize={{ base: '10px', md: '12px', lg: '16px' }}>{lineOneText}</Text>
            {lineTwoText && <Text fontSize={{ base: '10px', md: '12px', lg: '16px' }}>{lineTwoText}</Text>}
        </Box>
    );
};

export default ObliqueBox;
