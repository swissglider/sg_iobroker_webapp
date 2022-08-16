import { T_SelectList } from './T_SelectList';

export type T_Rows = {
    lineOne: string;
    lineTwo?: string;
    colSpan: number;
    bg?: string;
    selectLists: { parentList: T_SelectList; list: T_SelectList };
}[][];

export type T_MappingList = {
    title: string;
    switchAdapter: string;
    bgMain: string;
    howerBG: string;
    rows: T_Rows;
};
