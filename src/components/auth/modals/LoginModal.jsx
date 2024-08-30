import React, { Fragment, useState } from 'react';
import { AccountApi } from '@/api/login';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { update_auth } from '@/store/slices/login';

const LoginParser = z.object({
    email: z.string(),
    password: z.string()
});

export default function LoginModal({ open, handleClose = () => { }, openRegister = () => { } }) {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);

    const handleLogin = async (formdata) => {
        if (loader) return;
        setLoader(true);
        const data = {
            email: formdata.get("email"),
            password: formdata.get("password")
        }
        const validation = await LoginParser.safeParseAsync(data);
        if (!validation.success) {
            return toast.error(validation.error);
        }
        AccountApi.login(data).then((res) => {
            dispatch(update_auth({
                name: res.data.name,
                email: res.data.email,
                role: res.data.role,
                token: res.data.token,
            }));
            toast.success("User Authenticated");
            handleClose();
        }).catch((err) => {
            toast.error("Some error occured");
        }).finally(() => setLoader(false));
    }

    return open && (
        <Fragment>
            <div className='flex flex-col gap-4 w-[500px] z-[13] fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] p-8 bg-white rounded-md'>
                <h4 className='text-xl font-medium '>Sign in to your platform</h4>
                <form action={handleLogin} className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm text-primary font-medium'>Your email</label>
                        <input name='email' placeholder='xyz@gmail.com' className='text-sm px-3 py-2 outline-none border border-[rgba(84,84,84,0.3)] bg-[rgba(84,84,84,0.05)] rounded-md' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm text-primary font-medium'>Your password</label>
                        <input name='password' placeholder='*********' type='password' className='text-sm px-3 py-2 outline-none border border-[rgba(84,84,84,0.3)] bg-[rgba(84,84,84,0.05)] rounded-md' />
                    </div>
                    <button className='bg-primary text-white rounded-md px-3 py-2 text-sm'>Login to your account</button>
                </form>
                <div className='text-sm'>Not registered? <button onClick={openRegister} className='text-secondary'>Create account</button></div>
            </div>
            <div onClick={handleClose} className='fixed bg-[rgba(0,0,0,0.3)] z-[12] top-0 left-0 w-full h-full backdrop-blur-sm'></div>
        </Fragment>
    )
}