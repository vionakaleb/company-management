import { Company, Office } from 'types';

export const initialCompanyList: Company[] = [
    {
        id: '1',
        name: 'Google',
        address: 'United States',
        revenue: 99999,
        phone: {
            code: 1,
            number: 787097968,
        },
    },
    {
        id: '2',
        name: 'Twitter.',
        address: 'United States',
        revenue: 99888,
        phone: {
            code: 1,
            number: 8567867768,
        },
    },
];

export const initialOfficeList: Office[] = [
    {
        id: '1',
        name: 'Mountain View',
        location: {
            latitude: '787097968',
            longitude: '-787097968',
        },
        officeStartDate: '04/04/2023',
        companyId: '1',
    },
    {
        id: '2',
        name: 'San Fransisco',
        location: {
            latitude: '887097968',
            longitude: '-887097968',
        },
        officeStartDate: '06/04/2023',
        companyId: '2',
    },
];
