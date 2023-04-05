import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

export default function CompanyDetail() {
    const { id } = useParams();
    const companyList = useSelector((state: RootState) => state.form.companyList);

    const post: any = companyList.find((dt) => dt.id === id) || [];

    return (
        <div className="flex flex-col items-center overflow-hidden rounded-lg border md:flex-row">
            <div className="w-full flex flex-col gap-2 p-4 lg:p-6">
                <div className="flex border-b-2 pb-1 w-full">
                    <h2 className="w-full text-xl font-bold text-gray-800">{post.name}</h2>
                </div>
                <p className="text-black font-semibold">Address:</p>
                <p className="text-gray-500">{post.address}</p>
                <p className="text-black font-semibold">Revenue:</p>
                <p className="text-gray-500">{post.revenue}</p>
                <p className="text-black font-semibold">Phone No:</p>
                <p className="text-gray-500">
                    ({post.phone.code}) {post.phone.number}
                </p>
                <div className="flex justify-end">
                    <button
                        type="button"
                        className="rounded-md shadow-sm border-t border-b border-r border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700"
                        onClick={(e) => {
                            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                            e.preventDefault;
                            window.location.href = '/';
                        }}
                    >
                        Back to Overview
                    </button>
                </div>
            </div>
        </div>
    );
}
