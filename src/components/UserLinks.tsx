"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const UserLinks = () => {
	const { status } = useSession();

	return (
		<>
			{status === "authenticated" ? (
				<div>
					<Link href="/orders">Orders</Link>
					<span onClick={() => signOut()} className="ml-4 cursor-pointer">
						Logout
					</span>
				</div>
			) : (
				<Link href="/login">Login</Link>
			)}
		</>
	);
};

export default UserLinks;
