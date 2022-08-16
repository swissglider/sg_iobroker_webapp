import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { mutate } from 'swr';
import { v4 as uuidv4 } from 'uuid';
import SimpleTableWithColors, { T_TableCol } from '../generel/SimpleTableWithColors';

export type T_EditModalProps = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    modalFunction: 'add' | 'edit';
    selectedConfig: {
        wandschalterChannelID: string;
        style?: string;
        selectedLampeID?: string;
        selectedSceneID?: string;
    };
    wandschalterList: any;
    lampenList: any;
    configList: any;
    configurationList: any;
};

const tableCols: T_TableCol = [
    {
        param: ['wandschalterString', 'lampenString'],
        colSpan: 8,
        align: 'left',
        type: 'textArray',
    },
];

const EditModal = ({
    isOpen,
    onClose,
    modalFunction,
    selectedConfig: { wandschalterChannelID, style = '', selectedLampeID = '', selectedSceneID = '' },
    wandschalterList,
    lampenList,
    configList,
    configurationList,
}: T_EditModalProps) => {
    const [tmpSelectedWandschalter, setTmpSelectedWandschalter] = useState<string>('');
    const [tmpSelectedStyle, setTmpSelectedStyle] = useState<string>('');
    const [tmpSelectedLampe, setTmpSelectedLampe] = useState<string>('');
    const [tmpSelectedLampeScene, setTmpSelectedLampeScene] = useState<string>('');
    const [isRedyConfOpen, setIsRedyConfOpen] = useState<boolean>(false);
    const toast = useToast();
    const [tpmConfigList, setTmpConfigList] = useState<any>();
    const [tmpConfigurationList, setTmpConfigurationList] = useState<any>();

    useEffect(() => {
        setTmpSelectedWandschalter(wandschalterChannelID);
        setTmpSelectedStyle(style);
        setTmpSelectedLampe(selectedLampeID);
        setTmpSelectedLampeScene(selectedSceneID);
        setTmpConfigList(
            modalFunction === 'edit'
                ? configList.filter(
                      (e: any) =>
                          !(
                              e.wandschalterChannelID === wandschalterChannelID &&
                              e.selectedLampeID === selectedLampeID &&
                              e.style === style
                          ),
                  )
                : configList,
        );
        setTmpConfigurationList(
            modalFunction === 'edit'
                ? configurationList.filter(
                      (e: any) =>
                          !(
                              e.config.wandschalterChannelID === wandschalterChannelID &&
                              e.config.selectedLampeID === selectedLampeID &&
                              e.config.style === style
                          ),
                  )
                : configurationList,
        );
    }, [wandschalterChannelID, style, selectedLampeID, selectedSceneID, configList, configurationList, modalFunction]);

    const save = async () => {
        if (
            tmpSelectedWandschalter &&
            tmpSelectedWandschalter !== '' &&
            tmpSelectedLampe &&
            tmpSelectedLampe != '' &&
            tmpSelectedStyle &&
            tmpSelectedStyle !== '' &&
            !tpmConfigList.some(
                (e: any) =>
                    e.wandschalterChannelID === tmpSelectedWandschalter &&
                    e.selectedLampeID === tmpSelectedLampe &&
                    e.style === tmpSelectedStyle,
            )
        ) {
            const configToAdd = {
                wandschalterChannelID: tmpSelectedWandschalter,
                selectedLampeID: tmpSelectedLampe,
                style: tmpSelectedStyle,
                selectedSceneID:
                    tmpSelectedLampeScene && tmpSelectedLampeScene !== '' ? tmpSelectedLampeScene : undefined,
            };
            const response =
                modalFunction === 'add'
                    ? await fetch('/api/nodeRedStandardCall', {
                          method: 'POST',
                          body: JSON.stringify({ config: configToAdd, url: 'wandschalterLampeMapper/addSingleConfig' }),
                          headers: {
                              'Content-Type': 'application/json',
                          },
                      })
                    : await fetch('/api/nodeRedStandardCall', {
                          method: 'POST',
                          body: JSON.stringify({
                              config: {
                                  new: configToAdd,
                                  toDelete: {
                                      wandschalterChannelID,
                                      style,
                                      selectedLampeID,
                                      selectedSceneID: selectedSceneID !== '' ? selectedSceneID : undefined,
                                  },
                              },
                              url: 'wandschalterLampeMapper/editSingleConfig',
                          }),
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
                    description: modalFunction === 'add' ? `Added` : 'Changed',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
            }
            mutate('/api/getWandschalterConfiguration');
        } else {
            toast({
                description: `Not all parameter set`,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
        onClose();
    };

    const cancel = () => {
        setTmpSelectedWandschalter(wandschalterChannelID);
        setTmpSelectedStyle(style);
        setTmpSelectedLampe(selectedLampeID);
        setTmpSelectedLampeScene(selectedSceneID);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="full">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Add{' '}
                    {tmpSelectedWandschalter && wandschalterList[tmpSelectedWandschalter]
                        ? wandschalterList[tmpSelectedWandschalter].name
                        : ''}
                </ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <FormControl>
                        <FormLabel>
                            <IconButton
                                size={{ base: 'lg', md: 'lg', lg: 'lg' }}
                                variant={{ base: 'ghost', md: 'ghost', lg: 'ghost' }}
                                colorScheme="teal"
                                aria-label="Search database"
                                icon={isRedyConfOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                                onClick={() => setIsRedyConfOpen(!isRedyConfOpen)}
                            />{' '}
                            Configuration Available{' '}
                        </FormLabel>
                        {isRedyConfOpen ? (
                            <Flex justify="stretch" direction="column">
                                <SimpleTableWithColors
                                    tableCols={tableCols}
                                    valueList={tmpConfigurationList.filter(
                                        (e: any) => e.config.wandschalterChannelID === tmpSelectedWandschalter,
                                    )}
                                    withoutContainer={true}
                                />
                            </Flex>
                        ) : (
                            ''
                        )}
                    </FormControl>
                    <FormControl>
                        <FormLabel>Style</FormLabel>
                        <Select
                            placeholder="Select style"
                            onChange={(val) => {
                                setTmpSelectedStyle(val.target.value);
                            }}
                            value={tmpSelectedStyle}
                        >
                            {tmpSelectedWandschalter && wandschalterList[tmpSelectedWandschalter]
                                ? wandschalterList[tmpSelectedWandschalter].availableStyles.map((style: string) => (
                                      <option key={uuidv4()} value={style}>
                                          {style}
                                      </option>
                                  ))
                                : ''}
                        </Select>
                    </FormControl>

                    {tmpSelectedStyle && tmpSelectedStyle !== '' ? (
                        <FormControl mt={4}>
                            <FormLabel>Lampe</FormLabel>
                            <Select
                                placeholder="Select lampe"
                                onChange={(val) => {
                                    setTmpSelectedLampe(val.target.value);
                                }}
                                value={tmpSelectedLampe}
                            >
                                {lampenList
                                    ? Object.entries(lampenList)
                                          .filter(
                                              ([lampeKey1]: [string, any]) =>
                                                  !tpmConfigList.some(
                                                      (e: any) =>
                                                          e.wandschalterChannelID === tmpSelectedWandschalter &&
                                                          e.selectedLampeID === lampeKey1 &&
                                                          e.style === tmpSelectedStyle,
                                                  ),
                                          )
                                          .map(([lampeKey, lampeValue]: [string, any]) => (
                                              <option key={uuidv4()} value={lampeKey}>
                                                  {lampeValue.adapterName} : {lampeValue.name}
                                              </option>
                                          ))
                                    : ''}
                            </Select>
                        </FormControl>
                    ) : (
                        ''
                    )}

                    {tmpSelectedStyle &&
                    tmpSelectedStyle !== '' &&
                    tmpSelectedLampe !== '' &&
                    lampenList[tmpSelectedLampe] &&
                    lampenList[tmpSelectedLampe].scenes &&
                    lampenList[tmpSelectedLampe].scenes.length > 0 ? (
                        <FormControl mt={4}>
                            <FormLabel>Lampe Scene</FormLabel>
                            <Select
                                placeholder="Select Scene"
                                onChange={(val) => {
                                    setTmpSelectedLampeScene(val.target.value);
                                }}
                                value={tmpSelectedLampeScene}
                            >
                                {lampenList[tmpSelectedLampe].scenes.map((e: any) => (
                                    <option key={uuidv4()} value={e.id}>
                                        {e.name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    ) : (
                        ''
                    )}
                </ModalBody>

                <ModalFooter>
                    <Button
                        colorScheme="blue"
                        mr={3}
                        onClick={save}
                        isDisabled={
                            !(
                                tmpSelectedWandschalter &&
                                tmpSelectedWandschalter !== '' &&
                                tmpSelectedLampe &&
                                tmpSelectedLampe != '' &&
                                tmpSelectedStyle &&
                                tmpSelectedStyle !== ''
                            )
                        }
                    >
                        Save
                    </Button>
                    <Button variant="ghost" onClick={cancel}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditModal;
