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
        'Login Page'
    ]
};

import LoginForm from './_components/LoginForm';

const LoginPage = ({ searchParams: { redirectUrl } }) => {
    return (
        <div>
            <LoginForm redirectUrl={redirectUrl} />
        </div>
    );
};

export default LoginPage;
