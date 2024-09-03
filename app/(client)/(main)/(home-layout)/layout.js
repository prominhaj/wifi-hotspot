export const metadata = {
    title: 'Wifi - Shakib Electronics',
    description: 'Explore || Service || Build || Share || Wifi',
    applicationName: 'Wifi - Shakib Electronics',
    keywords: [
        'Next.js',
        'React',
        'JavaScript',
        'Wifi - Shakib Electronics',
        'Wifi Hotspot',
        'Hotspot',
        'Shakib Electronics',
        'Wifi',
        'Mikrotik',
        'Home Page'
    ]
};

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
