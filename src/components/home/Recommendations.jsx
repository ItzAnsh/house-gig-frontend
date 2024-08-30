import Image from 'next/image';
import React from 'react';

function Card(){
    return(
        <div className='w-[229px] flex flex-col gap-4 shrink-0'>
            <Image className='w-full h-50 object-cover' width={100} height={100} src={"https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template/w_229,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/home-screen/1685703008534-c8d700.jpeg"} />
            <div>
                <h2 className='font-medium'>Weekly bathroom cleaning</h2>
                <p className='text-sm text-[rgba(84,84,84,1.00)]'>4.77 (134K)</p>
                <p className='text-xs text-[rgba(84,84,84,1.00)]'>₹660</p>
            </div>
        </div>
    )
}

export default function Recommendations() {
    return (
        <div className='flex justify-center px-8 pb-12'>
            <div className='w-full max-w-screen-xl flex flex-col gap-6'>
                <h1 className='text-[2.40rem]'>Most booked services</h1>
                <div className='flex gap-8 overflow-x-scroll remove-scroll'>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                </div>
            </div>
        </div>
    );
}