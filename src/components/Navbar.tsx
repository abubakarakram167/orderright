import React from "react";
import Menu from "./Menu";
import Link from "next/link";
import CartIcon from "./CartIcon";
import Image from "next/image";
import UserLinks from "./UserLinks";

const Navbar = async () => {
	return (
		<div className="h-12 text-red-500 p-4 flex items-center justify-between border-b-2 border-b-red-500 uppercase md:h-24 lg:px-20 xl:px-40">
			{/* LEFT LINKS */}
			<div className="hidden md:flex gap-4 flex-1">
				<Link href="/">Homepage</Link>
				<Link href="/menu">Menu</Link>
				<Link href="mailto:orderright@support.com">Contact</Link>
			</div>
			{/* LOGO */}
			<div className="text-xl md:font-bold flex-1 md:text-center">
				<Link href="/">Order Right</Link>
			</div>
			{/* MOBILE MENU */}
			<div className="md:hidden">
				<Menu />
			</div>
			{/* RIGHT LINKS */}
			<div className="hidden md:flex gap-4 items-center justify-end flex-1">
				<div className="md:absolute top-3 r-2 lg:static flex items-center gap-2 cursor-pointer bg-orange-300 px-1 rounded-md">
					<Image src="/phone.png" alt="" width={20} height={20} />
					<Link href="tel:+15555551234">555 555 1234</Link>
				</div>
				<UserLinks />
				<CartIcon />
			</div>
		</div>
	);
};

export default Navbar;
