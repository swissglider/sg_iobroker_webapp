import { T_Mapping, T_Mapping_Styled, T_Mapping_StyledButton } from '../types/T_Mapping';
import { T_SelectList } from '../types/T_SelectList';

export type T_GetSelectAddListProps = {
    mappingFns: Record<string, Record<string, any>>;
    mappingFn_Str: string;
    mappings: T_Mapping[];
};

const getSelectAddList = ({ mappingFns, mappingFn_Str, mappings }: T_GetSelectAddListProps): T_SelectList => {
    const selectAddList: T_SelectList = {
        selectSubListTitle: `Add ${mappingFn_Str}`,
        selectSubListIDType: 'switchIOBrokerChannelPath',
        selectID: 'top',
        selectName: 'top',
        selectAdapterName: '',
        selectSubList: {},
    };

    // generates Consumer List for
    const consumerSelectSubList: Record<string, T_SelectList> = {};
    for (const [keyConsumerIOBrokerChannelPath, valueConsumerIOBrokerChannelPath] of Object.entries(
        mappingFns.consumersList,
    )) {
        consumerSelectSubList[keyConsumerIOBrokerChannelPath] = {
            selectID: keyConsumerIOBrokerChannelPath,
            selectName: `${valueConsumerIOBrokerChannelPath.adapterName} : ${valueConsumerIOBrokerChannelPath.name}`,
            selectAdapterName: valueConsumerIOBrokerChannelPath.adapterName,
            selectSubListTitle: `${valueConsumerIOBrokerChannelPath.channelType} Scene`,
            selectSubListIDType: 'consumerIOBrokerStatePath',
            selectSubList: {},
            selectSubListPlaceholder: 'Select Scene',
        };
        for (const { id, name } of valueConsumerIOBrokerChannelPath.scenes) {
            consumerSelectSubList[keyConsumerIOBrokerChannelPath].selectSubList[id] = {
                selectID: id,
                selectName: name,
                selectAdapterName: valueConsumerIOBrokerChannelPath.adapterName,
                selectSubListTitle: '',
                selectSubListIDType: '',
                selectSubList: {},
            };
        }
    }

    // generates Switch List
    for (const [keySwitchIOBrokerChannelPath, valueSwitchIOBrokerChannelPath] of Object.entries(
        mappingFns.switchesList,
    )) {
        selectAddList.selectSubList[keySwitchIOBrokerChannelPath] = {
            selectSubListTitle: ``,
            selectSubListIDType: '',
            selectID: keySwitchIOBrokerChannelPath,
            selectName: valueSwitchIOBrokerChannelPath.name,
            selectAdapterName: valueSwitchIOBrokerChannelPath.adapterName,
            selectSubList: {},
        };
        if (
            ['Wandschalter', 'Lichtschalter'].includes(mappingFn_Str) &&
            valueSwitchIOBrokerChannelPath.hasOwnProperty('availableStyles')
        ) {
            selectAddList.selectSubList[keySwitchIOBrokerChannelPath].selectSubListTitle = 'Style';
            selectAddList.selectSubList[keySwitchIOBrokerChannelPath].selectSubListPlaceholder = 'Select Style';
            selectAddList.selectSubList[keySwitchIOBrokerChannelPath].selectSubListIDType = 'style';
            for (const style of valueSwitchIOBrokerChannelPath.availableStyles) {
                selectAddList.selectSubList[keySwitchIOBrokerChannelPath].selectSubList[style] = {
                    selectID: style,
                    selectName: style,
                    selectAdapterName: valueSwitchIOBrokerChannelPath.adapterName,
                    selectSubListTitle: 'Producer',
                    selectSubListIDType: 'consumerIOBrokerChannelPath',
                    selectSubList: consumerSelectSubList,
                    selectOrgMapping: mappings.find(
                        (e1: T_Mapping) =>
                            e1.switchIOBrokerChannelPath === keySwitchIOBrokerChannelPath &&
                            (e1 as T_Mapping_Styled).style === style,
                    ),
                };
            }
        }
        if (
            mappingFn_Str === 'Mobilerschalter' &&
            valueSwitchIOBrokerChannelPath.hasOwnProperty('availableStyleButtons')
        ) {
            selectAddList.selectSubList[keySwitchIOBrokerChannelPath].selectSubListTitle = 'Style Button';
            selectAddList.selectSubList[keySwitchIOBrokerChannelPath].selectSubListPlaceholder = 'Select Style Button';
            selectAddList.selectSubList[keySwitchIOBrokerChannelPath].selectSubListIDType =
                'styleButtonIOBrokerStatePath';
            for (const { id, name } of valueSwitchIOBrokerChannelPath.availableStyleButtons) {
                selectAddList.selectSubList[keySwitchIOBrokerChannelPath].selectSubList[id] = {
                    selectID: id,
                    selectName: name,
                    selectAdapterName: selectAddList.selectSubList[keySwitchIOBrokerChannelPath].selectAdapterName,
                    selectSubListTitle: 'Consumer',
                    selectSubListIDType: 'consumerIOBrokerChannelPath',
                    selectSubList: consumerSelectSubList,
                    selectOrgMapping: mappings.find(
                        (e1: T_Mapping) => (e1 as T_Mapping_StyledButton).styleButtonIOBrokerStatePath === id,
                    ),
                };
            }
        }
    }

    return selectAddList;
};

export default getSelectAddList;
