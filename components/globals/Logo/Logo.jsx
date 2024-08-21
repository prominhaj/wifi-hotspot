import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";

const Logo = () => {
    return (
        <Link href="/" className="block">
            <Image
                className='object-cover w-12 h-12'
                src={logo}
                width={50}
                height={50}
                alt='logo'
            />
        </Link>
    );
};

export default Logo;