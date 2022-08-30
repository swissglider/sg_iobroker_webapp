import { useRouter } from 'next/router';
import useSWR from 'swr';
import Layout from '../../../../components/layout';
import AllShelliesPerChannel from '../../../../components/shelly/AllShelliesPerChannel';
import AllShelliesPerDevice from '../../../../components/shelly/AllShelliesPerDevice';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const Shelly = () => {
    const router = useRouter();
    const { view, text } = router.query;
    const { data, error } = useSWR(`/api/shelly/getAllShellies_Get?view=${view}`, fetcher);

    if (!view) return <div>Loading...</div>;
    if (error) return <div>Failed to load - {error.toString()}</div>;
    if (!data) return <div>Loading...</div>;
    const allShellies = data;

    return (
        <Layout title={text}>
            {view.toString() === 'perDeviceType' && (
                <AllShelliesPerDevice
                    view={typeof view === 'string' ? view : view.toString()}
                    allShellies={allShellies}
                />
            )}
            {view.toString() === 'perChannelType' && (
                <AllShelliesPerChannel
                    view={typeof view === 'string' ? view : view.toString()}
                    allShellies={allShellies}
                />
            )}
        </Layout>
    );
};

export default Shelly;
