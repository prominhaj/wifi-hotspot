import Link from "next/link";


const DetailsButton = ({ id }) => {
    return (
        <Link
            className="w-full "
            href={`/dashboard/hotspot-users/${id}`}
        >
            Details
        </Link>
    );
};

export default DetailsButton;