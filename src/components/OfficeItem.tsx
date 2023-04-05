import { Office } from 'types';

interface PostItemProps {
    post: Office;
    handleDeletePost: (id: string) => void;
}

export default function OfficeItem({ post, handleDeletePost }: PostItemProps) {
    return (
        <div className="flex flex-col items-start overflow-hidden rounded-lg border md:flex-row">
            <div className="w-full flex flex-col gap-2 p-4 lg:p-6">
                <div className="flex border-b-2 pb-1 w-full">
                    <h2 className="w-full text-xl font-bold text-gray-800">{post.name}</h2>
                    <div className="w-auto">
                        <button
                            type="button"
                            className="border rounded-md shadow-sm border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700"
                            onClick={() => handleDeletePost(post.id)}
                        >
                            X
                        </button>
                    </div>
                </div>
                <p className="text-black font-semibold">Location:</p>
                <p className="text-gray-500">Lat - {post.location.latitude}</p>
                <p className="text-gray-500">Long - {post.location.longitude}</p>
                <p className="text-black font-semibold">Office Start Date:</p>
                <p className="text-gray-500">{post.officeStartDate}</p>
            </div>
        </div>
    );
}
