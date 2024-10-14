"use client";
import React, { useCallback, useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { toast } from "sonner";
import { updateProfileImage } from "@/app/actions/imageUpload";
import { useRouter } from "next/navigation";

const ImageUpload = ({ user }) => {
    const [files, setFiles] = useState([]);
    const { push } = useRouter();

    const handleFileUpload = (files) => {
        setFiles(files[0]);
    };

    const handleImageUpload = useCallback(async () => {
        if (!files) {
            toast.error("Please select an image");
            return;
        }

        const formData = new FormData();
        formData.append('file', files);

        try {

            const uploadResult = await updateProfileImage(formData, "file", "images/users", user?.profilePhoto?.public_id, user?.id)
            if (uploadResult?.success) {
                toast.success("Profile photo updated successfully")
                push("/")
            }

        } catch (error) {
            toast.error(error.message)
        }
    }, [files, user, push])

    return (
        <div className="flex items-center justify-center w-full bg-white border border-dashed rounded-lg dark:bg-black border-neutral-200 dark:border-neutral-800">
            <FileUpload
                defaultImage={user?.profilePhoto}
                onUpload={handleImageUpload}
                onChange={handleFileUpload}
            />
        </div>
    );
}

export default ImageUpload;