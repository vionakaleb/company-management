import CompanyItem from './CompanyItem';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { useDispatch } from 'react-redux';
import { deleteCompany, startEditCompany } from 'redux/form.reducer';

export default function CompanyList() {
    const companyList = useSelector((state: RootState) => state.form.companyList);
    const dispatch = useDispatch();

    const handleDeletePost = (id: string) => {
        dispatch(deleteCompany(id));
    };

    const handleStartEdit = (id: string) => {
        dispatch(startEditCompany(id));
    };

    return (
        <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                <div className="mb-10 md:mb-16">
                    <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Companies</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8">
                    {companyList.map((post) => (
                        <CompanyItem
                            key={post.id}
                            post={post}
                            handleDeletePost={handleDeletePost}
                            handleStartEdit={handleStartEdit}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
