export interface Company {
    id: number;
    name: string;
    address: string;
    revenue: string;
    phone_code: string;
    phone_number: string;
}

export interface Office {
    id: number;
    name: string;
    location_latitude: string;
    location_longitude: string;
    office_start_date: string;
    company_id: string;
}
