import { getUserById } from '@/queries/user';
import UserProfileCard from './_components/UserProfileCard';
import BreadcrumbSection from '@/components/globals/Breadcrumb/BreadcrumbSection';

const UserEditPage = async ({ params: { id } }) => {
    const findUser = await getUserById(id, true);

    const items = [
        {
            label: 'Dashboard',
            href: '/dashboard'
        },
        {
            label: 'Users',
            href: '/dashboard/users'
        },
        {
            label: findUser?.name,
            current: true
        }
    ];

    return (
        <>
            <BreadcrumbSection items={items} />
            <div className='max-w-lg py-3 mx-auto md:py-5'>
                <UserProfileCard user={findUser} />
            </div>
        </>
    );
};

export default UserEditPage;
