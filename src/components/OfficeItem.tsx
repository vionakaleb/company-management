import { Office } from 'types';

interface PostItemProps {
    data: Office;
    handleDeletePost: (id: string) => void;
}

export default function OfficeItem({ data, handleDeletePost }: PostItemProps) {
    return (
        <div className="flex flex-col items-start overflow-hidden rounded-lg border md:flex-row">
            <div className="w-full flex flex-col gap-2 p-4 lg:p-6">
                <div className="flex border-b-2 pb-1 w-full">
                    <h2 className="w-full text-xl font-bold text-gray-800">{data.name}</h2>
                    <div className="w-auto">
                        <button
                            type="button"
                            className="border rounded-md shadow-sm border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700"
                            onClick={() => handleDeletePost(data.id)}
                        >
                            X
                        </button>
                    </div>
                </div>
                <p className="text-black font-semibold">Location:</p>
                <p className="text-gray-500">Lat - {data.location.latitude}</p>
                <p className="text-gray-500">Long - {data.location.longitude}</p>
                <p className="text-black font-semibold">Office Start Date:</p>
                <p className="text-gray-500">{data.officeStartDate}</p>
            </div>
        </div>
    );
}
