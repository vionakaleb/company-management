import { Link } from 'react-router-dom';
import { Company } from 'types';

interface CompanyItemProps {
    data: Company;
    handleDeleteCompany: (id: string) => void;
    handleStartEdit: (id: string) => void;
}

export default function CompanyItem({ data, handleDeleteCompany, handleStartEdit }: CompanyItemProps) {
    return (
        <div className="flex flex-col items-start overflow-hidden rounded-lg border md:flex-row hover:bg-slate-100">
            <div className="w-full flex flex-col gap-2 p-4 lg:p-6">
                <div className="flex border-b-2 pb-1 w-full">
                    <Link
                        to={`/company-management/offices/${data.id}`}
                        className="w-full text-xl font-bold text-gray-800"
                    >
                        {data.name}
                    </Link>
                    <div className="w-auto">
                        <div className="inline-flex rounded-md shadow-sm" role="group">
                            <button
                                type="button"
                                className="rounded-l-lg border border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700"
                                onClick={() => handleStartEdit(data.id)}
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                className="rounded-r-lg border-t border-b border-r border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700"
                                onClick={() => handleDeleteCompany(data.id)}
                            >
                                X
                            </button>
                        </div>
                    </div>
                </div>
                <Link to={`/company-management/offices/${data.id}`}>
                    <p className="text-black font-semibold">Address:</p>
                    <p className="text-gray-500">{data.address}</p>
                    <p className="text-black font-semibold">Revenue:</p>
                    <p className="text-gray-500">{data.revenue}</p>
                    <p className="text-black font-semibold">Phone No:</p>
                    <p className="text-gray-500">
                        ({data.phone.code}) {data.phone.number}
                    </p>
                </Link>
            </div>
        </div>
    );
}
