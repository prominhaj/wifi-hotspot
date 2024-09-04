import { Loader2 } from "lucide-react";

const LoadingUI = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="text-center">
                <Loader2 className="w-12 h-12 mx-auto animate-spin text-primary" />
                <h2 className="mt-4 text-xl font-semibold text-foreground">Loading...</h2>
                <p className="mt-2 text-sm text-muted-foreground">Please wait while we fetch your content.</p>
            </div>
        </div>
    );
};

export default LoadingUI;