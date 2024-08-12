import { getServerSession } from 'next-auth';

export const dynamic = 'force-dynamic';

const HomePage = async () => {
    return <div></div>;
};

export default HomePage;
