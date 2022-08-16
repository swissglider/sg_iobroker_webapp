import { Box, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import EditModal from './editModal';
import SimpleTableWithColors, { T_TableCol } from '../generel/SimpleTableWithColors';

const AllWandschalterList = (props: any) => {
    const { wandschalterList } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [tmpSelectedWandschalter, setTmpSelectedWandschalter] = useState<string>('');

    const openAddModule = (wandschalterID: string) => {
        setTmpSelectedWandschalter(wandschalterID);
        onOpen();
    };

    const tableCols: T_TableCol = [
        {
            title: 'Name',
            param: 'name',
            colSpan: 3,
            align: 'left',
            type: 'text',
        },
        {
            title: 'Adapter',
            param: 'adapterName',
            colSpan: 2,
            align: 'center',
            type: 'text',
        },
        {
            title: '',
            param: 'adapterName',
            colSpan: 1,
            align: 'right',
            onClick: openAddModule,
            icon: <AddIcon />,
        },
    ];

    return (
        <>
            <Box w={'100vw'}>
                <SimpleTableWithColors
                    tableTitle="Wandschalter to add"
                    tableCols={tableCols}
                    valueList={wandschalterList}
                />
            </Box>
            <EditModal
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                modalFunction={'add'}
                selectedConfig={{ wandschalterChannelID: tmpSelectedWandschalter }}
                wandschalterList={wandschalterList}
                {...props}
            />
        </>
    );
};

export default AllWandschalterList;
