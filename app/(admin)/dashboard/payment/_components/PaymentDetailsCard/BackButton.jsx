"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const BackButton = () => {
    const { back } = useRouter();
    return (
        <Button onClick={back} variant="outline" size="sm">
            Back
        </Button>
    );
};

export default BackButton;