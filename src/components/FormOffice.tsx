import { useForm } from 'react-hook-form';
import { Office } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import { setOfficeId } from 'redux/form.reducer';
import { RootState } from 'redux/store';
import { useEffect } from 'react';
import { useCreateOfficeMutation, useGetDetailOfficeQuery, useUpdateOfficeMutation } from 'api/office';
import { useGetAllCompanyQuery } from 'api/company';

const initialOffice = {
    name: '',
    location_latitude: '',
    location_longitude: '',
    office_start_date: '',
    company_id: '',
};

export default function FormOffice() {
    const id = useSelector((state: RootState) => state.form.officeId);

    const { register, handleSubmit, setValue, reset } = useForm<Office>({
        defaultValues: initialOffice,
    });
    const dispatch = useDispatch();

    const {
        data: officeDetail,
        isError,
        isFetching,
    } = useGetDetailOfficeQuery(id ? +id : 0, { skip: id ? false : true });

    const { data: companyList } = useGetAllCompanyQuery({
        search: '',
    });

    useEffect(() => {
        if (id !== 0 && !isFetching && !isError && officeDetail) {
            setValue('name', officeDetail.name);
            setValue('location_latitude', officeDetail.location_latitude);
            setValue('location_longitude', officeDetail.location_longitude);
            setValue('office_start_date', officeDetail.office_start_date);
            setValue('company_id', officeDetail.company_id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, isFetching, officeDetail]);

    const [createOffice] = useCreateOfficeMutation();
    const [updateOffice] = useUpdateOfficeMutation();

    const handleSubmitOffice = (payload: Office) => {
        if (id !== 0) {
            updateOffice({ id, body: payload });
        } else {
            createOffice(payload);
        }
        clearForm();
    };

    const clearForm = () => {
        dispatch(setOfficeId(0));
        reset();
    };

    return (
        <div className="w-full p-5 border-l-[1px] border-b-2">
            <h1 className="text-xl mb-3">Create Office</h1>
            <form onSubmit={handleSubmit(handleSubmitOffice)}>
                <div className="mb-6">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                        placeholder="Name"
                        required
                        {...register('name', { required: true })}
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="location"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Location
                    </label>
                    <div className="flex flex-row">
                        <input
                            type="number"
                            id="location_latitude"
                            className="block w-full mx-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                            placeholder="Latitude"
                            required
                            {...register('location_latitude', { required: true })}
                        />
                        <input
                            type="number"
                            id="location_longitude"
                            className="block w-full mx-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                            placeholder="Longitude"
                            required
                            {...register('location_longitude', { required: true })}
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="office_start_date"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Office Start Date
                    </label>
                    <input
                        type="datetime-local"
                        id="office_start_date"
                        className="w-full block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                        placeholder="Title"
                        required
                        {...register('office_start_date', { required: true })}
                    />
                </div>
                <div className="mb-10">
                    <label
                        htmlFor="company_id"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Company
                    </label>
                    <select {...register('company_id')} name="company_id" id="company_id" className="w-full">
                        <option value="" disabled>
                            Select Company
                        </option>
                        {companyList?.length > 0
                            ? companyList.map((company: any) => <option value={company.id}>{company.name}</option>)
                            : []}
                    </select>
                </div>
                <div>
                    {id !== 0 && !isFetching && !isError && officeDetail ? (
                        <div className="flex">
                            <button
                                type="submit"
                                className="w-full group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 from-gray-600 to-gray-800 group-hover:from-gray-600 group-hover:to-gray-800 dark:text-white dark:hover:text-gray-900"
                            >
                                <span className="w-full relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-400">
                                    Edit
                                </span>
                            </button>
                            <button
                                type="reset"
                                className="w-full md:w-[40%] group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 from-gray-600 to-gray-800 group-hover:from-gray-600 group-hover:to-gray-800 dark:text-gray dark:hover:text-gray-900"
                                onClick={() => {
                                    clearForm();
                                }}
                            >
                                <span className="w-full relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-500">
                                    Cancel
                                </span>
                            </button>
                        </div>
                    ) : (
                        <button
                            className="w-full group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 from-gray-600 to-gray-800 group-hover:from-gray-600 group-hover:to-gray-800 dark:text-white"
                            type="submit"
                        >
                            <span className="w-full relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-400">
                                Create
                            </span>
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
