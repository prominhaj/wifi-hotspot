import Spinner from "./Spinner";

const Loading = () => {
    return (
        <div className="h-[75vh] w-full flex items-center justify-center">
            <div className='flex items-center justify-center gap-1'>
                <Spinner size={true} /> Loading...
            </div>
        </div>
    );
};

export default Loading;