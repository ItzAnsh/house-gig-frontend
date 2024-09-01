"use client";

import React, { useEffect, useState } from 'react';
import { IoPersonCircle } from "react-icons/io5";
import LoginModal from '../auth/modals/LoginModal';
import RegisterModal from '../auth/modals/RegisterModal';
import { useDispatch, useSelector } from 'react-redux';
import { reset_auth } from '@/store/slices/login';
import Image from 'next/image';
import Link from 'next/link';
import _ from "lodash";
import { GigApi } from '@/api/gig';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FaStar } from "react-icons/fa";

export default function Navbar() {
    const controller = new AbortController();

    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector(state => state.login);
    const router = useRouter();

    const [search, setSearch] = useState("");
    const [open, setOpen] = useState({
        login: false,
        register: false
    });
    const [dropdown, setDropdown] = useState(false);
    const [loader, setLoader] = useState(true);
    const [results, setResults] = useState([]);

    const handleAccount = () => {
        if (isLoggedIn) {
            setDropdown((prev) => !prev);
        } else {
            setOpen({ login: true, register: false });
        }
    }

    const fetchSearchResults = () => {
        if (_.isEmpty(search)) {
            setLoader(false);
            return;
        }
        GigApi.search({
            searchText: search
        }, controller.signal).then((res) => {
            setResults(res.data);
        }).catch((err) => {
            if (_.get(err, "code") !== "ERR_CANCELED") {
                toast.error("Server error occured");
            }
        }).finally(() => setLoader(false));
    }

    useEffect(() => {
        setResults([]);
        setLoader(true);
        const timeout = setTimeout(() => {
            fetchSearchResults();
        }, 500);

        return () => {
            controller.abort();
            clearTimeout(timeout);
        }
    }, [search]);

    return (
        <div className="py-4 px-8 flex justify-center border-b border-b-[rgba(84,84,84,0.3)]">
            <div className="w-full flex justify-between items-center max-w-screen-xl">
                <Link href={"/"} className="">
                    <Image
                        className="object-cover w-32"
                        width={100}
                        height={100}
                        src={
                            "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_144,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/home-screen/1687285683825-e6cf23.jpeg"
                        }
                        alt={"This is an image"}
                    />
                </Link>
                <div className="relative">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search here..."
                        className="w-[400px] text-sm outline-none border border-[rgba(84,84,84,0.3)] px-4 py-2 rounded-lg"
                    />
                    {!_.isEmpty(search) && (
                        <div className="bg-white py-4 absolute top-[100%] w-[350px] rounded-lg drop-shadow-lg min-h-[200px] max-h-[400px] h-[max-content] overflow-y-auto">
                            {!_.isEmpty(results) &&
                                !loader &&
                                results.map((item) => {
                                    return (
                                        <div
                                            onClick={() => {
                                                setSearch("");
                                                router.push(`/${item.gig.id}`);
                                            }}
                                            key={item.gig.id}
                                            className="hover:bg-[rgba(0,0,0,0.2)] px-4 py-1 cursor-pointer"
                                        >
                                            <p className="text-sm font-semibold">{item.gig.name}</p>
                                            <p className="text-xs">{item.gig.description}</p>
                                            <div className="text-xs flex items-center gap-1"><FaStar className='text-secondary' />{item.gig.rating}</div>
                                        </div>
                                    );
                                })}
                            {loader && (
                                <div className="flex items-center justify-center px-4">
                                    <p className="text-center text-sm">Loading...</p>
                                </div>
                            )}
                            {!loader && _.isEmpty(results) && (
                                <div className="flex items-center justify-center px-4">
                                    <p className="text-center text-sm">No Data Found</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div>
                    <div className="relative">
                        <IoPersonCircle
                            onClick={handleAccount}
                            className="cursor-pointer"
                            size={24}
                        />
                        {dropdown && isLoggedIn && (
                            <div className="absolute right-0 px-4 py-1 drop-shadow-lg rounded-lg bg-[rgba(255,255,255)]">
                                <button
                                    onClick={() => {
                                        dispatch(reset_auth());
                                        setDropdown(false);
                                    }}
                                    className="text-xs"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                    <LoginModal
                        open={open.login}
                        openRegister={() => setOpen({ login: false, register: true })}
                        handleClose={() => setOpen({ login: false, register: false })}
                    />
                    <RegisterModal
                        open={open.register}
                        openLogin={() => setOpen({ login: true, register: false })}
                        handleClose={() => setOpen({ login: false, register: false })}
                    />
                </div>
            </div>
        </div>
    );
}