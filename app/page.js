import CreateUser from '@/components/globals/CreateUser/CreateUser';

export const dynamic = 'force-dynamic';

export default function Home() {
    return (
        <main className='flex items-center justify-center h-screen'>
            {/* <PaymentButton /> */}
            <CreateUser />
        </main>
    );
}
