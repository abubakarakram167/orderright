"use client";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { OrderType } from "types";
import Image from "next/image";
import { toast } from "react-toastify";
import { useState } from "react";
import { serverUrl } from "utils/api";

const OrdersPage = () => {
	const { data: session, status } = useSession(); //authjs client session data retrieval
	const queryClient = useQueryClient();

	const { isPending, error, data } = useQuery({
		queryKey: ["orders"],
		queryFn: () => fetch(`${serverUrl}/api/orders`).then((res) => res.json()),
	});

	const mutation = useMutation({
		mutationFn: ({ id, status }: { id: string; status: string }) => {
			return fetch(`${serverUrl}/api/orders/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(status),
			});
		},
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ["orders"] });
			toast.success("The order status has been changed");
		},
	});

	const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: string) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const input = form.elements[0] as HTMLInputElement;
		const status = input.value;
		mutation.mutate({ id, status });
	};

	if (isPending) return "Loading...";
	console.log("the data", data);

	return (
		<div className="p-4 lg:px-20 xl:px-40">
			<table className="w-full border-separate border-spacing-3">
				<thead>
					<tr className="text-left">
						<th className="hidden md:block">Order ID</th>
						<th>Date</th>
						<th>Price</th>
						<th className="hidden md:block">Products</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{data.map((order: OrderType) => {
						return (
							<tr
								className={`text-sm md:text-base ${
									order.status !== "delivered" && "bg-red-50"
								}`}
								key={order.id}
							>
								<td className="hidden md:block py-6 px-2">{order.id}</td>
								<td className="py-6 px-2">19.07.2023</td>
								<td className="py-6 px-2">89.90</td>
								<td className="hidden md:block py-6 px-2">
									Big Burger Menu (2), Veggie Pizza (2), Coca Cola 1L (2)
								</td>
								{session?.user.isAdmin ? (
									<td>
										<form
											className="flex justify-center gap-x-4"
											onSubmit={(e) => {
												handleUpdate(e, order.id);
											}}
										>
											<input
												className="p-2 ring-1 ring-red-100 rounded-md"
												defaultValue={order.status}
											/>
											<button className="bg-red-400 p-2 rounded-full">
												<Image src="/edit.png" alt="" width={20} height={20} />
											</button>
										</form>
									</td>
								) : (
									<td className="py-6 px-1">{order.status}</td>
								)}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default OrdersPage;
