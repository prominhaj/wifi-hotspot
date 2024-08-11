import Image from 'next/image';
import logo from '@/assets/logo.png';

const AuthLayout = ({ children }) => {
    return (
        <div className='py-5'>
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
            <div className='mt-5'>{children}</div>
        </div>
    );
};

export default AuthLayout;
