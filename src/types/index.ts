export interface Company {
    id: string;
    name: string;
    address: string;
    revenue: number;
    phone: {
        code: any;
        number: any;
    };
}

export interface Office {
    id: string;
    name: string;
    location: {
        latitude: string;
        longitude: string;
    };
    officeStartDate: string;
    companyId: string;
}
