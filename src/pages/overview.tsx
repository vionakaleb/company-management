import { FormCompany, FormOffice, CompanyList } from 'components';

export default function Overview() {
    return (
        <div className="p-5">
            <div className="flex flex-col md:flex-row">
                <FormCompany />
                <FormOffice />
            </div>
            <CompanyList />
        </div>
    );
}
