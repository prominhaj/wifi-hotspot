import { ArrowDownUp, BarChartIcon, ChartNoAxesColumnIncreasing, CircleDollarSign, HomeIcon, LayoutDashboard, SettingsIcon, StoreIcon, User } from "lucide-react";
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
        name: "Statistic",
        icon: <ChartNoAxesColumnIncreasing className="w-7 h-7" />,
        path: "/statistic"
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
            <div className='fixed bottom-0 z-50 max-w-[30rem] mx-auto left-0 bg-white dark:bg-black right-0 px-5'>
                <nav className="w-full">
                    <div className="flex justify-around">
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