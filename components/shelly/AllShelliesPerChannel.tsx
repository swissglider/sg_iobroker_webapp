import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import SimpleTableWithColors, { T_TableCol } from '../generel/SimpleTableWithColors';
import { T_AllShelliesProps } from './T_AllShelliesProps';

const tableCols: T_TableCol = [
    {
        title: 'Name',
        param: 'channelName',
        colSpan: 3,
        align: 'left',
        type: 'text',
    },
    {
        title: 'ID',
        param: 'channelID',
        colSpan: 1,
        align: 'left',
        type: 'text',
    },
    {
        title: 'IP',
        param: 'ip',
        colSpan: 3,
        align: 'center',
        type: 'text',
    },
    {
        title: 'Type',
        param: 'type',
        colSpan: 3,
        align: 'right',
        type: 'text',
    },
];

const AllShelliesPerChannel = ({ view, allShellies }: T_AllShelliesProps) => {
    const [valueList, setValueList] = useState<Record<string, any[]>>();

    useEffect(() => {
        const allChannels: Record<string, any[]> = { wandschalter: [], lichtschalter: [] };
        for (const value of Object.values(allShellies) as any) {
            if (value.gen2) {
                for (const channel of Object.entries(value.config)
                    .filter(([key]) => key.startsWith('switch:'))
                    .map(([key, value]) => value) as any) {
                    const tChannel = {
                        channelName: channel.name,
                        channelID: channel.id,
                        ip: value.ip,
                        type: value._http_tcp.name.split('-')[0],
                    };
                    channel.name.startsWith('Wandschalter')
                        ? allChannels.wandschalter.push(tChannel)
                        : allChannels.lichtschalter.push(tChannel);
                }
            } else {
                value.config.relays.forEach((channel: any, index: number) => {
                    const tChannel = {
                        channelName: channel.name,
                        channelID: index,
                        ip: value.ip,
                        type: value.config.device.type,
                    };
                    channel.name.startsWith('Wandschalter')
                        ? allChannels.wandschalter.push(tChannel)
                        : allChannels.lichtschalter.push(tChannel);
                });
            }
        }

        setValueList(allChannels);
    }, [allShellies]);

    if (!valueList) return <div>Loading...</div>;
    return (
        <Flex direction="column" width="100%" gap={5}>
            <SimpleTableWithColors
                tableTitle={'Wandschalter (' + valueList.wandschalter.length + ')'}
                tableCols={tableCols}
                valueList={valueList.wandschalter}
            />
            <SimpleTableWithColors
                tableTitle={'Lichtschalter (' + valueList.lichtschalter.length + ')'}
                tableCols={tableCols}
                valueList={valueList.lichtschalter}
            />
        </Flex>
    );
};

export default AllShelliesPerChannel;
