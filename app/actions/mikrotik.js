"use server";
import connectToRouter from '@/lib/mikrotik';

export const createNewUser = async (formData) => {
    try {
        const username = formData.get("username");
        const password = formData.get("password");
        const profile = '7-Days';

        const conn = await connectToRouter();
        const results = await conn.write('/ip/hotspot/user/add', [
            `=name=${username}`,
            `=password=${password}`,
            `=profile=${profile}`,
            `=server=hotspot1`,
            `=email=hellobello@gmail.com`
        ]);

        // Automatically log in the user after creation
        const loginResponse = await conn.write('/ip/hotspot/active/login', [
            `=user=${username}`,
            `=password=${password}`,
        ]);

        conn.close();

        console.log(results,loginResponse);
        

        return { success: true, results,loginResponse };
    } catch (error) {
        throw new Error(error)
    }
}