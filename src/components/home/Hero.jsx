import Image from 'next/image';
import React from 'react';

function Card({ image, body }) {
    return (
        <div className='flex flex-col items-center gap-2'>
            <div className='bg-[rgba(245,245,245,1.00)] flex justify-center rounded-lg py-2 px-4 w-full'>
                <Image className='w-12 h-14 object-cover' width={200} height={150} alt='Thisis' src={image} />
            </div>
            <p className='text-xs text-primary'>{body}</p>
        </div>
    )
}

export default function Hero() {
    return (
        <div className='max-h-[605px] h-[100vh] pt-12 flex justify-center px-8'>
            <div className='flex justify-between gap-12 w-full max-w-screen-xl'>
                <div className='w-[40%] flex flex-col gap-8'>
                    <h1 className='text-4xl'>Home services at your doorstep</h1>
                    <div className='border py-6 px-6 rounded-lg flex flex-col gap-6'>
                        <h6 className='text-xl font-semibold text-[rgba(84,84,84,1.00)]'>What are you looking for?</h6>
                        <div className='grid grid-cols-3 gap-4'>
                            <Card image={"https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg"} body={"Women & Salon spa"} />
                            <Card image={"https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg"} body={"Women & Salon spa"} />
                            <Card image={"https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg"} body={"Women & Salon spa"} />
                            <Card image={"https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg"} body={"Women & Salon spa"} />
                            <Card image={"https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg"} body={"Women & Salon spa"} />
                            <Card image={"https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg"} body={"Women & Salon spa"} />
                            <Card image={"https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg"} body={"Women & Salon spa"} />
                            <Card image={"https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg"} body={"Women & Salon spa"} />
                            <Card image={"https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg"} body={"Women & Salon spa"} />
                        </div>
                    </div>
                </div>
                <div className='w-[48%] flex justify-end rounded-lg overflow-hidden'>
                    <Image className='w-auto h-full object-cover rounded-lg' width={100} height={100} src={"https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template,q_auto:low,f_auto/dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/home-screen/1696852847761-574450.jpeg"}/>
                </div>
            </div>
        </div>
    );
}