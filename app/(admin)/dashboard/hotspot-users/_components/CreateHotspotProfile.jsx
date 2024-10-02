"use client";
import { createProfileInMikrotik } from "@/app/actions/mikrotik";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CreateHotspotProfile = () => {
    const handleCreateProfile = async () => {
        try {
            const result = await createProfileInMikrotik({ name: "20-days", rate_limit: 5 });
            console.log({ result });

        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <form action={handleCreateProfile}>
            <Button>
                Create Hotspot Profile
            </Button>
        </form>
    );
};

export default CreateHotspotProfile;