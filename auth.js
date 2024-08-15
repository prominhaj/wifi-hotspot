import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { dbConnect } from '@/lib/mongo';
import User from '@/modals/user-modal';

export const { auth, signIn, signOut, handlers } = NextAuth({
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials, req) {
                await dbConnect();

                const { phone, password } = credentials;

                const user = await User.findOne({ phone }).lean();

                if (!user) {
                    throw new Error('Phone number not found');
                }

                if (password !== user.password) {
                    throw new Error('Invalid password');
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
    events: {
        error: (message) => {
            console.error('NextAuth error:', message);
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login'
    }
});
