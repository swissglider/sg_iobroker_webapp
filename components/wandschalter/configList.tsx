import { Box, useToast, useDisclosure } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { mutate } from 'swr';
import React, { useState } from 'react';
import EditModal from './editModal';
import SimpleTableWithColors, { T_TableCol } from '../generel/SimpleTableWithColors';

const ConfigList = (props: any) => {
    const { configurationList, wandschalterList } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [tmpSelectedConfig, setTmpSelectedConfig] = useState<any>({ wandschalterChannelID: '' });
    const openEditModule = (key: string, selectedConfig: any) => {
        setTmpSelectedConfig(selectedConfig.config);
        onOpen();
    };
    const toast = useToast();

    const deleteConfiguration = async (key: string, config: Record<string, Record<string, string>>): Promise<void> => {
        const response = await fetch('/api/nodeRedStandardCall', {
            method: 'POST',
            body: JSON.stringify({ config: config.config, url: 'wandschalterLampeMapper/removeSingleConfig' }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const t = await response.text();

        if (response.status !== 200) {
            toast({
                title: `${response.statusText}`,
                description: `StatusCode: ${response.status} - ErrorMessage: ${t}`,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        } else {
            toast({
                description: `Deleted`,
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
        }
        mutate('/api/getWandschalterConfiguration');
    };

    const checkEditDisabled = (config: any): boolean => {
        return !wandschalterList.hasOwnProperty(config.config.wandschalterChannelID);
    };

    const tableCols: T_TableCol = [
        {
            title: ['Wandschalter-Name [style]', 'Lampe-Name [szene]'],
            param: ['wandschalterString', 'lampenString'],
            colSpan: 8,
            align: 'left',
            type: 'textArray',
        },
        {
            title: '',
            param: 'adapterName',
            colSpan: 1,
            align: 'right',
            onClick: openEditModule,
            icon: <EditIcon />,
            disabled: checkEditDisabled,
        },
        {
            title: '',
            param: 'adapterName',
            colSpan: 1,
            align: 'right',
            onClick: deleteConfiguration,
            icon: <DeleteIcon />,
        },
    ];

    return (
        <>
            <Box w={'100vw'}>
                <SimpleTableWithColors
                    tableTitle="Current Configuration"
                    tableCols={tableCols}
                    valueList={configurationList}
                />
            </Box>
            <EditModal
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                modalFunction={'edit'}
                selectedConfig={tmpSelectedConfig}
                configurationList={configurationList}
                wandschalterList={wandschalterList}
                {...props}
            />
        </>
    );
};

export default ConfigList;
