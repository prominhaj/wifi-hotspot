import BDTIcon from "@/components/globals/BDTIcon/BDTIcon";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const ProfileSection = ({ user }) => {
    return (
        <div className="relative h-72 p-4 text-white bg-gradient-to-b from-[#0FB981] to-[#78D397] rounded-xl">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                        <AvatarImage src={user?.profilePhoto?.url} alt={user?.name} />
                        <AvatarFallback className="font-medium text-black dark:text-white">{user?.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-semibold">{user?.name}</div>
                        <div className="text-sm font-medium">{user?.phone}</div>
                    </div>
                </div>
                <Button variant="primary" className="">
                    <PlusIcon className="w-4 h-4" /> Top up
                </Button>
            </div>
            <div className="mt-4">
                <div className="text-base font-medium">
                    Current Pack
                </div>
                <div className="flex items-center gap-1 text-3xl font-bold">
                    <BDTIcon width="30px" height="30px" />
                    <span>
                        75 TK
                    </span>
                </div>
                <div className="text-sm font-medium">ACTIVE TO 27/09/23</div>
            </div>
        </div>
    );
};

export default ProfileSection;