import { T_Mapping } from './T_Mapping';

export type T_SelectList = {
    selectID: string;
    selectName: string;
    selectAdapterName: string;
    selectSubListTitle: string;
    selectSubListIDType: string;
    selectSubList: Record<string, T_SelectList>; // selectID
    selectSubListPlaceholder?: string;
    // isAlreadyConfigured?: boolean;
    selectOrgMapping?: T_Mapping;
};
