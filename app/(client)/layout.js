import ThemeSwitch from '@/components/globals/ThemeSwitch/ThemeSwitch';
import Header from './_components/Header/Header';

const ClientLayout = ({ children }) => {
    return (
        <main className='max-w-[30rem] mx-auto p-5'>
            <div className='flex items-center justify-between pb-3'>
                <Header />
                <ThemeSwitch />
            </div>
            {children}
        </main>
    );
};

export default ClientLayout;
