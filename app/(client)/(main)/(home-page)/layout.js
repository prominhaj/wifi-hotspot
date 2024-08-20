const DashboardPageLayout = ({ children, activeDashboard, packagelist }) => {
    return (
        <div className='pt-3'>
            {activeDashboard}
            {children}
            {packagelist}
        </div>
    );
};

export default DashboardPageLayout;
