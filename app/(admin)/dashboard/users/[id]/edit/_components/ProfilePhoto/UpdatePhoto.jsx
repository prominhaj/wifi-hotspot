import ImageUpload from "@/app/(client)/(main)/upload-image/_components/ImageUpload";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const UpdatePhoto = ({ user }) => {
    return (
        <>
            <Dialog className="bg-background">
                <DialogTrigger className="w-full h-full">
                    <Avatar className='w-full h-full transition-colors duration-500 shadow dark:shadow-gray-800 ring-4 ring-green-500'>
                        <AvatarImage
                            className='object-cover'
                            src={user?.profilePhoto?.url}
                            alt='profile-image'
                        />
                        <AvatarFallback>{user?.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                </DialogTrigger>
                <DialogContent className="bg-background">
                    <DialogHeader>
                        <DialogTitle>Edit Profile Photo</DialogTitle>
                    </DialogHeader>
                    <div className="pt-3">
                        <ImageUpload user={user} />
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default UpdatePhoto;