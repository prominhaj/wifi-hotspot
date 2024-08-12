import { getServerSession } from 'next-auth';

export const dynamic = 'force-dynamic';

const HomePage = async () => {
    const session = await getServerSession();

    return <div></div>;
};

export default HomePage;
