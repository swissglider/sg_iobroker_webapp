import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import SelectBoxSmart from './SelectBoxSmart';
import { T_SelectList } from '../../../lib/switchConsumerMapping/types/T_SelectList';
import { type_Mapping_Check, T_Mapping } from '../../../lib/switchConsumerMapping/types/T_Mapping';

export type T_SelectModalDialogAddEditProps = {
    title: string;
    newMapping: T_Mapping;
    oldMapping?: T_Mapping;
    modalFunction: 'add' | 'change';
    selectedSwitchList: T_SelectList;

    setSelected: (selectIDType: string, selectItemID: string) => void;

    isOpen: boolean;
    onClose: () => void;
    onSaveAdd: () => void;
    onSaveChange: () => void;
    onCancel: () => void;
    onDeleteChange: () => void;
};

const SelectModalDialogAddEdit = ({
    title,
    newMapping,
    oldMapping,
    modalFunction,
    selectedSwitchList,

    setSelected,

    isOpen,
    onClose,
    onSaveAdd,
    onSaveChange,
    onCancel,
    onDeleteChange,
}: T_SelectModalDialogAddEditProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="full">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <SelectBoxSmart
                        selectList={selectedSwitchList}
                        setSelected={setSelected}
                        newMapping={newMapping}
                        oldMapping={oldMapping}
                    />
                </ModalBody>

                <ModalFooter>
                    <Button
                        colorScheme="blue"
                        mr={3}
                        onClick={modalFunction === 'add' ? onSaveAdd : onSaveChange}
                        isDisabled={!type_Mapping_Check(newMapping)}
                    >
                        Save
                    </Button>
                    {modalFunction === 'change' && (
                        <Button colorScheme="red" variant="ghost" onClick={onDeleteChange}>
                            Delete
                        </Button>
                    )}
                    <Button variant="ghost" onClick={onCancel}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default SelectModalDialogAddEdit;
