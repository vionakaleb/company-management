import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

export default function CompanyDetail() {
    const { id } = useParams();
    const companyList = useSelector((state: RootState) => state.form.companyList);

    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const dt: any = companyList.find((dt) => dt.id === id);
        if (!data) setData(dt);
    }, [companyList, data, id]);

    return (
        <div className="flex flex-col items-center overflow-hidden rounded-lg border md:flex-row">
            {data ? (
                <div className="w-full flex flex-col gap-2 p-4 lg:p-6">
                    <div className="flex border-b-2 pb-1 w-full">
                        <h2 className="w-full text-xl font-bold text-gray-800">{data?.name}</h2>
                    </div>
                    <p className="text-black font-semibold">Address:</p>
                    <p className="text-gray-500">{data?.address}</p>
                    <p className="text-black font-semibold">Revenue:</p>
                    <p className="text-gray-500">{data?.revenue}</p>
                    <p className="text-black font-semibold">Phone No:</p>
                    <p className="text-gray-500">
                        ({data?.phone?.code}) {data?.phone?.number}
                    </p>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="rounded-md shadow-sm border-t border-b border-r border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700"
                            onClick={(e) => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                                e.preventDefault;
                                window.location.href = '/company-management';
                            }}
                        >
                            Back to Overview
                        </button>
                    </div>
                </div>
            ) : (
                <div className="w-full flex flex-col gap-2 p-4 lg:p-6 text-center">
                    <p>No data</p>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="rounded-md shadow-sm border-t border-b border-r border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700"
                            onClick={(e) => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                                e.preventDefault;
                                window.location.href = '/company-management';
                            }}
                        >
                            Back to Overview
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}