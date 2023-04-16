import { Company, Office } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface FormState {
    companyId: number;
    companyList: Company[];
    editCompany: Company | null;
    officeId: number;
    officeList: Office[];
    editOffice: Office | null;
}

const initialState: FormState = {
    companyId: 0,
    companyList: [],
    editCompany: null,
    officeId: 0,
    officeList: [],
    editOffice: null,
};

const formReducer = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setCompanyId: (state, action: PayloadAction<number>) => {
            state.companyId = action.payload;
        },
        setOfficeId: (state, action: PayloadAction<number>) => {
            state.officeId = action.payload;
        },
        addCompany: (state, action: PayloadAction<Company>) => {
            state.companyList.push(action.payload);
        },
        addOffice: (state, action: PayloadAction<Office>) => {
            state.officeList.push(action.payload);
        },
        deleteCompany: (state, action: PayloadAction<number>) => {
            const companyId = action.payload;
            state.companyList = state.companyList.filter((company) => company.id !== +companyId);
        },
        deleteOffice: (state, action: PayloadAction<number>) => {
            const officeId = action.payload;
            state.officeList = state.officeList.filter((office) => office.id !== +officeId);
        },
        startEditCompany: (state, { payload: companyId }: PayloadAction<number>) => {
            const foundedCompany = state.companyList.find((company) => company.id === +companyId);
            if (foundedCompany) {
                state.editCompany = foundedCompany;
            }
        },
        startEditOffice: (state, { payload: officeId }: PayloadAction<number>) => {
            const foundedOffice = state.officeList.find((office) => office.id === +officeId);
            if (foundedOffice) {
                state.editOffice = foundedOffice;
            }
        },
        cancelEditCompany: (state) => {
            state.editCompany = null;
        },
        cancelEditOffice: (state) => {
            state.editOffice = null;
        },
        editingCompany: (state, action: PayloadAction<Company>) => {
            const { id } = action.payload;
            state.companyList.some((company, index) => {
                if (company.id === id) {
                    state.companyList[index] = action.payload;
                    return true;
                }
                return false;
            });
        },
        editingOffice: (state, action: PayloadAction<Office>) => {
            const { id } = action.payload;
            state.officeList.some((office, index) => {
                if (office.id === id) {
                    state.officeList[index] = action.payload;
                    return true;
                }
                return false;
            });
        },
    },
});

export const {
    addCompany,
    addOffice,
    cancelEditCompany,
    cancelEditOffice,
    deleteCompany,
    deleteOffice,
    editingCompany,
    editingOffice,
    startEditCompany,
    startEditOffice,
    setCompanyId,
    setOfficeId,
} = formReducer.actions;
export default formReducer.reducer;
