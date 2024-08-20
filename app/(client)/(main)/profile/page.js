import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera } from 'lucide-react';
import ChangeProfilePhoto from './_components/ChangeProfilePhoto';
import { getSessionUser } from '@/lib/dal';
import Logout from '@/components/globals/Logout/Logout';
import ProfileName from './_components/ProfileName';
import ChangePassword from './_components/ChangePassword/ChangePassword';

const ProfilePage = async () => {
    const sessionUser = await getSessionUser();

    return (
        <section className='py-3'>
            <div className='p-5 transition-all duration-500 ease-in-out border rounded-md'>
                <div className='mb-5 text-center profile-pic'>
                    <ChangeProfilePhoto user={sessionUser} />
                    <div>
                        <div className='relative mx-auto cursor-pointer group size-28'>
                            <div className='absolute top-0 bottom-0 left-0 right-0 hidden transition-colors duration-500 ease-in-out bg-gray-300 bg-opacity-50 rounded-full dark:bg-opacity-50 dark:bg-gray-500 group-hover:block group-hover:z-10'>
                                <div className='flex items-center justify-center w-full h-full'>
                                    <Camera className='w-6 h-6' />
                                </div>
                            </div>
                            <Avatar className='w-full h-full transition-colors duration-500 shadow dark:shadow-gray-800 ring-4 ring-slate-50 dark:ring-slate-800'>
                                <AvatarImage
                                    src={sessionUser?.profilePicture?.url}
                                    alt='profile-image'
                                />
                                <AvatarFallback>{sessionUser?.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <label
                                className='absolute inset-0 z-30 cursor-pointer'
                                htmlFor='pro-img'
                            />
                        </div>
                        <div className='mt-4'>
                            <ProfileName sessionUser={sessionUser} />
                            <h6 className='text-sm text-muted-foreground'>{sessionUser?.phone}</h6>
                        </div>
                    </div>
                </div>
                <div className='pt-3 border-t border-gray-100 dark:border-gray-700'>
                    <Logout />
                </div>
            </div>
            {/* Tabs */}
            <div className='pt-5'>
                <ChangePassword userId={sessionUser?.id} />
            </div>
        </section>
    );
};

export default ProfilePage;
