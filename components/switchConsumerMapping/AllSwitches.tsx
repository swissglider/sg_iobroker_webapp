import { Box, SimpleGrid, Text, useDisclosure } from '@chakra-ui/react';
import SimpleContainerWithColor from '../generel/SimpleContainerWithColor';
import { useGetColor } from '../hooks/getColors';
import { v4 as uuidv4 } from 'uuid';
import SelectModalDialogAddEdit from '../generel/SelectModalDialog/SelectModalDialogAddEdit';
import { T_SelectList } from '../../lib/switchConsumerMapping/types/T_SelectList';
import { type_Mapping_Check, T_Mapping } from '../../lib/switchConsumerMapping/types/T_Mapping';
import { useEffect, useState } from 'react';
import MappingBox from '../generel/MappingBox/MappingBox';
import { T_MappingList, T_Rows } from '../../lib/switchConsumerMapping/types/T_MappingList';
import getConfigTypeHelper from '../../lib/switchConsumerMapping/helper/getConfigTypeHelper';

export type T_AllSwitchesProps = {
    selectList: T_SelectList;
    onSaveChanges: (oldMapping: T_Mapping, newMapping: T_Mapping) => Promise<boolean>;
    onDelete: (mappingToDelete: T_Mapping) => Promise<boolean>;
    saveAdd: (newMapping: T_Mapping) => Promise<boolean>;
    mappingFn: string;
};

const AllSwitches = ({ selectList, onSaveChanges, onDelete, saveAdd, mappingFn }: T_AllSwitchesProps) => {
    const firstRowBG = useGetColor('gray.200');
    const secondRowBG = useGetColor('gray.300');
    const errorRowBG = useGetColor('red.300');
    const boxBG = useGetColor('gray.50');

    const { isOpen, onOpen, onClose } = useDisclosure();

    // for List (init in effect)
    const [currentMappings, setCurrentMappings] = useState<T_MappingList[]>();

    // for modal (init in openModal)
    const [selectModalTitle, setSelectModalTitle] = useState<string>('');
    const [newMapping, setNewMapping] = useState<T_Mapping>(); // selectIDType: selectItemID
    const [oldMapping, setOldMapping] = useState<T_Mapping>();
    const [modalFunction, setModalFunction] = useState<'add' | 'change'>();
    const [selectedSwitchList, setSelectedSwitchList] = useState<T_SelectList>();

    useEffect(() => {
        const tmpCurrentMappings: T_MappingList[] = [];
        Object.values(selectList.selectSubList).map((cSwitch) => {
            const t = {
                title: cSwitch.selectName,
                switchAdapter: cSwitch.selectAdapterName,
                bgMain: boxBG,
                howerBG: secondRowBG,
                rows: [] as T_Rows,
            };
            Object.values(cSwitch.selectSubList).map((cStyle) => {
                const lineOne = !cStyle.selectOrgMapping
                    ? '...'
                    : cStyle.selectSubList[cStyle.selectOrgMapping.consumerIOBrokerChannelPath].selectName;
                const lineTwo =
                    cStyle.selectOrgMapping && cStyle.selectOrgMapping.consumerIOBrokerStatePath
                        ? cStyle.selectSubList[cStyle.selectOrgMapping.consumerIOBrokerChannelPath].selectSubList[
                              cStyle.selectOrgMapping.consumerIOBrokerStatePath
                          ].selectName
                        : undefined;
                t.rows.push([
                    {
                        lineOne: cStyle.selectName,
                        colSpan: 1,
                        bg: firstRowBG,
                        selectLists: { parentList: cSwitch, list: cStyle },
                    },
                    {
                        lineOne: lineOne,
                        lineTwo: lineTwo,
                        colSpan: 2,
                        bg: secondRowBG,
                        selectLists: { parentList: cSwitch, list: cStyle },
                    },
                ]);
            });
            tmpCurrentMappings.push(t);
        });
        setCurrentMappings(Object.values(tmpCurrentMappings));
    }, [selectList, firstRowBG, secondRowBG, errorRowBG, boxBG]);

    if (!currentMappings) return <div>Loading...</div>;

    const openModule = ({ parentList, list }: { parentList: T_SelectList; list: T_SelectList }) => {
        const tmpModalFunction = list.selectOrgMapping ? 'change' : 'add';
        setModalFunction(tmpModalFunction);
        setSelectModalTitle(
            `${tmpModalFunction === 'add' ? 'Add' : 'Change'} ${parentList.selectName} : ${list.selectName}`,
        );
        const configType = getConfigTypeHelper(mappingFn) as 'wandschalterConfig' | 'mobilerschalterConfig';
        if (tmpModalFunction === 'add') {
            setNewMapping({
                switchIOBrokerChannelPath: parentList.selectID,
                style: configType === 'wandschalterConfig' ? list.selectID : '',
                styleButtonIOBrokerStatePath: configType === 'mobilerschalterConfig' ? list.selectID : '',
                consumerIOBrokerChannelPath: '',
                consumerIOBrokerStatePath: '',
                configType: configType,
            });
        }
        if (tmpModalFunction === 'change') {
            setNewMapping(list.selectOrgMapping);
            setOldMapping(list.selectOrgMapping);
        }

        setSelectedSwitchList(parentList);
        onOpen();
    };

    const setSelected = (selectIDType: string, selectItemID: string) => {
        const ssi: any = { ...newMapping };
        ssi[selectIDType] = selectItemID;
        setNewMapping(ssi as T_Mapping);
    };

    const onSaveChange = async () => {
        if (oldMapping && newMapping && type_Mapping_Check(newMapping) && type_Mapping_Check(oldMapping)) {
            const saved = await onSaveChanges(oldMapping, newMapping);
            if (saved) {
                onCancel();
            }
        }
    };

    const onSaveAdd = async () => {
        if (newMapping && type_Mapping_Check(newMapping)) {
            const saved = await saveAdd(newMapping);
            if (saved) {
                onCancel();
            }
        }
    };

    const onDeleteChange = async () => {
        if (oldMapping && type_Mapping_Check(oldMapping)) {
            const deleted = await onDelete(oldMapping);
            if (deleted) {
                onCancel();
            }
        }
    };

    const onCancel = () => {
        onClose();
        setSelectModalTitle('');
        setNewMapping(undefined);
        setOldMapping(undefined);
        setModalFunction(undefined);
        setSelectedSwitchList(undefined);
    };

    return (
        <>
            <Box w={'100vw'}>
                <SimpleContainerWithColor withoutContainer={false}>
                    <Box p={1} textAlign="center">
                        <Text fontWeight={'bold'} fontSize={{ base: '15px', md: '20px', lg: '30px' }}>
                            All Switches
                        </Text>
                    </Box>

                    <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 2, xl: 3 }} spacing="3">
                        {currentMappings.map((mapping) => (
                            <MappingBox
                                key={uuidv4()}
                                title={mapping.title}
                                switchAdapter={mapping.switchAdapter}
                                bgMain={mapping.bgMain}
                                howerBG={mapping.howerBG}
                                rows={mapping.rows}
                                onClick={openModule}
                            />
                        ))}
                    </SimpleGrid>
                </SimpleContainerWithColor>
            </Box>
            {newMapping && modalFunction && selectedSwitchList && (
                <SelectModalDialogAddEdit
                    title={selectModalTitle}
                    newMapping={newMapping}
                    oldMapping={oldMapping}
                    modalFunction={modalFunction}
                    selectedSwitchList={selectedSwitchList}
                    setSelected={setSelected}
                    isOpen={isOpen}
                    onClose={onClose}
                    onSaveAdd={onSaveAdd}
                    onSaveChange={onSaveChange}
                    onCancel={onCancel}
                    onDeleteChange={onDeleteChange}
                />
            )}
        </>
    );
};

export default AllSwitches;
