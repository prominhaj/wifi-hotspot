import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";

const Header = () => {
    return (
        <div className='flex items-center justify-center gap-3'>
            <Link href="/" className="block">
                <Image
                    className='object-cover w-12 h-12'
                    src={logo}
                    width={50}
                    height={50}
                    alt='logo'
                />
            </Link>
            <h2 className='text-xl font-bold'>
                সাকিব <span className='text-red-500'>ইলেক্ট্রনিক</span>
            </h2>
        </div>
    );
};

export default Header;