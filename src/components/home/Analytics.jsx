import React from 'react';
import { FaRegStar } from "react-icons/fa";
import { IoPeopleOutline } from "react-icons/io5";

export default function Analytics() {
    return (
        <div className='flex justify-center px-8'>
            <div className='w-full flex gap-16 max-w-screen-xl'>
                <div className='py-12'>
                    <div className='flex items-center gap-6'>
                        <FaRegStar size={30}/>
                        <div className='flex flex-col gap-2'>
                            <p className='text-xl font-medium'>4.8</p>
                            <p className='text-sm text-[rgba(84,84,84,1.00)]'>Service Rating</p>
                        </div>
                    </div>
                </div>
                <div className='py-12'>
                    <div className='flex items-center gap-6'>
                        <IoPeopleOutline size={30}/>
                        <div className='flex flex-col gap-2'>
                            <p className='text-xl font-medium'>12M+</p>
                            <p className='text-sm text-[rgba(84,84,84,1.00)]'>Customers Globally</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}