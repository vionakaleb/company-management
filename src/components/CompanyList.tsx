import CompanyItem from './CompanyItem';
import { useDispatch } from 'react-redux';
import { setCompanyId } from 'redux/form.reducer';
import { useDeleteCompanyMutation, useGetAllCompanyQuery } from 'api/company';

export default function CompanyList() {
    const dispatch = useDispatch();

    const { data: companyList, isFetching } = useGetAllCompanyQuery({
        search: '',
    });

    const [deleteCompany] = useDeleteCompanyMutation();

    const handleDeleteCompany = (id: number) => {
        deleteCompany(id);
    };

    const handleStartEdit = (id: number) => {
        dispatch(setCompanyId(id));
    };

    return (
        <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                <div className="mb-10 md:mb-16">
                    <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Companies</h2>
                </div>
                {isFetching ? (
                    <div className="w-full flex flex-col gap-2 p-4 lg:p-6 text-center">
                        <p>Loading...</p>
                    </div>
                ) : companyList ? (
                    <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8">
                        {companyList.map((dt: any) => (
                            <CompanyItem
                                key={dt.id}
                                data={dt}
                                handleDeleteCompany={handleDeleteCompany}
                                handleStartEdit={handleStartEdit}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="w-full flex flex-col gap-2 p-4 lg:p-6 text-center">
                        <p>No data.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
