import { ArrowDownUp, CircleDollarSign, LayoutDashboard, User } from "lucide-react";
import NavLink from "./NavLink";

// Header Mode Items
const headerModeItems = [
    {
        name: "Dashboard",
        icon: <LayoutDashboard className="w-7 h-7" />,
        path: "/dashboard"
    },
    {
        name: "Packages",
        icon: <ArrowDownUp className="w-7 h-7" />,
        path: "/packages"
    },
    {
        name: "Payment History",
        icon: <CircleDollarSign className="w-7 h-7" />,
        path: "/payment-history"
    },
    {
        name: "Profile",
        icon: <User className="w-7 h-7" />,
        path: "/user"
    },
]

const Navbar = () => {

    return (
        <div className="mt-16">
            <div className='fixed bottom-0 z-50 max-w-[30rem] mx-auto left-0 bg-white dark:bg-black border-t right-0 px-5 py-3'>
                <div className='flex items-center justify-between w-full gap-3 sm:gap-0'>
                    {
                        headerModeItems.map((item, index) => <NavLink key={index} item={item} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;