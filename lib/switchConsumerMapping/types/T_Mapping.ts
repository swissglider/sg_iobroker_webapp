type T_Mapping_Must = {
    switchIOBrokerChannelPath: string;
    consumerIOBrokerChannelPath: string;
    consumerIOBrokerStatePath?: string;
};

export type T_Mapping_Styled = T_Mapping_Must & {
    style: string;
    configType: 'wandschalterConfig';
};

export type T_Mapping_StyledButton = T_Mapping_Must & {
    styleButtonIOBrokerStatePath: string;
    configType: 'mobilerschalterConfig';
};

export type T_Mapping = T_Mapping_Styled | T_Mapping_StyledButton;

export const type_Mapping_Check = (toTest: any): boolean => {
    if (!(toTest.hasOwnProperty('switchIOBrokerChannelPath') && toTest['switchIOBrokerChannelPath'] !== '')) {
        return false;
    }
    if (!(toTest.hasOwnProperty('consumerIOBrokerChannelPath') && toTest['consumerIOBrokerChannelPath'] !== '')) {
        return false;
    }
    if (
        toTest.hasOwnProperty('configType') &&
        toTest.configType === 'wandschalterConfig' &&
        toTest.hasOwnProperty('style') &&
        toTest.style !== ''
    ) {
        return true;
    }
    if (
        toTest.hasOwnProperty('configType') &&
        toTest.configType === 'mobilerschalterConfig' &&
        toTest.hasOwnProperty('styleButtonIOBrokerStatePath') &&
        toTest.styleButtonIOBrokerStatePath !== ''
    ) {
        return true;
    }
    return false;
};
