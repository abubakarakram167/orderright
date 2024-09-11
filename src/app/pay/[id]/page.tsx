"use client";
import React, { useEffect, useState } from "react";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Page = ({ params }: { params: { id: string } }) => {
	const [clientSecret, setClientSecret] = useState("");
	const { id } = params;

	useEffect(() => {
		const makeRequest = async () => {
			try {
				const res = await fetch(
					`http://localhost:3000/api/create-intent/${id}`,
					{
						method: "POST",
					}
				);

				const data = await res.json();
				console.log("the data :", data);
				setClientSecret(data.clientSecret);
			} catch (error) {
				console.log("the error :", error);
			}
		};
		if (id) makeRequest();
	}, [id]);

	const options: StripeElementsOptions = {
		clientSecret,
		appearance: {
			theme: "stripe",
		},
	};

	return (
		<div>
			{clientSecret && (
				<Elements options={options} stripe={stripePromise}>
					<CheckoutForm />
				</Elements>
			)}
		</div>
	);
};

export default Page;
