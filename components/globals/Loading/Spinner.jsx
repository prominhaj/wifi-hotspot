import "./Spinner.css";
import { cn } from "@/lib/utils";

const Spinner = ({ size, layout }) => {
    return (
        <>
            <span className={cn(size ? "rt-r-size-3" : "rt-r-size-2", layout && "rt-r-size-4", "rt-Spinner")}>
                <span className="rt-SpinnerLeaf"></span>
                <span className="rt-SpinnerLeaf"></span>
                <span className="rt-SpinnerLeaf"></span>
                <span className="rt-SpinnerLeaf"></span>
                <span className="rt-SpinnerLeaf"></span>
                <span className="rt-SpinnerLeaf"></span>
                <span className="rt-SpinnerLeaf"></span>
                <span className="rt-SpinnerLeaf"></span>
            </span>
        </>
    );
};

export default Spinner;