import ThemeSwitch from '@/components/globals/ThemeSwitch/ThemeSwitch';
import Header from './_components/Header/Header';
import RefreshPage from '@/components/globals/RefreshPage/RefreshPage';

const ClientLayout = ({ children }) => {
    return (
        <div className='relative z-10 max-w-[30rem] mx-auto p-3'>
            <div className='flex items-center justify-between pb-3'>
                <Header />
                <div className='flex items-center gap-3'>
                    <RefreshPage />
                    <ThemeSwitch />
                </div>
            </div>
            <div className='z-20'>{children}</div>
        </div>
    );
};

export default ClientLayout;
