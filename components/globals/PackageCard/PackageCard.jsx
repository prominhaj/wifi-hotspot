
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Wifi } from "lucide-react";
import takaIcon from "@/assets/taka-icon.png";
import Image from "next/image";
import BuyButton from "./BuyButton";

const PackageCard = () => {
    const amount = 1;

    return (
        <Card className="w-full">
            <CardHeader className="p-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Wifi />
                        <CardTitle>Day Package</CardTitle>
                    </div>
                    <CardTitle className="text-xl">1 Day</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="px-5">
                <h2 className="text-xl font-bold">1 Mbps Speed</h2>
                <div className="pt-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="px-1 py-0.5 text-sm text-red-600 bg-red-200 rounded">90%</span>
                        <p className="flex items-center text-base font-medium line-through opacity-60 gap-0.5">
                            <Image src={takaIcon} width={11} height={11} alt="taka icon" /> 10 TK
                        </p>
                    </div>
                    <h4 className="text-lg font-semibold flex items-center gap-0.5">
                        <Image src={takaIcon} width={13} height={13} alt="taka icon" /> 1 TK
                    </h4>
                </div>
            </CardContent>
            <CardFooter className="p-5 pt-0">
                <BuyButton amount={amount} />
            </CardFooter>
        </Card>
    )
}

export default PackageCard;