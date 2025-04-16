import { getHotspotUserByUserId } from "@/queries/hotspotUser";
import { getSessionUser } from "./dal";
import {
  getHotspotActiveUserByPhone,
  getHotspotUserByPhone,
} from "./hotspot/dataFetching/hotspot";

export const userDashboardInfo = async () => {
  try {
    const user = await getSessionUser();

    // Fetch all the required data in parallel
    const [currentPlanRaw, hotspotUser, activeHotspotUser] = await Promise.all([
      getHotspotUserByUserId(user?.id),
      getHotspotUserByPhone(user?.phone),
      getHotspotActiveUserByPhone(user?.phone),
    ]);

    const currentPlan = JSON.parse(currentPlanRaw);
    const currentStatus = currentPlan?.status === "active";

    return {
      user,
      isActive: currentStatus,
      hotspotUser: currentStatus ? hotspotUser : null,
      activeHotspotUser: currentStatus ? activeHotspotUser : null,
      packageInfo: currentPlan,
    };
  } catch (error) {
    throw new Error(error);
  }
};
