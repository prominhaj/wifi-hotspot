import Logo from "@/components/globals/Logo/Logo";

const Header = () => {
    return (
        <div className='flex items-center justify-center gap-3'>
            <Logo />
            <h2 className='text-xl font-bold'>
                সাকিব <span className='text-red-500'>ইলেক্ট্রনিক</span>
            </h2>
        </div>
    );
};

export default Header;