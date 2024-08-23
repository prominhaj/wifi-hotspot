import BDTIcon from "@/components/globals/BDTIcon/BDTIcon";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ConnectBtn from "../../../_components/DashboardPage/ConnectBtn";
import moment from "moment";
import { convertToUTCPlus6 } from "@/lib/convertData";
import Link from "next/link";

const ProfileSection = ({ user, isActive, packageInfo, isActiveHotspotUser, hotspotUser }) => {

    return (
        <>
            <div
                className={cn(isActive ? "h-[17rem]" : "h-48", "relative p-4 text-white bg-gradient-to-b dark:from-[#252e48] dark:bg-[#4276b5] from-[#0FB981] to-[#78D397] rounded-xl")}
            >
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-4">
                        <Link href="/profile">
                            <Avatar className="w-12 h-12">
                                <AvatarImage className="object-cover" src={user?.profilePhoto?.url} alt={user?.name} />
                                <AvatarFallback className="font-medium text-black dark:text-white">
                                    {user?.name.slice(0, 2)}
                                </AvatarFallback>
                            </Avatar>
                        </Link>
                        <div>
                            <div className="font-semibold">{user?.name}</div>
                            <div className="text-sm font-medium">{user?.phone}</div>
                        </div>
                    </div>
                    {
                        isActive && hotspotUser && (
                            <>
                                {
                                    isActiveHotspotUser ? (
                                        <Button
                                            variant="primary"
                                            className="relative h-8 px-3 py-0 text-sm bg-green-900 cursor-default dark:bg-blue-500 pe-5"
                                        >
                                            Connected <span className="absolute text-lg text-green-500 top-0 right-1.5 dark:text-green-400">●</span>
                                        </Button>
                                    ) : (
                                        <ConnectBtn
                                            username={hotspotUser?.user?.name}
                                            password={hotspotUser?.user?.password}
                                        />
                                    )
                                }
                            </>
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
                                        {packageInfo?.paymentId?.amount} TK
                                    </span>
                                </div>
                            </div>
                            <div>
                                <h6 className="text-lg font-medium tracking-wider text-center text-white">
                                    {packageInfo?.packageId?.packageName}
                                </h6>
                                <div className="text-sm font-medium">
                                    Activated at {moment(convertToUTCPlus6(packageInfo?.createdAt)).format('MMM DD YYYY')}
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    );
};

export default ProfileSection;