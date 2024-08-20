import { BadgeDollarSign, ChartNoAxesColumnIncreasing, House, User } from "lucide-react";
import NavLink from "./NavLink";

// Header Mode Items
const headerModeItems = [
    {
        name: "Home",
        icon: <House className="w-7 h-7" />,
        path: "/"
    },
    {
        name: "Payments",
        icon: <BadgeDollarSign className="w-7 h-7" />,
        path: "/payment/history"
    },
    {
        name: "Statistic",
        icon: <ChartNoAxesColumnIncreasing className="w-7 h-7" />,
        path: "/statistic"
    },
    {
        name: "Profile",
        icon: <User className="w-7 h-7" />,
        path: "/profile"
    },
]

const Navbar = () => {

    return (
        <div className="mt-16">
            <div className='fixed bottom-0 z-50 max-w-[30rem] mx-auto left-0 bg-white dark:bg-black right-0 px-5'>
                <nav className="w-full">
                    <div className="flex items-center gap-3">
                        {
                            headerModeItems.map((item, index) => <NavLink key={index} item={item} />)
                        }
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;