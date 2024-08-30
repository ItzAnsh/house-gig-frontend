"use client";

import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react';

function WorkCard({ }) {
    return (
        <div className='flex gap-12'>
            <div>
                <p className='text-[rgb(7,121,76)] text-xs'>Rs 379 per bathroom</p>
                <h2 className='font-bold'>Classic cleaning - 2 bathroom pack</h2>
                <p className='text-xs font-normal text-[rgba(84,84,84,1.00)]'>4.83 (1.2M reviews)</p>
                <div className='flex items-center gap-1 text-xs'>
                    <span className='font-semibold'>₹600</span>
                    <span className='w-1 h-1 rounded-full bg-[rgba(84,84,84,1.00)]'></span>
                    <span className='text-[rgba(84,84,84,1.00)]'>2 hrs</span>
                </div>
                <div className='border border-dashed my-3 h-[1px]'></div>
                <div className='text-xs text-[rgba(84,84,84,1.00)] flex flex-col gap-2'>
                    <div>1. kbkdksdnjsdbk susd vusd sdv dys sdkbiw eiwei weiiwe iwe i we we ewi</div>
                    <div>2. kbkdksdnjsdbk susd vusd sdv dys sdkbiw eiwei weiiwe iwe i we we ewi</div>
                </div>
                <button className='text-secondary text-sm mt-4'>View Details</button>
            </div>
            <div className='flex flex-col items-center'>
                <Image className='w-48 object-cover -mb-4' width={100} height={100} src={"https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template,q_auto:low,f_auto/w_128,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/home-screen/1675326542678-cb4e17.jpeg"} />
                <button className='w-[max-content] border border-secondary text-secondary px-5 bg-white text-sm py-1.5 rounded-lg'>Book</button>
            </div>
        </div>
    )
}

function Card({ image, body }) {
    return (
        <div className='flex flex-col items-center gap-2'>
            <Image className='w-16 object-cover rounded-lg' width={200} height={150} alt='Thisis' src={image} />
            <p className='text-xs font-normal text-primary text-center'>{body}</p>
        </div>
    )
}

function Seperator() {
    return (
        <div className='border'></div>
    )
}

export default function Page() {
    const params = useParams();

    const fetchPackages = async () => {
        
    }

    return (
        <div className='flex justify-center px-8 py-12'>
            <div className='w-full flex gap-8 justify-between max-w-screen-xl'>
                <div className='w-[28%]'>
                    <h1 className='text-3xl font-bold'>Bathroom Cleaning</h1>
                    <p>4.83 (2.2 M bookings)</p>
                    <div className='mt-6 h-[max-content] border px-4 py-6 rounded-lg flex flex-col gap-4 sticky top-10'>
                        <div className='flex gap-4 items-center'>
                            <p className='text-sm font-medium text-[rgba(84,84,84,1.00)]'>Select a service</p>
                            <div className='border flex-1 h-0'></div>
                        </div>
                        <div className='grid grid-cols-3 gap-4'>
                            <Card image={"https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template,q_auto:low,f_auto/w_64,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1670408542539-09e49b.jpeg"} body={"Women & Salon spa"} />
                            <Card image={"https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template,q_auto:low,f_auto/w_64,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1670408542539-09e49b.jpeg"} body={"Women & Salon spa"} />
                            <Card image={"https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template,q_auto:low,f_auto/w_64,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1670408542539-09e49b.jpeg"} body={"Women & Salon spa"} />
                            <Card image={"https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template,q_auto:low,f_auto/w_64,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1670408542539-09e49b.jpeg"} body={"Women & Salon spa"} />
                        </div>
                    </div>
                </div>
                <div className='flex-1 flex gap-8'>
                    <div className='border px-8 py-10 w-[60%] shrink-0 flex flex-col gap-8'>
                        <WorkCard />
                        <Seperator />
                        <WorkCard />
                        <Seperator />
                        <WorkCard />
                        <Seperator />
                        <WorkCard />
                    </div>
                    <div className='h-[max-content] border px-6 py-8 rounded-lg flex gap-4 justify-between sticky top-10'>
                        <div>
                            <h1 className='text-xl font-semibold text-primary'>UC Promise</h1>
                            <div className='flex flex-col gap-2 mt-3 text-sm'>
                                <p>Verified Professionals</p>
                                <p>Hassle Free Booking</p>
                                <p>Transparent Pricing</p>
                            </div>
                        </div>
                        <div>
                            <Image className='object-cover' width={60} height={60} src={"https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_64,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1702985608819-4a9ba6.jpeg"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}