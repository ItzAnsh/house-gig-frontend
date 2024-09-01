"use client";

import { GigApi } from "@/api/gig";
import { PackagesApi } from "@/api/packages";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { socket } from "@/socket/socket";
import { set } from "zod";

function WorkCard({ data, joinRoom }) {
	console.log(data);
	return (
		<div className="flex gap-12">
			<div className="w-5/6">
				{/* <p className="text-[rgb(7,121,76)] text-xs">Rs 379 per bathroom</p> */}
				<h2 className="font-bold">{data?.name}</h2>
				<p className="text-xs font-normal text-[rgba(84,84,84,1.00)]">
					4.83 (1.2M reviews)
				</p>
				<div className="flex items-center gap-1 text-xs">
					<span className="font-semibold">
						{data?.currency}
						{data?.price}
					</span>
					<span className="w-1 h-1 rounded-full bg-[rgba(84,84,84,1.00)]"></span>
					<span className="text-[rgba(84,84,84,1.00)]">2 hrs</span>
				</div>
				<div className="border border-dashed my-3 h-[1px]"></div>
				<div
					className="text-xs text-[rgba(84,84,84,1.00)]"
					dangerouslySetInnerHTML={{ __html: data?.description }}
				></div>
				{/* <div className='text-xs text-[rgba(84,84,84,1.00)] flex flex-col gap-2'>
                    <div>1. kbkdksdnjsdbk susd vusd sdv dys sdkbiw eiwei weiiwe iwe i we we ewi</div>
                    <div>2. kbkdksdnjsdbk susd vusd sdv dys sdkbiw eiwei weiiwe iwe i we we ewi</div>
                </div> */}
				{/* <button className='text-secondary text-sm mt-4'>View Details</button> */}
			</div>
			<div className="flex flex-col items-center">
				<Image
					className="w-48 object-cover -mb-4"
					width={100}
					height={100}
					src={
						"https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template,q_auto:low,f_auto/w_128,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/home-screen/1675326542678-cb4e17.jpeg"
					}
					alt={"This is an image"}
				/>
				<button
					className="w-[max-content] border border-secondary text-secondary px-5 bg-white text-sm py-1.5 rounded-lg"
					onClick={() => {
						// console.log(data?.id);
						joinRoom(data?.id);
					}}
				>
					Book
				</button>
			</div>
		</div>
	);
}

function Card({ image, body }) {
	return (
		<div className="flex flex-col items-center gap-2">
			<Image
				className="w-16 object-cover rounded-lg"
				width={200}
				height={150}
				alt="Thisis"
				src={image}
			/>
			<p className="text-xs font-normal text-primary text-center">{body}</p>
		</div>
	);
}

function Seperator() {
	return <div className="border"></div>;
}

export default function Page() {
	const params = useParams();
	const [packages, setPackages] = useState([]);
	const [details, setDetails] = useState({});
	const [loader, setLoader] = useState(true);
	const [room, setRoom] = useState(null);
	const [timePopup, setTimePopup] = useState(false);
	const [slotsAvailable, setSlotsAvailable] = useState([]);

	const [isConnected, setIsConnected] = useState(false);
	const [transport, setTransport] = useState("N/A");

	useEffect(() => {
		if (socket.connected) {
			onConnect();
		}

		function onConnect() {
			setIsConnected(true);
			setTransport(socket.io.engine.transport.name);

			socket.io.engine.on("upgrade", (transport) => {
				setTransport(transport.name);
			});
		}

		function onDisconnect() {
			setIsConnected(false);
			setTransport("N/A");
		}

		socket.on("connect", onConnect);
		socket.on("disconnect", onDisconnect);
		socket.on("roomJoined", (data, status, gigsterId) => {
			console.log(data, status, gigsterId);
			if (status === 200) {
				console.log("Room Joined");
				console.log(data);
				setRoom(gigsterId);
				setSlotsAvailable(data.roomId ? data.slots : []);
			}
		});

		return () => {
			socket.off("connect", onConnect);
			socket.off("disconnect", onDisconnect);
		};
	}, []);

	const fetchGigDetails = async () => {
		try {
			const response = await GigApi.details(params.slug);
			setDetails(response.data);
		} catch (err) {
			console.error(err);
		}
	};

	const fetchPackages = async () => {
		setLoader(true);
		try {
			const response = await PackagesApi.packageFromGigId({
				id: params.slug,
			});
			setPackages(response.data);
		} catch (err) {
			console.error(err);
		} finally {
			setLoader(false);
		}
	};

	const joinRoom = (id) => {
		socket.emit("joinRoom", { gigsterId: id });
	};

	useEffect(() => {
		fetchGigDetails();
		fetchPackages();
	}, []);

	useEffect(() => {
        if (room) {
					setTimePopup(true);
				}
	}, [room]);

	return (
		<>
			{timePopup && (
				<div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
					<div className="bg-white p-8 rounded-lg">
						<h1 className="text-2xl font-semibold">Select a time slot</h1>
						<div className="grid grid-cols-3 gap-4 mt-4">
							{slotsAvailable.map((slot) => (
								<button className="border border-secondary text-secondary px-4 py-2 rounded-lg">
									{new Date(slot.start).toLocaleTimeString()} -{" "}
									{new Date(slot.end).toLocaleTimeString()}
								</button>
							))}
						</div>
					</div>
				</div>
			)}
			<div className="flex justify-center px-8 py-12">
				<div className="w-full flex gap-8 justify-between max-w-screen-xl">
					<div className="w-[28%]">
						<h1 className="text-3xl font-bold mb-1">
							{details?.name ?? "N/A"}
						</h1>
						<div className="flex items-center">
							<FaStar className="text-secondary -mt-0.5 mr-1" />
							{details.rating} (2.2M bookings)
						</div>
						<div className="mt-6 h-[max-content] border px-4 py-6 rounded-lg flex flex-col gap-4 sticky top-10">
							<div className="flex gap-4 items-center">
								<p className="text-sm font-medium text-[rgba(84,84,84,1.00)]">
									Select a service
								</p>
								<div className="border flex-1 h-0"></div>
							</div>
							<div className="grid grid-cols-3 gap-4">
								<Card
									image={
										"https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template,q_auto:low,f_auto/w_64,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1670408542539-09e49b.jpeg"
									}
									body={"Women & Salon spa"}
								/>
								<Card
									image={
										"https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template,q_auto:low,f_auto/w_64,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1670408542539-09e49b.jpeg"
									}
									body={"Women & Salon spa"}
								/>
								<Card
									image={
										"https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template,q_auto:low,f_auto/w_64,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1670408542539-09e49b.jpeg"
									}
									body={"Women & Salon spa"}
								/>
								<Card
									image={
										"https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template,q_auto:low,f_auto/w_64,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1670408542539-09e49b.jpeg"
									}
									body={"Women & Salon spa"}
								/>
							</div>
						</div>
					</div>
					<div className="flex-1 flex gap-8">
						<div className="border px-8 py-10 w-[60%] shrink-0 flex flex-col gap-8">
							{!loader &&
								packages.length !== 0 &&
								packages.map((item, index) => {
									return (
										<>
											<WorkCard data={item} joinRoom={joinRoom} />
											{index != packages.length - 1 && <Seperator />}
										</>
									);
								})}
							{!loader && packages.length === 0 && (
								<div className="text-center">No Packages Found</div>
							)}
							{loader && <div className="text-center">Loading...</div>}
						</div>
						<div className="h-[max-content] border px-6 py-8 rounded-lg flex gap-4 justify-between sticky top-10">
							<div>
								<h1 className="text-xl font-semibold text-primary">
									UC Promise
								</h1>
								<div className="flex flex-col gap-2 mt-3 text-sm">
									<p>Verified Professionals</p>
									<p>Hassle Free Booking</p>
									<p>Transparent Pricing</p>
								</div>
							</div>
							<div>
								<Image
									className="object-cover"
									width={60}
									height={60}
									src={
										"https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_64,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1702985608819-4a9ba6.jpeg"
									}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
