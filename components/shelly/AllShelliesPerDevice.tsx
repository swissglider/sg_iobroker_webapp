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
        align: 'center',
        type: 'text',
    },
    {
        title: 'Type',
        param: 'type',
        colSpan: 1,
        align: 'center',
        type: 'text',
    },
    {
        title: 'Updated',
        param: 'versionUpToDate',
        colSpan: 1,
        align: 'center',
        type: 'text',
    },
    {
        title: 'Gen',
        param: 'gen',
        colSpan: 1,
        align: 'right',
        type: 'text',
    },
];

const AllShelliesPerDevice = ({ view, allShellies }: T_AllShelliesProps) => {
    const [valueList, setValueList] = useState<any>();

    useEffect(() => {
        const tVL = Object.values(allShellies).map((e: any) => ({
            name: e.gen2 ? e.config?.sys?.device?.name ?? e._http_tcp.name : e.config.name,
            ip: e.ip,
            type: e.gen2 ? e._http_tcp.name.split('-')[0] : e.config.device.type,
            gen: e.gen2 ? '2' : '1',
            versionUpToDate: e.versionUpToDate.toString(),
        }));
        setValueList(tVL);
    }, [allShellies]);

    if (!valueList) return <div>Loading...</div>;
    return (
        <Flex direction="column" width="100%" gap={5}>
            <SimpleTableWithColors
                tableTitle={'SHSW-1 (' + valueList.filter((e: any) => e.type === 'SHSW-1').length + ')'}
                tableCols={tableCols}
                valueList={valueList.filter((e: any) => e.type === 'SHSW-1')}
            />
            <SimpleTableWithColors
                tableTitle={'SHSW-25 (' + valueList.filter((e: any) => e.type === 'SHSW-25').length + ')'}
                tableCols={tableCols}
                valueList={valueList.filter((e: any) => e.type === 'SHSW-25')}
            />
            <SimpleTableWithColors
                tableTitle={'ShellyPlus1 (' + valueList.filter((e: any) => e.type === 'ShellyPlus1').length + ')'}
                tableCols={tableCols}
                valueList={valueList.filter((e: any) => e.type === 'ShellyPlus1')}
            />
            <SimpleTableWithColors
                tableTitle={'ShellyPlus2PM (' + valueList.filter((e: any) => e.type === 'ShellyPlus2PM').length + ')'}
                tableCols={tableCols}
                valueList={valueList.filter((e: any) => e.type === 'ShellyPlus2PM')}
            />
        </Flex>
    );
};

export default AllShelliesPerDevice;
