import { Edit } from "lucide-react";
import Link from "next/link";

const UserEditButton = ({ id }) => {
    return (
        <Link href={`/dashboard/hotspot-users/${id}/edit`} className="flex items-center w-full gap-1.5">
            <Edit className="w-4 h-4" /> Edit
        </Link>
    );
};

export default UserEditButton;