import { getSessionUser } from '@/lib/dal';
import { Navbar } from './_components/navbar';
import Sidebar from './_components/sidebar';
import { redirect } from 'next/navigation';

const AdminDashboardLayout = async ({ children }) => {
    const sessionUser = await getSessionUser();

    if (!sessionUser || sessionUser?.role !== 'admin') {
        redirect('/');
    }

    return (
        <div className='relative h-full'>
            <div className='h-[80px] lg:pl-60 fixed inset-y-0 w-full z-50'>
                <Navbar />
            </div>
            <div className='fixed inset-y-0 z-50 flex-col hidden h-full w-60 lg:flex'>
                <Sidebar />
            </div>
            <main className='lg:pl-60 pt-[80px] h-full'>{children}</main>
        </div>
    );
};
export default AdminDashboardLayout;
