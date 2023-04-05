import { useForm } from 'react-hook-form';
import { Office } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import { addOffice, cancelEditOffice, editingOffice } from 'redux/form.reducer';
import { RootState } from 'redux/store';
import { useEffect } from 'react';

const initialPost = {
    name: '',
    location: {
        latitude: '',
        longitude: '',
    },
    officeStartDate: '',
    companyId: '',
};

export default function FormOffice() {
    const companyList = useSelector((state: RootState) => state.form.companyList);

    const editOffice = useSelector((state: RootState) => state.form.editOffice);
    const { register, handleSubmit, setValue } = useForm<Office>({
        defaultValues: initialPost,
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if (editOffice) {
            setValue('name', editOffice.name);
            setValue('location.latitude', editOffice.location.latitude);
            setValue('location.longitude', editOffice.location.longitude);
            setValue('officeStartDate', editOffice.officeStartDate);
            setValue('companyId', editOffice.companyId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editOffice]);

    const handleSubmitPost = (payload: Office) => {
        if (editOffice) {
            dispatch(editingOffice({ ...payload, id: editOffice.id }));
            dispatch(cancelEditOffice());
        } else {
            const formDataWithId = { ...payload, id: new Date().toISOString() };
            dispatch(addOffice(formDataWithId));
        }
        clearForm();
    };

    const clearForm = () => {
        setValue('name', '');
        setValue('location.latitude', '');
        setValue('location.longitude', '');
        setValue('officeStartDate', '');
        setValue('companyId', '');
    };

    return (
        <div className="w-full p-5 border-l-[1px] border-b-2">
            <h1 className="text-xl mb-3">Create Office</h1>
            <form onSubmit={handleSubmit(handleSubmitPost)}>
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
                            id="location.latitude"
                            className="block w-full mx-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                            placeholder="Latitude"
                            required
                            {...register('location.latitude', { required: true })}
                        />
                        <input
                            type="number"
                            id="location.longitude"
                            className="block w-full mx-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                            placeholder="Longitude"
                            required
                            {...register('location.longitude', { required: true })}
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="officeStartDate"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Office Start Date
                    </label>
                    <input
                        type="datetime-local"
                        id="officeStartDate"
                        className="w-full block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                        placeholder="Title"
                        required
                        {...register('officeStartDate', { required: true })}
                    />
                </div>
                <div className="mb-10">
                    <label
                        htmlFor="companyId"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Company
                    </label>
                    <select {...register('companyId')} name="companyId" id="companyId" className="w-full">
                        <option value="" disabled>
                            Select Company
                        </option>
                        {companyList.map((company) => (
                            <option value={company.id}>{company.name}</option>
                        ))}
                    </select>
                </div>
                {/* <div className="mb-6 flex items-center">
                    <input
                        id="publish"
                        type="checkbox"
                        className="h-4 w-4 focus:ring-2 focus:ring-blue-500"
                        {...register('published', { required: true })}
                    />
                    <label htmlFor="publish" className="ml-2 text-sm font-medium text-gray-900">
                        Publish
                    </label>
                </div> */}
                <div>
                    {!editOffice ? (
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
                                className="w-full group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-red-100 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 dark:focus:ring-red-400"
                                onClick={() => {
                                    dispatch(cancelEditOffice());
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
