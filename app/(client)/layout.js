import ThemeSwitch from '@/components/globals/ThemeSwitch/ThemeSwitch';
import Header from './_components/Header/Header';
import RefreshPage from '@/components/globals/RefreshPage/RefreshPage';

const ClientLayout = ({ children }) => {
    return (
        <main className='relative w-full overflow-hidden bg-transparent overflow-x-clip'>
            <div className='fixed right-[28%] top-0 hidden h-[150px] w-[200px] rotate-12 rounded-3xl bg-gradient-to-l from-blue-600 to-sky-400 opacity-20 blur-3xl filter dark:block dark:opacity-30 lg:top-44 lg:-right-20 lg:h-72 lg:w-[350px] xl:h-80 xl:w-[500px]'></div>
            <div className='fixed bottom-44 -left-64 hidden h-[150px] w-[900px] -rotate-45 rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-800 opacity-30 blur-3xl filter dark:block lg:bottom-24 lg:-left-20 lg:h-28 lg:w-[250px] lg:-rotate-12 lg:opacity-20 xl:h-40 xl:w-[400px]'></div>
            <div className='fixed left-[28%] top-28 hidden rotate-12 rounded-3xl bg-sky-800 opacity-90 blur-3xl filter dark:opacity-30 lg:h-32 lg:w-[450px] dark:lg:block xl:h-44 xl:w-[600px]'></div>
            <div className='fixed h-16 w-[600px] rotate-[-40deg] rounded-3xl bg-sky-400 opacity-10 blur-2xl filter dark:hidden lg:bottom-24 lg:-left-28 lg:h-12 lg:w-[600px] lg:opacity-30 lg:blur-2xl xl:-left-40 xl:h-4 xl:w-[700px] xl:opacity-100'></div>
            <div className='fixed h-14 w-[600px] rotate-[-40deg] rounded-3xl bg-purple-400 opacity-30 blur-2xl filter dark:hidden lg:bottom-20 lg:-left-28 lg:h-10 lg:w-[600px] lg:opacity-20 lg:blur-xl xl:-left-40 xl:h-2 xl:w-[800px] xl:opacity-100'></div>
            <div className='fixed hidden h-16 w-[600px] rotate-[-40deg] rounded-3xl bg-sky-400 opacity-10 blur-2xl filter dark:hidden lg:top-24 lg:-right-28 lg:block lg:h-12 lg:w-[600px] lg:opacity-30 lg:blur-2xl xl:-right-40 xl:h-4 xl:w-[700px] xl:opacity-100'></div>
            <div className='fixed hidden h-14 w-[600px] rotate-[-40deg] rounded-3xl bg-purple-400 opacity-30 blur-2xl filter dark:hidden lg:top-20 lg:-right-28 lg:block lg:h-10 lg:w-[600px] lg:opacity-20 lg:blur-xl xl:-right-40 xl:h-2 xl:w-[800px] xl:opacity-100'></div>

            <div className='fixed inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]'></div>

            <div className='max-w-[30rem] mx-auto p-3'>
                <div className='flex items-center justify-between pb-3'>
                    <Header />
                    <div className='flex items-center gap-3'>
                        <RefreshPage />
                        <ThemeSwitch />
                    </div>
                </div>
                {children}
            </div>
        </main>
    );
};

export default ClientLayout;
