import PackageCardLoading from "@/components/globals/PackageCard/PackageCardLoading";


const PackageListLoading = () => {
    return (
        <div className='grid items-center grid-cols-1 gap-5'>
            <PackageCardLoading />
            <PackageCardLoading />
            <PackageCardLoading />
            <PackageCardLoading />
        </div>
    );
};

export default PackageListLoading;