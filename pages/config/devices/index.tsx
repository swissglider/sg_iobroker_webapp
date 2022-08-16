import { Link, List, ListItem } from '@chakra-ui/react';
import NextLink from 'next/link';
import SimpleContainerWithColor from '../../../components/generel/SimpleContainerWithColor';
import Layout from '../../../components/layout';

const Devices = () => {
    return (
        <Layout title="Devices">
            <SimpleContainerWithColor>
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
            </SimpleContainerWithColor>
        </Layout>
    );
};

export default Devices;
