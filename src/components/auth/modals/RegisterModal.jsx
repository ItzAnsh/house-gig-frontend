import { AccountApi } from "@/api/login";
import React, { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";

const RegisterParser = z.object({
	name: z.string(),
	email: z.string(),
	password: z.string(),
	role: z.enum("user", "gigster"),
});

const isTrue = (value) => {
	if (value == "user") {
		return true;
	}
	return false;
};

export default function RegisterModal({
	open,
	handleClose = () => {},
	openLogin = () => {},
}) {
	const [loader, setLoader] = useState(false);
	const [role, setRole] = useState("user");

	const handleRegister = async (formdata) => {
		if (loader) return;
		setLoader(true);
		const data = {
			name: formdata.get("name"),
			email: formdata.get("email"),
			password: formdata.get("password"),
			role: role,
		};
		const validation = await RegisterParser.safeParseAsync(data);
		if (!validation.success) {
			return toast.error(validation.error);
		}
		AccountApi.register(data)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
				toast.error("Some error occured");
			})
			.finally(() => setLoader(false));
	};

	return (
		open && (
			<Fragment>
				<div className="flex flex-col gap-4 2xl:w-[31.35rem] xl:w-[31.35rem] lg:w-[31.35rem] md:w-[31.35rem] sm:w-[25.35rem] w-full z-[13] fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] p-8 bg-white rounded-md">
					<h4 className="text-xl font-medium ">Sign in to your platform</h4>
					<form action={handleRegister} on className="flex flex-col gap-4">
						<div className="flex flex-col gap-1">
							<label className="text-sm text-primary font-medium">
								Your name
							</label>
							<input
								name="name"
								placeholder="john doe"
								className="text-sm px-3 py-2 outline-none border border-[rgba(84,84,84,0.3)] bg-[rgba(84,84,84,0.05)] rounded-md"
							/>
						</div>
						<div className="flex flex-col gap-1">
							<label className="text-sm text-primary font-medium">
								Your email
							</label>
							<input
								name="email"
								placeholder="xyz@gmail.com"
								className="text-sm px-3 py-2 outline-none border border-[rgba(84,84,84,0.3)] bg-[rgba(84,84,84,0.05)] rounded-md"
							/>
						</div>
						<div className="flex flex-col gap-1">
							<label className="text-sm text-primary font-medium">
								Your password
							</label>
							<input
								name="password"
								placeholder="*********"
								type="password"
								className="text-sm px-3 py-2 outline-none border border-[rgba(84,84,84,0.3)] bg-[rgba(84,84,84,0.05)] rounded-md"
							/>
						</div>

						<div className="flex flex-col gap-1">
							<label className="text-sm text-primary font-medium">
								Your role
							</label>
							<div className="flex gap-x-2">
								<button
									onClick={() => setRole("gigster")}
									className={`w-24 h-10 flex items-center justify-center rounded ${
										!isTrue(role)
											? `bg-black text-white`
											: "bg-none text-primary"
									}`}
									type="button"
								>
									Gigster
								</button>
								<button
									onClick={() => setRole("user")}
									className={`w-24 h-10 flex items-center justify-center rounded ${
										isTrue(role)
											? `bg-black text-white`
											: "bg-none text-primary"
									}`}
									type="button"
								>
									Customer
								</button>
							</div>
						</div>

						{role == "gigster" && (
							<div className="flex flex-col gap-1">
								<label className="text-sm text-primary font-medium">
									Choose a gig
								</label>
								<select
									name="gig"
									className="text-sm px-3 py-2 outline-none border border-[rgba(84,84,84,0.3)] bg-[rgba(84,84,84,0.05)] rounded-md"
								>
									<option value="1">Gig 1</option>
									<option value="2">Gig 2</option>
									<option value="3">Gig 3</option>
									<option value="4">Gig 4</option>
								</select>
							</div>
						)}
						<button className="bg-primary text-white rounded-md px-3 py-2 text-sm">
							Register account
						</button>
					</form>
					<div className="text-sm">
						Already registered?{" "}
						<button onClick={openLogin} className="text-secondary">
							Login account
						</button>
					</div>
				</div>
				<div
					onClick={handleClose}
					className="fixed bg-[rgba(0,0,0,0.3)] z-[12] top-0 left-0 w-full h-full backdrop-blur-sm"
				></div>
			</Fragment>
		)
	);
}
