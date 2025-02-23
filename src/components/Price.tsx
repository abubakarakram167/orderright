"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Product } from "types";
import { useCartStore } from "utils/store";

const Price = ({ product }: { product: Product }) => {
	const [total, setTotal] = useState(product?.price);
	const [quantity, setQuantity] = useState(1);
	const [selected, setSelected] = useState(0);

	const { addToCart } = useCartStore();

	useEffect(() => {
		if (product?.options && product.options.length) {
			setTotal(
				quantity * product.price + product.options[selected].additionalPrice
			);
		}
	}, [quantity, selected, product]);

	useEffect(() => {
		useCartStore.persist.rehydrate();
	}, []);

	const handleAddCart = () => {
		addToCart({
			id: product.id.toString(),
			title: product.title,
			img: product.img,
			price: total,
			optionTitle:
				product?.options && product.options.length
					? product.options[0].title
					: "",
			quantity,
		});
		toast.success("The product has been added successfully!");
	};

	return (
		<div className="flex flex-col gap-4">
			<h2 className="text-2xl font-bold">${total ? total : product?.price}</h2>
			{/* OPTIONS CONTAINER */}
			<div className="flex gap-4">
				{product?.options?.length &&
					product?.options?.map((option, index) => (
						<button
							key={option.title}
							className="min-w-[6rem] p-2 ring-1 ring-red-400 rounded-md"
							style={{
								background: selected === index ? "rgb(248 113 113)" : "white",
								color: selected === index ? "white" : "red",
							}}
							onClick={() => setSelected(index)}
						>
							{option.title}
						</button>
					))}
			</div>
			{/* QUANTITY AND ADD BUTTON CONTAINER */}
			<div className="flex justify-between items-center">
				{/* QUANTITY */}
				<div className="flex justify-between w-full p-3 ring-1 ring-red-500">
					<span>Quantity</span>
					<div className="flex gap-4 items-center">
						<button
							onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
						>
							{"<"}
						</button>
						<span>{quantity}</span>
						<button
							onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}
						>
							{">"}
						</button>
					</div>
				</div>
				{/* CART BUTTON */}
				<button
					className="uppercase w-56 bg-red-500 text-white p-3 ring-1 ring-red-500"
					onClick={handleAddCart}
				>
					Add to Cart
				</button>
			</div>
		</div>
	);
};

export default Price;
