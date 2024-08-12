import LoginForm from './_components/LoginForm';

const LoginPage = ({ searchParams: { redirectUrl } }) => {
    return (
        <div>
            <LoginForm redirectUrl={redirectUrl} />
        </div>
    );
};

export default LoginPage;
