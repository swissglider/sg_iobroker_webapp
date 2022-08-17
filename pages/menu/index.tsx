import { Box, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import Layout from '../../components/layout';
import NextLink from 'next/link';
import SimpleContainerWithColor from '../../components/generel/SimpleContainerWithColor';
import { useGetColor } from '../../components/hooks/getColors';
import { v4 as uuidv4 } from 'uuid';

type MenuItem_T = {
    link: string;
    text: string;
};

const MENU_ITEMS: MenuItem_T[] = [
    { link: '/config/devices/switchConsumerMapping/Wandschalter', text: 'Wand Schalter' },
    { link: '/config/devices/switchConsumerMapping/Mobilerschalter', text: 'Mobiler Schalter' },
];

const MenuItem = ({ link, text }: MenuItem_T) => {
    const hoverBG = useGetColor('gray.200');
    return (
        <NextLink href={link} passHref>
            <Box
                borderWidth="2px"
                borderRadius="lg"
                overflow="hidden"
                p={2}
                _hover={{ bg: hoverBG }}
                textAlign="center"
            >
                <Text noOfLines={2} fontSize={{ base: '15px', md: '20px', lg: '30px' }}>
                    {text}
                </Text>
            </Box>
        </NextLink>
    );
};

const Menu = () => {
    const boxBG = useGetColor('gray.50');
    return (
        <Layout title="Menu">
            <Box w={'100vw'}>
                <SimpleContainerWithColor>
                    <HStack spacing="3" p={5}>
                        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" bg={boxBG}>
                            <NextLink href="/config" passHref>
                                <Box display="flex" alignItems="baseline" paddingX={4} paddingY={2} borderBottom="1px">
                                    <Text fontWeight={'bold'} fontSize={{ base: '15px', md: '20px', lg: '30px' }}>
                                        Configuration - {process.env.NODE_ENV}
                                    </Text>
                                </Box>
                            </NextLink>
                            <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing="12px" p={5}>
                                {MENU_ITEMS.map((e: any) => (
                                    <MenuItem key={uuidv4()} {...e} />
                                ))}
                            </SimpleGrid>
                        </Box>
                    </HStack>
                </SimpleContainerWithColor>
            </Box>
        </Layout>
    );
};

export default Menu;
