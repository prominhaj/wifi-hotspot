import ProfileSection from "./ProfileSection";
import ActivePackageSection from "./ActivePackageSection";
import { getSessionUser } from "@/lib/dal";


const ActiveDashboard = async () => {
    const user = await getSessionUser();
    const activeHotspotUserResponse = await fetch(`${process.env.BASE_URL}/api/mikrotik/hotspot/getActiveUserByUsername?phone=${user?.phone}`, {
        cache: "no-cache",
        next: {
            revalidate: 3,

        }
    });
    const activeHotspotUser = await activeHotspotUserResponse.json();

    console.log(activeHotspotUser);


    return (
        <div className="relative">
            <ProfileSection user={user} isActive={activeHotspotUser?.success} />
            <ActivePackageSection isActive={activeHotspotUser?.success} activeHotspotUser={activeHotspotUser} />
        </div>
    );
};

export default ActiveDashboard;