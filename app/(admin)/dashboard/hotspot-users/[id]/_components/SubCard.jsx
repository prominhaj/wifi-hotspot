
const SubCard = ({ label = "", value }) => {
    return (
        <div className='grid gap-1'>
            <h6 className='text-base font-medium'>{label}</h6>
            <h6 className="text-sm">{value}</h6>
        </div>
    );
};

export default SubCard;