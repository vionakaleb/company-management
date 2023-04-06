import { useForm } from 'react-hook-form';
import { Company } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import { addCompany, cancelEditCompany, editingCompany } from 'redux/form.reducer';
import { RootState } from 'redux/store';
import { useEffect } from 'react';

const initialCompany = {
    name: '',
    address: '',
    revenue: 0,
    phone: {
        code: 0,
        number: 0,
    },
};

export default function FormCompany() {
    const editCompany = useSelector((state: RootState) => state.form.editCompany);
    const { register, handleSubmit, setValue } = useForm<Company>({
        defaultValues: initialCompany,
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if (editCompany) {
            setValue('name', editCompany.name);
            setValue('address', editCompany.address);
            setValue('revenue', editCompany.revenue);
            setValue('phone.code', editCompany.phone.code);
            setValue('phone.number', editCompany.phone.number);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editCompany]);

    const handleSubmitCompany = (payload: Company) => {
        if (editCompany) {
            dispatch(editingCompany({ ...payload, id: editCompany.id }));
            dispatch(cancelEditCompany());
        } else {
            const formDataWithId = { ...payload, id: new Date().toISOString() };
            dispatch(addCompany(formDataWithId));
        }
        clearForm();
    };

    const clearForm = () => {
        setValue('name', '');
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
                            id="phone.code"
                            className="block w-auto mx-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                            placeholder="Code"
                            required
                            {...register('phone.code', { required: true })}
                        />
                        <input
                            type="number"
                            id="phone.number"
                            className="block w-full mx-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                            placeholder="Number"
                            required
                            {...register('phone.number', { required: true })}
                        />
                    </div>
                </div>
                <div>
                    {!editCompany ? (
                        <button
                            className="w-full group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800"
                            type="submit"
                        >
                            <span className="w-full relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
                                Create
                            </span>
                        </button>
                    ) : (
                        <>
                            <button
                                type="submit"
                                className="w-full group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-teal-300 to-lime-300 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-lime-200 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 dark:focus:ring-lime-800"
                            >
                                <span className="w-full relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
                                    Edit
                                </span>
                            </button>
                            <button
                                type="reset"
                                className="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-red-100 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 dark:focus:ring-red-400"
                                onClick={() => {
                                    dispatch(cancelEditCompany());
                                    clearForm();
                                }}
                            >
                                <span className="w-full relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
                                    Cancel
                                </span>
                            </button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
}
