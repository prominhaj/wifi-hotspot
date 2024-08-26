import Navbar from './_components/Navbar/Navbar';

const MainLayout = async ({ children }) => {
    return (
        <>
            {children}
            <Navbar />
        </>
    );
};

export default MainLayout;
