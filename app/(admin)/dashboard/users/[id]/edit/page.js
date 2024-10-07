import { getUserById } from '@/queries/user';
import UserProfileCard from './_components/UserProfileCard';

const UserEditPage = async ({ params: { id } }) => {
    const findUser = await getUserById(id, true);

    return (
        <div className='max-w-lg py-5 mx-auto'>
            <UserProfileCard user={findUser} />
        </div>
    );
};

export default UserEditPage;
