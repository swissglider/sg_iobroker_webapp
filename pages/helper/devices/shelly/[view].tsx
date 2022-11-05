import { useRouter } from 'next/router';
import useSWR from 'swr';
import Layout from '../../../../components/layout';
import AllShelliesPerChannel from '../../../../components/shelly/AllShelliesPerChannel';
import AllShelliesPerDevice from '../../../../components/shelly/AllShelliesPerDevice';
import AllNotAvailableShellies from '../../../../components/shelly/AllNotAvailableShellies';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const Shelly = () => {
    const router = useRouter();
    const { view, text } = router.query;
    const { data, error } = useSWR(`/api/shelly/getAllShellies_Get?view=${view}`, fetcher);
    const { data: data1, error: error1 } = useSWR(`/api/shelly/getAllNotAvailableShellies_Get?view=${view}`, fetcher);

    if (!view) return <div>Loading...</div>;
    if (error) return <div>Failed to load - {error.toString()}</div>;
    if (error1) return <div>Failed to load - {error1.toString()}</div>;
    if (!data) return <div>Loading...</div>;
    if (!data1) return <div>Loading...</div>;
    const allShellies = data;
    const notAvailableShellies = data1;

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
            {view.toString() === 'notAvailableShellies' && (
                <AllNotAvailableShellies
                    view={typeof view === 'string' ? view : view.toString()}
                    allShellies={notAvailableShellies}
                />
            )}
        </Layout>
    );
};

export default Shelly;
