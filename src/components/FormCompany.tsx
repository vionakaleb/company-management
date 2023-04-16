import { useForm } from 'react-hook-form';
import { Company } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import { setCompanyId } from 'redux/form.reducer';
import { RootState } from 'redux/store';
import { useEffect } from 'react';
import { useCreateCompanyMutation, useGetDetailCompanyQuery, useUpdateCompanyMutation } from 'api/company';

const initialCompany = {
    name: '',
    address: '',
    revenue: '',
    phone_code: '',
    phone_number: '',
};

export default function FormCompany() {
    const id = useSelector((state: RootState) => state.form.companyId);

    const { register, handleSubmit, setValue, reset } = useForm<Company>({
        defaultValues: initialCompany,
    });
    const dispatch = useDispatch();

    const {
        data: companyDetail,
        isError,
        isFetching,
    } = useGetDetailCompanyQuery(id ? +id : 0, { skip: id ? false : true });

    useEffect(() => {
        if (id !== 0 && !isFetching && !isError && companyDetail) {
            setValue('name', companyDetail?.name);
            setValue('address', companyDetail?.address);
            setValue('revenue', companyDetail?.revenue);
            setValue('phone_code', companyDetail?.phone_code);
            setValue('phone_number', companyDetail?.phone_number);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, isFetching, companyDetail]);

    const [createCompany] = useCreateCompanyMutation();
    const [updateCompany] = useUpdateCompanyMutation();

    const handleSubmitCompany = (payload: Company) => {
        if (id !== 0) {
            updateCompany({ id, body: payload });
        } else {
            createCompany(payload);
        }
        clearForm();
    };

    const clearForm = () => {
        dispatch(setCompanyId(0));
        reset();
    };

    return (
        <div className="w-full p-5 border-r-[1px] border-b-2">
            <h1 className="text-xl mb-3">Create Company</h1>
            <form onSubmit={handleSubmit(handleSubmitCompany)}>
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
                        htmlFor="address"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                        placeholder="Address"
                        required
                        {...register('address', { required: true })}
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="revenue"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Revenue
                    </label>
                    <input
                        type="number"
                        id="revenue"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                        placeholder="Revenue"
                        required
                        {...register('revenue', { required: true })}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
                        Phone No
                    </label>
                    <div className="flex flex-row">
                        <input
                            type="number"
                            id="phone_code"
                            className="block w-full md:w-auto mx-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                            placeholder="+ Code"
                            required
                            {...register('phone_code', { required: true })}
                        />
                        <input
                            type="number"
                            id="phone_number"
                            className="block w-full md:w-full mx-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                            placeholder="Number"
                            required
                            {...register('phone_number', { required: true })}
                        />
                    </div>
                </div>
                <div>
                    {id !== 0 && !isFetching && !isError && companyDetail ? (
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
