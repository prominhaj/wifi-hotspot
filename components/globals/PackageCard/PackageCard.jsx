import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Wifi } from "lucide-react";
import BuyButton from "./BuyButton";
import { getSessionUser } from "@/lib/dal";
import BDTIcon from "../BDTIcon/BDTIcon";
import { calculateDiscountedPrice } from "@/lib/convertData";
import { cookies } from "next/headers";
import { textDecrypt } from "@/lib/hash";

const PackageCard = async ({ wifiPackage }) => {
    const user = await getSessionUser();
    const device = cookies().get("device")?.value;
    const deviceDecrypt = textDecrypt(device);
    const price = deviceDecrypt === "mobile" ? wifiPackage?.price : wifiPackage?.desktopPrice;
    const finalPrice = calculateDiscountedPrice(price, wifiPackage?.discountPercentage);

    return (
        <Card className="w-full bg-background">
            <CardHeader className="p-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Wifi />
                        <CardTitle>
                            {wifiPackage?.packageName}
                        </CardTitle>
                    </div>
                    <CardTitle className="text-xl">
                        {wifiPackage?.validity} Day{wifiPackage?.validity !== 1 && "s"}
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="px-5">
                <h2 className="text-xl font-bold">
                    {wifiPackage?.speedLimit} Speed
                </h2>
                <div className="pt-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="px-1 py-0.5 text-sm text-red-600 bg-red-200 rounded">
                            -{parseInt(wifiPackage?.discountPercentage)}%</span>
                        <p className="flex items-center text-base font-medium line-through opacity-60 gap-0.5">
                            <BDTIcon /> {price} TK
                        </p>
                    </div>
                    <h4 className="text-lg font-medium flex items-center gap-0.5">
                        BDT
                        <span className="text-3xl font-semibold text-pink-600 dark:text-pink-500">
                            {finalPrice}
                        </span>
                        TK
                    </h4>
                </div>
            </CardContent>
            <CardFooter className="p-5 pt-0">
                <BuyButton user={user} amount={finalPrice} packageId={wifiPackage?.id} />
            </CardFooter>
        </Card>
    )
}

export default PackageCard;