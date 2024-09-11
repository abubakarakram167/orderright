"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useCartStore } from "utils/store";
import { useSession } from "next-auth/react";

const CartIcon = () => {
	const { totalItems } = useCartStore();
	const { data: session, status } = useSession();

	console.log("the data::", status);

	useEffect(() => {
		useCartStore.persist.rehydrate();
	}, []);

	if (session?.user.isAdmin && status === "authenticated") {
		return (
			<Link href="/add" className="flex items-center gap-2">
				<span>Add Product</span>
			</Link>
		);
	} else {
		return (
			<Link href="/cart" className="flex items-center gap-4">
				<div className="relative w-8 h-8 md:w-5 md:h-5">
					<Image src="/cart.png" alt="" fill />
				</div>

				<span>Cart ({totalItems})</span>
			</Link>
		);
	}
};

export default CartIcon;
