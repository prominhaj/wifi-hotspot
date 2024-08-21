import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TotalCard = ({ title, count, icon }) => {
    return (
        <>
            <Card className="bg-background/20">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-base font-semibold tracking-widest">
                        {title}
                    </CardTitle>
                    {icon}
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{count}</div>
                </CardContent>
            </Card>
        </>
    );
};

export default TotalCard;