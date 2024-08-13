import ThemeSwitch from '@/components/globals/ThemeSwitch/ThemeSwitch';
import Image from 'next/image';
import logo from '@/assets/logo.png';

const ClientLayout = ({ children }) => {
    return (
        <main className='max-w-[30rem] mx-auto p-5'>
            <div className='flex items-center justify-between pb-3'>
                <div className='flex items-center justify-center gap-3'>
                    <Image
                        className='object-cover w-12 h-12'
                        src={logo}
                        width={50}
                        height={50}
                        alt='logo'
                    />
                    <h2 className='text-xl font-bold'>
                        সাকিব <span className='text-red-500'>ইলেক্ট্রনিক</span>
                    </h2>
                </div>
                <ThemeSwitch />
            </div>
            {children}
        </main>
    );
};

export default ClientLayout;
