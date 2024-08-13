import Navbar from '../_components/Navbar/Navbar';

const DashboardLayout = ({ children }) => {
    return (
        <>
            {children}
            <Navbar />
        </>
    );
};

export default DashboardLayout;
