import Logo from "@/components/globals/Logo/Logo";
import { SidebarRoutes } from "./sidebar-routes";

const Sidebar = () => {
  return (
    <div className="flex flex-col h-full overflow-y-auto border-r shadow-sm bg-background/80">
      <div className="p-6 flex flex-col gap-1.5 items-center justify-center">
        <Logo />
        <h2 className='text-xl font-bold'>
          সাকিব <span className='text-red-500'>ইলেক্ট্রনিক</span>
        </h2>
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
