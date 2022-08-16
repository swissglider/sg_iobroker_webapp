import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { T_SelectList } from '../../../lib/switchConsumerMapping/types/T_SelectList';
import {
    T_Mapping,
    T_Mapping_Styled,
    T_Mapping_StyledButton,
} from '../../../lib/switchConsumerMapping/types/T_Mapping';

export type T_SelectBoxSmartProps = {
    setSelected: (selectIDType: string, selectItemID: string) => void;
    newMapping: Record<string, string>; // selectIDType: selectItemID
    selectList: T_SelectList;
    oldMapping?: T_Mapping;
};

const SelectBoxSmart = ({
    setSelected,
    newMapping,
    selectList: { selectSubListTitle, selectSubListPlaceholder = 'select', selectSubListIDType, selectSubList },
    oldMapping,
}: T_SelectBoxSmartProps) => {
    return (
        <>
            <FormControl mt={4}>
                <FormLabel>{selectSubListTitle}</FormLabel>
                <Select
                    placeholder={selectSubListPlaceholder}
                    onChange={(val) => {
                        setSelected(selectSubListIDType, val.target.value);
                    }}
                    value={newMapping[selectSubListIDType]}
                >
                    {selectSubList &&
                        Object.values(selectSubList)
                            .filter(
                                (e: any) =>
                                    !e.isAlreadyConfigured ||
                                    (oldMapping &&
                                        oldMapping.hasOwnProperty('style') &&
                                        e.selectID === (oldMapping as T_Mapping_Styled).style) ||
                                    (oldMapping &&
                                        oldMapping.hasOwnProperty('styleButtonIOBrokerStatePath') &&
                                        e.selectID ===
                                            (oldMapping as T_Mapping_StyledButton).styleButtonIOBrokerStatePath),
                            )
                            .map((e: any) => (
                                <option key={uuidv4()} value={e.selectID}>
                                    {e.selectName}
                                </option>
                            ))}
                </Select>
            </FormControl>
            {newMapping[selectSubListIDType] &&
                Object.keys(selectSubList[newMapping[selectSubListIDType]].selectSubList).length > 0 &&
                selectSubList &&
                selectSubList.hasOwnProperty(newMapping[selectSubListIDType]) &&
                selectSubList[newMapping[selectSubListIDType]].selectSubList && (
                    <SelectBoxSmart
                        setSelected={setSelected}
                        newMapping={newMapping}
                        selectList={selectSubList[newMapping[selectSubListIDType]]}
                    />
                )}
        </>
    );
};

export default SelectBoxSmart;
