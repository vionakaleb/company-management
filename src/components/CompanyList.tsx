import { useState, useEffect } from 'react';
import CompanyItem from './CompanyItem';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'redux/store';
import { deleteCompany, startEditCompany } from 'redux/form.reducer';

export default function CompanyList() {
    const companyList = useSelector((state: RootState) => state.form.companyList);
    const dispatch = useDispatch();

    const [data, setData] = useState<any>(null);

    useEffect(() => {
        if (!data) setData(companyList);
    }, [companyList, data]);

    const handleDeletePost = (id: string) => {
        dispatch(deleteCompany(id));
    };

    const handleStartEdit = (id: string) => {
        dispatch(startEditCompany(id));
    };

    return (
        <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                <div className="mb-10 md:mb-16">
                    <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Companies</h2>
                </div>
                {data ? (
                    <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8">
                        {data.map((dt: any) => (
                            <CompanyItem
                                key={dt.id}
                                data={dt}
                                handleDeletePost={handleDeletePost}
                                handleStartEdit={handleStartEdit}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="w-full flex flex-col gap-2 p-4 lg:p-6 text-center">
                        <p>No data</p>
                    </div>
                )}
            </div>
        </div>
    );
}
