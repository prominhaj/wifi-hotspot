import BDTIcon from "@/components/globals/BDTIcon/BDTIcon";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import moment from 'moment-timezone';


const ProfileSection = ({ user, isActive, packageInfo, isActiveHotspotUser }) => {

    return (
        <div
            className={cn(isActive ? "h-72" : "h-48", "relative p-4 text-white bg-gradient-to-b dark:from-purple-700 dark:bg-purple-400 from-[#0FB981] to-[#78D397] rounded-xl")}
        >
            <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                        <AvatarImage src={user?.profilePhoto?.url} alt={user?.name} />
                        <AvatarFallback className="font-medium text-black dark:text-white">
                            {user?.name.slice(0, 2)}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-semibold">{user?.name}</div>
                        <div className="text-sm font-medium">{user?.phone}</div>
                    </div>
                </div>
                {
                    isActiveHotspotUser ? (
                        <Button
                            variant="primary"
                            className="relative bg-purple-500 cursor-default dark:bg-blue-500 pe-5"
                        >
                            Connected <span className="absolute text-lg text-green-500 top-0.5 right-1.5 dark:text-green-400">●</span>
                        </Button>
                    ) : (
                        <Button
                            variant="destructive"
                            className="rounded-2xl"
                        >
                            Connect
                        </Button>
                    )
                }
            </div>
            {
                isActive && (
                    <div className="flex flex-wrap items-center justify-between gap-2 mt-4">
                        <div>
                            <div className="text-base font-medium">
                                Current Pack
                            </div>
                            <div className="flex items-center gap-1 text-3xl font-bold">
                                <BDTIcon width="30px" height="30px" />
                                <span>
                                    {packageInfo?.packageId?.price} TK
                                </span>
                            </div>
                        </div>
                        <div>
                            <h6 className="text-lg font-medium tracking-wider text-white">
                                {packageInfo?.packageId?.packageName}
                            </h6>
                            <div className="text-sm font-medium">ACTIVE TO {moment(packageInfo?.createdAt).tz('Asia/Tokyo').format('DD/MM/YYYY')}</div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default ProfileSection;