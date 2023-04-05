import { useParams } from 'react-router-dom';
import OfficeItem from './OfficeItem';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'redux/store';
import { deleteOffice } from 'redux/form.reducer';

export default function OfficeList() {
    const { id } = useParams();

    const officeList = useSelector((state: RootState) => state.form.officeList);
    const dispatch = useDispatch();

    const handleDeletePost = (id: string) => {
        dispatch(deleteOffice(id));
    };

    return (
        <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                <div className="mb-10 md:mb-16">
                    <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Offices</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8">
                    {officeList
                        .filter((office) => office.companyId === id)
                        .map((post) => (
                            <OfficeItem key={post.id} post={post} handleDeletePost={handleDeletePost} />
                        ))}
                </div>
            </div>
        </div>
    );
}
