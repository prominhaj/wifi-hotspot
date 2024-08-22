import { MobileSidebar } from "./mobile-sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RefreshPage from "@/components/globals/RefreshPage/RefreshPage";
import ThemeSwitch from "@/components/globals/ThemeSwitch/ThemeSwitch";
import { getSessionUser } from "@/lib/dal";
import Logout from "@/components/globals/Logout/Logout";

export const Navbar = async () => {
  const user = await getSessionUser();

  return (
    <div className="flex items-center h-full p-4 border-b shadow-sm bg-background/80">
      <MobileSidebar />
      <div className="flex items-center justify-end w-full gap-5">
        <RefreshPage />
        <ThemeSwitch />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer">
              <Avatar>
                <AvatarImage
                  className="object-cover"
                  src={user?.profilePhoto?.url}
                  alt={user?.name}
                />
                <AvatarFallback>{user?.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-4">
            <DropdownMenuItem className="cursor-pointer">
              <button className="flex items-center gap-1.5 flex-wrap">
                <span>
                  {user?.name}
                </span>
                <span>
                  ({user?.role})
                </span>
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem className="w-full cursor-pointer">
              <Logout size="sm" className="text-sm rounded-lg" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
