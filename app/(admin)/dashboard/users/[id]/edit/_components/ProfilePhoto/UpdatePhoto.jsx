"use client";

import ImageUpload from "@/app/(client)/(main)/upload-image/_components/ImageUpload";
import { updateProfileImage } from "@/app/actions/imageUpload";
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ImageDown, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

const UpdatePhoto = ({ user }) => {
    const [image, setImage] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
        setIsOpen(true);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('file', image);

        try {
            const uploadResult = await updateProfileImage(formData, "file", "Images/users", user?.profilePicture?.public_id, user?.id)
            if (uploadResult.success) {
                toast.success("Profile photo updated successfully")
                setIsOpen(false)
            }
        } catch (error) {
            toast.error(error.message)
        }
    };

    return (
        <>
            <button className="w-full h-full" onClick={() => setIsOpen(true)}>
                <Avatar className='w-full h-full transition-colors duration-500 shadow dark:shadow-gray-800 ring-4 ring-green-500'>
                    <AvatarImage
                        className='object-cover'
                        src={user?.profilePhoto?.url}
                        alt='profile-image'
                    />
                    <AvatarFallback>{user?.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
            </button>

            <Dialog className="bg-background" open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger />
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