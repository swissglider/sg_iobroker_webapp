import { Box, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import Layout from '../../components/layout';
import NextLink from 'next/link';
import SimpleContainerWithColor from '../../components/generel/SimpleContainerWithColor';
import { useGetColor } from '../../components/hooks/getColors';

const Menu = () => {
    const boxBG = useGetColor('gray.50');
    const hoverBG = useGetColor('gray.200');
    return (
        <Layout title="Menu">
            <Box w={'100vw'}>
                <SimpleContainerWithColor>
                    <HStack spacing="3" p={5}>
                        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" bg={boxBG}>
                            <NextLink href="/config" passHref>
                                <Box display="flex" alignItems="baseline" paddingX={4} paddingY={2} borderBottom="1px">
                                    <Text fontWeight={'bold'} fontSize={{ base: '15px', md: '20px', lg: '30px' }}>
                                        Configuration
                                    </Text>
                                </Box>
                            </NextLink>
                            <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing="12px" p={5}>
                                <NextLink href="/config/devices" passHref>
                                    <Box
                                        borderWidth="2px"
                                        borderRadius="lg"
                                        overflow="hidden"
                                        p={2}
                                        _hover={{ bg: hoverBG }}
                                    >
                                        <Text noOfLines={2} fontSize={{ base: '15px', md: '20px', lg: '30px' }}>
                                            Devices
                                        </Text>
                                    </Box>
                                </NextLink>
                                <NextLink href="/config/devices/wandschalter" passHref>
                                    <Box
                                        borderWidth="2px"
                                        borderRadius="lg"
                                        overflow="hidden"
                                        p={2}
                                        _hover={{ bg: hoverBG }}
                                    >
                                        <Text noOfLines={2} fontSize={{ base: '15px', md: '20px', lg: '30px' }}>
                                            Wand Schalter
                                        </Text>
                                    </Box>
                                </NextLink>
                                <NextLink href="/config/devices/mobilerschalter" passHref>
                                    <Box
                                        borderWidth="2px"
                                        borderRadius="lg"
                                        overflow="hidden"
                                        p={2}
                                        _hover={{ bg: hoverBG }}
                                    >
                                        <Text noOfLines={2} fontSize={{ base: '15px', md: '20px', lg: '30px' }}>
                                            Mobiler Schalter
                                        </Text>
                                    </Box>
                                </NextLink>
                            </SimpleGrid>
                        </Box>
                    </HStack>
                </SimpleContainerWithColor>
            </Box>
        </Layout>
    );
};

export default Menu;
