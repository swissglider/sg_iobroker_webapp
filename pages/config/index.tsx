import { Flex, Link, List, ListItem } from '@chakra-ui/react';
import NextLink from 'next/link';
import SimpleContainerWithColor from '../../components/generel/SimpleContainerWithColor';
import Layout from '../../components/layout';

const Config = () => {
    return (
        <Layout title="Configuration">
            <SimpleContainerWithColor>
                <Flex direction={'column'}>
                    <List spacing={3}>
                        <ListItem>
                            <NextLink href="/config/devices/wandschalter" passHref>
                                <Link>Wandschalter</Link>
                            </NextLink>
                        </ListItem>
                        <ListItem>
                            <NextLink href="/config/devices/mobilerschalter" passHref>
                                <Link>Mobiler Schalter</Link>
                            </NextLink>
                        </ListItem>
                    </List>
                </Flex>
            </SimpleContainerWithColor>
        </Layout>
    );
};

export default Config;
