import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getSessionUser } from '@/lib/dal';
import Logout from '@/components/globals/Logout/Logout';
import ProfileName from './_components/ProfileName';
import ChangePassword from './_components/ChangePassword/ChangePassword';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export const generateMetadata = async ({ params }) => {
    const sessionUser = await getSessionUser();

    return {
        title: `${sessionUser?.name} - Wifi Hotspot`,
        openGraph: {
            images: [sessionUser?.profilePhoto?.url]
        },
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
            'Profile Page'
        ]
    };
};

const ProfilePage = async () => {
    const sessionUser = await getSessionUser();

    return (
        <>
            <section className='py-3'>
                <div className='p-5 transition-all duration-500 ease-in-out border rounded-md'>
                    <div className='mb-5 text-center'>
                        <div>
                            <div className='mx-auto cursor-pointer group size-28'>
                                <Avatar className='w-full h-full transition-colors duration-500 shadow dark:shadow-gray-800 ring-4 ring-green-500'>
                                    <AvatarImage
                                        className='object-cover'
                                        src={sessionUser?.profilePhoto?.url}
                                        alt='profile-image'
                                    />
                                    <AvatarFallback>{sessionUser?.name.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className='mt-4'>
                                <ProfileName sessionUser={sessionUser} />
                                <h6 className='text-sm text-muted-foreground'>
                                    {sessionUser?.phone}
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center gap-2.5 pt-3 border-t border-gray-100 dark:border-gray-700'>
                        {sessionUser?.role === 'admin' && (
                            <Link
                                className={cn(buttonVariants({ variant: 'primary' }), 'w-full')}
                                href='/dashboard'
                            >
                                Dashboard
                            </Link>
                        )}
                        <Logout />
                    </div>
                </div>
                {/* Tabs */}
                <div className='pt-5'>
                    <ChangePassword userId={sessionUser?.id} />
                </div>
            </section>
        </>
    );
};

export default ProfilePage;
