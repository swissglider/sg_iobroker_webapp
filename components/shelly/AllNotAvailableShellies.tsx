import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import SimpleTableWithColors, { T_TableCol } from '../generel/SimpleTableWithColors';
import { T_AllShelliesProps } from './T_AllShelliesProps';

const tableCols: T_TableCol = [
    {
        title: 'Name',
        param: 'name',
        colSpan: 2,
        align: 'left',
        type: 'text',
    },
    {
        title: 'IP',
        param: 'ip',
        colSpan: 2,
        align: 'right',
        type: 'text',
    },
];

const AllNotAvailableShellies = ({ view, allShellies }: T_AllShelliesProps) => {
    if (!allShellies) return <div>Loading...</div>;
    return (
        <Flex direction="column" width="100%" gap={5}>
            <SimpleTableWithColors
                // tableTitle={'BlaBlaBla (' + valueList.length + ')'}
                tableCols={tableCols}
                valueList={allShellies}
            />
        </Flex>
    );
};

export default AllNotAvailableShellies;
