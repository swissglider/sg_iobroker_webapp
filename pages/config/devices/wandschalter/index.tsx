import Layout from '../../../../components/layout';
import useSWR from 'swr';
import React from 'react';
import AllWandschalterList from '../../../../components/wandschalter/allWandschalterList';
import ConfigList from '../../../../components/wandschalter/configList';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const Wandschalter = () => {
    const { data, error } = useSWR('/api/getWandschalterConfiguration', fetcher);

    if (error) return <div>Failed to load - {error}</div>;
    if (!data) return <div>Loading...</div>;
    const {
        lampenList = undefined,
        wandschalterList = undefined,
        configList = undefined,
        configurationList = undefined,
    } = data;

    return (
        <Layout title={`Wandschalter`}>
            <AllWandschalterList
                wandschalterList={wandschalterList}
                lampenList={lampenList}
                configList={configList}
                configurationList={configurationList}
            />
            <ConfigList
                wandschalterList={wandschalterList}
                lampenList={lampenList}
                configList={configList}
                configurationList={configurationList}
            />
        </Layout>
    );
};

export default Wandschalter;
