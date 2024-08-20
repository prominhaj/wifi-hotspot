"use client";
import { toast } from "sonner";
import { useState } from "react";
import FormControl from "@/components/globals/FormControl/FormControl";
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import { changeUserPassword } from "@/app/actions/user";

const ChangePassword = ({ userId }) => {
    const [error, setError] = useState(null);

    const handleChangePassword = async (formData) => {
        setError(null);
        try {
            const result = await changeUserPassword(formData, userId);
            if (result?.errors) {
                setError(result.errors)
            }
            else if (!result?.success && result?.oldPassword) {
                setError({ oldPassword: [result?.message] })
                toast.error(result.message);
            }
            else if (!result?.success) {
                toast.error(result.message);
            }
            else if (result.success) {
                toast.success(result.message);
            }
        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <div className="p-5 transition-all duration-500 ease-in-out border rounded-md">
            <h5 className='mb-4 text-lg font-semibold'>Change Password</h5>
            <form action={handleChangePassword}>
                <div className='grid grid-cols-1 gap-5'>
                    <FormControl
                        label="Old password"
                        type="password"
                        required={true}
                        placeholder="Old password"
                        name="oldPassword"
                        error={error?.oldPassword}
                    >
                        {/* Old Password Error */}
                        {
                            error?.oldPassword && (
                                error?.oldPassword?.map((e, i) => (
                                    <p key={i} className="text-red-500">
                                        <small>
                                            {e}
                                        </small>
                                    </p>
                                ))
                            )
                        }
                    </FormControl>
                    <div>
                        <FormControl label="New password" type="password" required={true} placeholder="New password" name="newPassword" error={error?.password} />
                        {/* Password Error */}
                        {
                            error?.password && (
                                error?.password?.map((e, i) => (
                                    <p key={i} className="text-red-500">
                                        <small>
                                            {e}
                                        </small>
                                    </p>
                                ))
                            )
                        }
                    </div>
                    <div>
                        <FormControl label="Re-type New password" type="password" required={true} placeholder="Re-type New password" name="confirmPassword" error={error?.confirmPassword} />
                        {/* Password Error */}
                        {
                            error?.confirmPassword && (
                                error?.confirmPassword?.map((e, i) => (
                                    <p key={i} className="text-red-500">
                                        <small>
                                            {e}
                                        </small>
                                    </p>
                                ))
                            )
                        }
                    </div>
                </div>
                {/*end grid*/}
                <SubmitButton className='mt-5' type='submit'>
                    Save password
                </SubmitButton>
            </form>
        </div>
    );
};

export default ChangePassword;