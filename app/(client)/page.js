import CreateUser from '@/components/globals/CreateUser/CreateUser';

export const dynamic = 'force-dynamic';

export default function Home() {
    return (
        <div>
            {/* <PaymentButton /> */}
            <CreateUser />
        </div>
    );
}
