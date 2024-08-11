import ThemeSwitch from '@/components/globals/ThemeSwitch/ThemeSwitch';

const ClientLayout = ({ children }) => {
    return (
        <main className='max-w-[30rem] mx-auto p-5'>
            <div className='flex justify-end'>
                <ThemeSwitch />
            </div>
            {children}
        </main>
    );
};

export default ClientLayout;
