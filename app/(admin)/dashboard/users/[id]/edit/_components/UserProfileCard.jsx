import { Card, CardContent, CardHeader } from "@/components/ui/card";
import DeletePhoto from "./ProfilePhoto/DeletePhoto";
import UserEditForm from "./UserEditForm/UserEditForm";
import UpdatePhoto from "@/components/globals/UploadPhoto/UpdatePhoto";

const UserProfileCard = ({ user }) => {
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
            <CardContent>
                <UserEditForm user={user} />
            </CardContent>
        </Card>
    );
};

export default UserProfileCard;