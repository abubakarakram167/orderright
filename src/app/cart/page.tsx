"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { serverUrl } from "utils/api";
import { useCartStore } from "utils/store";

const CartPage = () => {
	const { products, totalItems, totalPrice, removeFromCart } = useCartStore();
	const { data: session } = useSession();
	const router = useRouter();

	useEffect(() => {
		useCartStore.persist.rehydrate();
	}, []);

	const handleCheckout = async () => {
		if (!session) {
			router.push("/");
		} else {
			try {
				const res = await fetch(`${serverUrl}/api/orders`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						price: totalPrice,
						products,
						status: "Not Paid!",
						userEmail: session.user.email,
					}),
				});
				const data = await res.json();
				router.push(`/pay/${data.id}`);
			} catch (err) {
				console.log(err);
			}
		}
	};

	return (
		<div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row">
			{/* PRODUCTS CONTAINER */}
			<div className="h-1/2 p-4 flex flex-col justify-center overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40">
				{/* SINGLE ITEM */}

				{products.map((product) => (
					<div
						key={product.id}
						className="flex items-center justify-between mb-4"
					>
						{product.img && (
							<Image src={product.img} alt="" width={100} height={100} />
						)}

						<div className="">
							<h1 className="uppercase text-xl font-bold">
								{product.title} x{product.quantity}
							</h1>
							<span>{product.optionTitle}</span>
						</div>
						<h2 className="font-bold">${product.price}</h2>
						<span
							className="cursor-pointer"
							onClick={() => removeFromCart(product)}
						>
							X
						</span>
					</div>
				))}
			</div>
			{/* PAYMENT CONTAINER */}
			<div className="h-1/2 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6">
				<div className="flex justify-between">
					<span className="">Subtotal ({totalItems} items)</span>
					<span className="">${totalPrice}</span>
				</div>
				<div className="flex justify-between">
					<span className="">Service Cost</span>
					<span className="">$0.00</span>
				</div>
				<div className="flex justify-between">
					<span className="">Delivery Cost</span>
					<span className="text-green-500">FREE!</span>
				</div>
				<hr className="my-2" />
				<div className="flex justify-between">
					<span className="">TOTAL(INCL. VAT)</span>
					<span className="font-bold">${totalPrice}</span>
				</div>
				<button
					className="bg-red-500 text-white p-3 rounded-md w-1/2 self-end"
					onClick={handleCheckout}
				>
					CHECKOUT
				</button>
			</div>
		</div>
	);
};

export default CartPage;
