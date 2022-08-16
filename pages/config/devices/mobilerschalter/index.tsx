import Layout from '../../../../components/layout';
import useSWR from 'swr';
import React from 'react';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const MobilerSchalter = () => {
    const { data, error } = useSWR('/api/getMobilerSchalterConfiguration', fetcher);

    if (error) return <div>Failed to load - {error}</div>;
    if (!data) return <div>Loading...</div>;
    const {
        lampenList = undefined,
        mobilerschalterList = undefined,
        configList = undefined,
        configurationList = undefined,
    } = data;

    return (
        <Layout title={`MobilerSchalter`}>
            {/* <AllWandschalterList
                mobilerschalterList={mobilerschalterList}
                lampenList={lampenList}
                configList={configList}
                configurationList={configurationList}
            /> 
            <ConfigList
                mobilerschalterList={mobilerschalterList}
                lampenList={lampenList}
                configList={configList}
                configurationList={configurationList}
            />*/}
        </Layout>
    );
};

export default MobilerSchalter;
