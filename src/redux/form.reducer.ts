import { Company, Office } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import { initialCompanyList, initialOfficeList } from '../constants';
import type { PayloadAction } from '@reduxjs/toolkit';

interface FormState {
    companyList: Company[];
    editCompany: Company | null;
    officeList: Office[];
    editOffice: Office | null;
}

const initialState: FormState = {
    companyList: initialCompanyList,
    editCompany: null,
    officeList: initialOfficeList,
    editOffice: null,
};

const formReducer = createSlice({
    name: 'form', // * Đây là prefix cho action type
    initialState,
    reducers: {
        addCompany: (state, action: PayloadAction<Company>) => {
            state.companyList.push(action.payload);
        },
        addOffice: (state, action: PayloadAction<Office>) => {
            state.officeList.push(action.payload);
        },
        deleteCompany: (state, action: PayloadAction<string>) => {
            const companyId = action.payload;
            state.companyList = state.companyList.filter((company) => company.id !== companyId);
        },
        deleteOffice: (state, action: PayloadAction<string>) => {
            const officeId = action.payload;
            state.officeList = state.officeList.filter((office) => office.id !== officeId);
        },
        startEditCompany: (state, { payload: companyId }: PayloadAction<string>) => {
            const foundedCompany = state.companyList.find((company) => company.id === companyId);
            if (foundedCompany) {
                state.editCompany = foundedCompany;
            }
        },
        startEditOffice: (state, { payload: officeId }: PayloadAction<string>) => {
            const foundedOffice = state.officeList.find((office) => office.id === officeId);
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
} = formReducer.actions;
export default formReducer.reducer;
