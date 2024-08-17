const DashboardPageLayout = ({ children, activeDashboard }) => {
    return (
        <div className='pt-3'>
            {activeDashboard}
            {children}
        </div>
    );
};

export default DashboardPageLayout;
