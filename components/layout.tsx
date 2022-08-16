import NextLink from 'next/link';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Flex,
    FormLabel,
    Grid,
    GridItem,
    Heading,
    IconButton,
    useColorMode,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ChevronLeftIcon, HamburgerIcon } from '@chakra-ui/icons';
import { v4 as uuidv4 } from 'uuid';
import { Switch } from '@chakra-ui/react';

const Layout = ({ children, title }: any) => {
    const router = useRouter();
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Flex height="100vh" alignItems="center" direction={'column'} p={0}>
                <Grid
                    w="100vw"
                    templateColumns="repeat(5, 1fr)"
                    templateRows="repeat(3, 1fr)"
                    gap={0}
                    paddingTop={3}
                    paddingX={5}
                    alignItems="center"
                    p={0}
                    m={0}
                >
                    <GridItem colSpan={1} rowSpan={1} justifySelf="left">
                        {router.asPath === '/menu' ? (
                            <IconButton
                                size={{ base: 'sm', md: 'lg', lg: 'lg' }}
                                variant={{ base: 'ghost', md: 'ghost', lg: 'ghost' }}
                                colorScheme="teal"
                                aria-label="Search database"
                                icon={<ChevronLeftIcon />}
                                onClick={() => router.back()}
                            />
                        ) : (
                            <NextLink href="/menu">
                                <IconButton
                                    size={{ base: 'sm', md: 'lg', lg: 'lg' }}
                                    variant={{ base: 'ghost', md: 'ghost', lg: 'ghost' }}
                                    colorScheme="teal"
                                    aria-label="Search database"
                                    icon={<HamburgerIcon />}
                                    as="a"
                                />
                            </NextLink>
                        )}
                    </GridItem>
                    <GridItem colSpan={3} rowSpan={1} justifySelf="center">
                        <Heading as="h1" size={{ base: 'lg', md: 'xl', lg: '2xl' }}>
                            {title}
                        </Heading>
                    </GridItem>
                    <GridItem colSpan={{ base: 5, md: 1, lg: 1, xl: 1 }} rowSpan={1} justifySelf="center">
                        <Flex justify={'stretch'}>
                            <FormLabel mb="0">Light</FormLabel>
                            <Switch
                                id="theme_changer"
                                isChecked={colorMode === 'light' ? false : true}
                                onChange={toggleColorMode}
                            />
                            <FormLabel ml={3} mb="0">
                                Dark
                            </FormLabel>
                        </Flex>
                    </GridItem>
                    <GridItem colSpan={5} rowSpan={1} justifySelf="center">
                        {router.asPath !== '/menu' ? (
                            <Breadcrumb>
                                {router.route
                                    .split('/')
                                    .slice(0, -1)
                                    .map((e, i, a) => (
                                        <BreadcrumbItem key={uuidv4()}>
                                            <BreadcrumbLink
                                                as={NextLink}
                                                href={i === 0 ? '/' : '' + a.slice(0, i + 1).join('/')}
                                            >
                                                {e === '' ? 'home' : e}
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                    ))}
                            </Breadcrumb>
                        ) : (
                            <></>
                        )}
                    </GridItem>
                </Grid>
                <>{children}</>
            </Flex>
        </>
    );
};

export default Layout;
