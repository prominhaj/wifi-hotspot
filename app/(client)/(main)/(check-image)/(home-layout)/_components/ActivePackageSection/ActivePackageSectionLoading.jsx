import PackageCardLoading from "@/components/globals/PackageCard/PackageCardLoading";

const ActivePackageSectionLoading = () => {
    return (
        <div className='mb-[8.5rem]'>
            <div className='absolute left-0 right-0 z-30 bg-background top-20'>
                <div className='px-3'>
                    <PackageCardLoading />
                </div>
            </div>
        </div>
    );
};

export default ActivePackageSectionLoading;