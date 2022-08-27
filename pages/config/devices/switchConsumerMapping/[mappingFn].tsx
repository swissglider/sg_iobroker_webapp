import Layout from '../../../../components/layout';
import useSWR from 'swr';
import React from 'react';
import { useRouter } from 'next/router';
import { T_Mapping } from '../../../../lib/switchConsumerMapping/types/T_Mapping';
import { mutate } from 'swr';
import { useToast } from '@chakra-ui/react';
import AllSwitches from '../../../../components/switchConsumerMapping/AllSwitches';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const SwitchConsumerMapping = () => {
    const router = useRouter();
    const toast = useToast();
    const { mappingFn } = router.query;
    const { data, error } = useSWR(
        `/api/SwitchConsumerMapping/getAllConfigurations_Get?mappingFn=${mappingFn}`,
        fetcher,
    );

    if (!mappingFn) return <div>Loading...</div>;
    if (error) return <div>Failed to load - {error.toString()}</div>;
    if (!data) return <div>Loading...</div>;
    const { selectAddList = undefined } = data;

    const saveAdd = async (newMapping: T_Mapping): Promise<boolean> => {
        const response = await fetch('/api/generel/standardCall', {
            method: 'POST',
            body: JSON.stringify({ data: newMapping, url: 'SwitchConsumerMapping/addSingleMapping' }),
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
            return false;
        } else {
            toast({
                description: `Added`,
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            mutate(`/api/SwitchConsumerMapping/getAllConfigurations_Get?mappingFn=${mappingFn}`);
            return true;
        }
    };

    const onSaveChanges = async (oldMapping: T_Mapping, newMapping: T_Mapping): Promise<boolean> => {
        const response = await fetch('/api/generel/standardCall', {
            method: 'POST',
            body: JSON.stringify({
                data: { new: newMapping, old: oldMapping },
                url: 'SwitchConsumerMapping/changeSingleMapping',
            }),
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
            return false;
        } else {
            toast({
                description: `Added`,
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            mutate(`/api/SwitchConsumerMapping/getAllConfigurations_Get?mappingFn=${mappingFn}`);
            return true;
        }
    };

    const onDelete = async (mappingToDelete: T_Mapping): Promise<boolean> => {
        const response = await fetch('/api/generel/standardCall', {
            method: 'POST',
            body: JSON.stringify({ data: mappingToDelete, url: 'SwitchConsumerMapping/deleteSingleMapping' }),
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
            return false;
        } else {
            toast({
                description: `Deleted`,
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            mutate(`/api/SwitchConsumerMapping/getAllConfigurations_Get?mappingFn=${mappingFn}`);
            return true;
        }
    };

    return (
        <Layout title={mappingFn}>
            <AllSwitches
                selectList={selectAddList}
                onSaveChanges={onSaveChanges}
                onDelete={onDelete}
                saveAdd={saveAdd}
                mappingFn={typeof mappingFn === 'string' ? mappingFn : mappingFn.toString()}
            />
        </Layout>
    );
};

export default SwitchConsumerMapping;
