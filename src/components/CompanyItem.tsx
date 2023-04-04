import { Company } from 'types';

interface PostItemProps {
    post: Company;
    handleDeletePost: (id: string) => void;
    handleStartEdit: (id: string) => void;
}

export default function CompanyItem({ post, handleDeletePost, handleStartEdit }: PostItemProps) {
    return (
        <div className="flex flex-col items-center overflow-hidden rounded-lg border md:flex-row">
            <div className="w-full flex flex-col gap-2 p-4 lg:p-6">
                <div className="flex border-b-2 pb-1 w-full">
                    <h2 className="w-full text-xl font-bold text-gray-800">{post.name}</h2>
                    <div className="w-auto">
                        <div className="inline-flex rounded-md shadow-sm" role="group">
                            <button
                                type="button"
                                className="rounded-l-lg border border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700"
                                onClick={() => handleStartEdit(post.id)}
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                className="rounded-r-lg border-t border-b border-r border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700"
                                onClick={() => handleDeletePost(post.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
                <p className="text-black font-semibold">Address:</p>
                <p className="text-gray-500">{post.address}</p>
                <p className="text-black font-semibold">Revenue:</p>
                <p className="text-gray-500">{post.revenue}</p>
                <p className="text-black font-semibold">Phone No:</p>
                <p className="text-gray-500">
                    ({post.phone.code}) {post.phone.number}
                </p>
            </div>
        </div>
    );
}
