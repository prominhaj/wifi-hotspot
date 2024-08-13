import { ArrowDownUp, CircleDollarSign, LayoutDashboard, User } from "lucide-react";
import NavLink from "./NavLink";

// Header Mode Items
const headerModeItems = [
    {
        name: "Dashboard",
        icon: <LayoutDashboard />,
        path: "/dashboard"
    },
    {
        name: "Packages",
        icon: <ArrowDownUp />,
        path: "/packages"
    },
    {
        name: "Payment History",
        icon: <CircleDollarSign />,
        path: "/payment-history"
    },
    {
        name: "Profile",
        icon: <User />,
        path: "/user"
    },
]

const Navbar = () => {


    return (
        <div className='fixed bottom-0 z-50 max-w-[30rem] mx-auto left-0 right-0 px-3 py-2 sm:px-5 bg-gray-300 text-black dark:bg-gray-800 dark:text-white'>
            <div className='flex items-center justify-between w-full gap-3 sm:gap-0'>
                {
                    headerModeItems.map((item, index) => <NavLink key={index} item={item} />)
                }
            </div>
        </div>
    );
};

export default Navbar;