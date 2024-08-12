import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { dbConnect } from '@/lib/mongo';
import User from '@/modals/user-modal';

const options = NextAuth({
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60
    },
    providers: [
        CredentialsProvider({
            name: 'Phone Login',
            credentials: {
                phone: { label: 'Phone', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                await dbConnect();

                const { phone, password } = credentials;

                const user = await User.findOne({ phone }).lean();

                if (!user) {
                    throw new Error('Phone Not Found');
                }

                const isPasswordMatched = await bcrypt.compare(password, user.password);

                if (!isPasswordMatched) {
                    throw new Error('Password does not match');
                }

                return {
                    id: user._id,
                    name: user.name,
                    phone: user.phone
                };
            }
        })
    ],
    callbacks: {
        async signIn({ user }) {
            return !!user;
        },
        async session({ session, token }) {
            session.user = {
                id: token.sub,
                name: token.name,
                phone: token.phone
            };

            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.phone = user.phone;
            }
            return token;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login'
    }
});

export { options as GET, options as POST };
