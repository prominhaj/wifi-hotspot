import { Button } from "@/components/ui/button";
import Link from "next/link";


const DetailsButton = ({ id }) => {
    return (
        <div>
            <Link href={`/dashboard/hotspot-users/${id}`}>
                <Button variant="outline" size="sm">
                    Details
                </Button>
            </Link>
        </div>
    );
};

export default DetailsButton;