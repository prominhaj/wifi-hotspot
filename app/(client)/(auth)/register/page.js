export const metadata = {
    title: 'Login - Shakib Electronics',
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
        'Register Page'
    ]
};

import RegisterForm from './_components/RegisterForm';

const RegisterPage = ({ searchParams: { redirectUrl } }) => {
    return (
        <>
            <RegisterForm redirectUrl={redirectUrl} />
        </>
    );
};

export default RegisterPage;
