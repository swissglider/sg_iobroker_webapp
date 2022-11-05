import { Box, Button, HStack, SimpleGrid, Stack, Text, useToast } from '@chakra-ui/react';
import Layout from '../../components/layout';
import NextLink from 'next/link';
import SimpleContainerWithColor from '../../components/generel/SimpleContainerWithColor';
import { useGetColor } from '../../components/hooks/getColors';
import { v4 as uuidv4 } from 'uuid';

type MenuItem_T = {
    link?: string;
    btnUrl?: string;
    text: string;
};

type MenuContent_T = {
    title: string;
    menuItems: MenuItem_T[];
};

type Menu_T = MenuContent_T[];

export const MENUS: Menu_T = [
    {
        title: `Configuration - ${process.env.NODE_ENV}`,
        menuItems: [
            { link: '/config/devices/switchConsumerMapping/Wandschalter', text: 'Wand Schalter' },
            { link: '/config/devices/switchConsumerMapping/Mobilerschalter', text: 'Mobiler Schalter' },
            { link: '/config/devices/switchConsumerMapping/Lichtschalter', text: 'Licht Schalter' },
            { btnUrl: 'SwitchConsumerMapping/getRefreshConfig', text: 'Refresh Config' },
        ],
    },
    {
        title: 'Helpers',
        menuItems: [
            { link: '/helper/devices/shelly/perDeviceType', text: 'Shelly per device type' },
            { link: '/helper/devices/shelly/perChannelType', text: 'Shelly per channel type' },
            { link: '/helper/devices/shelly/notAvailableShellies', text: 'Shelly not available ?' },
            { btnUrl: 'shelly/init', text: 'Init Shelly Data' },
            { btnUrl: 'shelly/refreshShellies', text: 'Init Shellie' },
        ],
    },
];

const MenuItemLink = ({ link, text }: MenuItem_T) => {
    const hoverBG = useGetColor('gray.200');

    if (link === undefined) return <></>;

    return (
        <NextLink href={link + '?text=' + text} passHref>
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

const MenuItemUrl = ({ btnUrl, text }: MenuItem_T) => {
    const hoverBG = useGetColor('gray.200');
    const toast = useToast();

    if (btnUrl === undefined) return <></>;

    const onButtonClick = async (url: string): Promise<void> => {
        const response = await fetch('/api/generel/standardCall', {
            method: 'POST',
            body: JSON.stringify({ data: {}, url: url }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const t = await response.text();
        if (![200, 201].includes(response.status)) {
            toast({
                title: `${response.statusText}`,
                description: `StatusCode: ${response.status} - ErrorMessage: ${t}`,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
            return;
        } else {
            toast({
                description: `Refresh started`,
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            return;
        }
    };

    return (
        <Button
            borderWidth="2px"
            borderRadius="lg"
            overflow="hidden"
            p={2}
            _hover={{ bg: hoverBG }}
            textAlign="center"
            onClick={() => onButtonClick(btnUrl)}
            size={{ base: 'xs', md: 'md', lg: 'lg' }}
        >
            <Text fontWeight={'light'} noOfLines={2}>
                {text}
            </Text>
        </Button>
    );
};

const Menu = () => {
    const boxBG = useGetColor('gray.50');
    const lineTwo = useGetColor('gray.300');
    return (
        <Layout title="Menu">
            <Box w={'100vw'}>
                <SimpleContainerWithColor>
                    <Stack spacing="5" p={5}>
                        {MENUS.map((menu) => (
                            <Box key={uuidv4()} borderWidth="1px" borderRadius="lg" overflow="hidden" bg={boxBG}>
                                {/* <NextLink href="/config" passHref> */}
                                <Box display="flex" alignItems="baseline" paddingX={4} paddingY={2}>
                                    <Text fontWeight={'bold'} fontSize={{ base: '15px', md: '20px', lg: '30px' }}>
                                        {menu.title}
                                    </Text>
                                </Box>
                                <Box className="separator" color={lineTwo}>
                                    <Text fontWeight={'light'} fontSize={{ base: '10px', md: '12px', lg: '15px' }}>
                                        Links
                                    </Text>
                                </Box>
                                {/* </NextLink> */}
                                <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing="12px" p={5}>
                                    {menu.menuItems
                                        .filter((e) => e.link !== undefined)
                                        .map((e: any) => (
                                            <MenuItemLink key={uuidv4()} {...e} />
                                        ))}
                                </SimpleGrid>
                                <Box className="separator" color={lineTwo}>
                                    <Text fontWeight={'light'} fontSize={{ base: '10px', md: '12px', lg: '15px' }}>
                                        Actions
                                    </Text>
                                </Box>
                                <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing="12px" p={5}>
                                    {menu.menuItems
                                        .filter((e) => e.btnUrl !== undefined)
                                        .map((e: any) => (
                                            <MenuItemUrl key={uuidv4()} {...e} />
                                        ))}
                                </SimpleGrid>
                            </Box>
                        ))}
                    </Stack>
                </SimpleContainerWithColor>
            </Box>
        </Layout>
    );
};

export default Menu;
