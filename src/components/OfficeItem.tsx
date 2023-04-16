import { Office } from 'types';

interface OfficeItemProps {
    data: Office;
    handleDeleteOffice: (id: number) => void;
    handleStartEdit: (id: number) => void;
}

export default function OfficeItem({ data, handleDeleteOffice, handleStartEdit }: OfficeItemProps) {
    return (
        <div className="flex flex-col items-start overflow-hidden rounded-lg border md:flex-row hover:bg-slate-100">
            <div className="w-full flex flex-col gap-2 p-4 lg:p-6">
                <div className="flex border-b-2 pb-1 w-full">
                    <h2 className="w-full text-xl font-bold text-gray-800">{data.name}</h2>
                    <div className="w-auto">
                        <div className="inline-flex rounded-md shadow-sm" role="group">
                            {/* <button
                                type="button"
                                className="rounded-l-lg border border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700"
                                onClick={() => handleStartEdit(data.id)}
                            >
                                Edit
                            </button> */}
                            <button
                                type="button"
                                className="rounded-r-lg border-t border-b border-r border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700"
                                onClick={() => handleDeleteOffice(data.id)}
                            >
                                X
                            </button>
                        </div>
                    </div>
                </div>
                <p className="text-black font-semibold">Location:</p>
                <p className="text-gray-500">Lat - {data.location_latitude}</p>
                <p className="text-gray-500">Long - {data.location_longitude}</p>
                <p className="text-black font-semibold">Office Start Date:</p>
                <p className="text-gray-500">{data.office_start_date}</p>
            </div>
        </div>
    );
}
