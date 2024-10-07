
import { Card, CardHeader } from "@/components/ui/card";
import UpdatePhoto from "./ProfilePhoto/UpdatePhoto";
import DeletePhoto from "./ProfilePhoto/DeletePhoto";

const UserProfileCard = ({ user }) => {
    console.log(user);

    return (
        <Card>
            <CardHeader>
                <div className="relative flex items-center justify-center mx-auto size-28">
                    <UpdatePhoto user={user} />
                    <div className="absolute top-0 -right-8">
                        <DeletePhoto user={user} />
                    </div>
                </div>
            </CardHeader>
        </Card>
    );
};

export default UserProfileCard;