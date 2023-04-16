import { useNavigate, useParams } from 'react-router-dom';
import OfficeItem from './OfficeItem';
import { useDispatch } from 'react-redux';
import { setOfficeId } from 'redux/form.reducer';
import { useDeleteOfficeMutation, useGetAllOfficeQuery } from 'api/office';

export default function OfficeList() {
    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data: officeList, isFetching } = useGetAllOfficeQuery(id);
    const [deleteOffice] = useDeleteOfficeMutation();

    const handleDeleteOffice = (id: number) => {
        deleteOffice(id);
    };

    const handleStartEdit = (id: number) => {
        navigate('/company-management');
        dispatch(setOfficeId(id));
    };

    return (
        <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                <div className="mb-10 md:mb-16">
                    <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Offices</h2>
                </div>
                {isFetching ? (
                    <div className="w-full flex flex-col gap-2 p-4 lg:p-6 text-center">
                        <p>Loading...</p>
                    </div>
                ) : officeList ? (
                    <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8">
                        {officeList.map((data: any) => (
                            <OfficeItem
                                key={data.id}
                                data={data}
                                handleDeleteOffice={handleDeleteOffice}
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
