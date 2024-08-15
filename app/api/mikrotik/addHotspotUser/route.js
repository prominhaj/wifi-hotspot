import connectToRouter from '@/lib/mikrotik';
import { getPackageById } from '@/queries/package';
import { getUserById } from '@/queries/user';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
    const { packageId, userId } = await req.json();
    const user = await getUserById(userId);
    const getPackage = await getPackageById(packageId);

    try {
        const conn = await connectToRouter();
        const results = await conn.write('/ip/hotspot/user/add', [
            `=name=${user?.phone}`,
            `=password=${user?.phone}`,
            `=profile=${getPackage?.profileType}`,
            `=server=${getPackage?.server || 'hotspot1'}`,
            `=comment=up-`
        ]);

        conn.close();

        const loginUrl = `${process.env.MIKROTIK_LOGIN_DNS_IP}/login?username=${user?.phone}&password=${user?.phone}`;

        if (results[0].ret) {
            return NextResponse.redirect(loginUrl);
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
};
