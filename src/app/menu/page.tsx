import Link from "next/link";
import React from "react";
import { Menu } from "types";
import { serverUrl } from "utils/api";

console.log("the server url", serverUrl);

const getData = async () => {
	let res = await fetch(`${serverUrl}/api/categories`, {
		cache: "no-store",
	});

	console.log("the response", res);

	if (!res.ok) {
		throw new Error("Failed!");
	}

	return res.json();
};

const MenuPage = async () => {
	const menu: Menu = await getData();

	return (
		<div className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col md:flex-row items-center">
			{menu.map((category) => (
				<Link
					href={`/menu/${category.slug}`}
					key={category.id}
					className="w-full h-1/3 bg-cover p-8 md:h-1/2"
					style={{ backgroundImage: `url(${category.img})` }}
				>
					<div className={`text-${category.color} w-1/2`}>
						<h1 className="uppercase font-bold text-3xl">{category.title}</h1>
						<p className="text-sm my-8">{category.desc}</p>
						<button
							className={`hidden 2xl:block text-lg bg-white text-${
								category.color === "black" ? "black" : "red-500"
							} py-2 px-4 rounded-md`}
						>
							Explore
						</button>
					</div>
				</Link>
			))}
		</div>
	);
};

export default MenuPage;
