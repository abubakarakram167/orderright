"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { serverUrl } from "utils/api";
import { useCartStore } from "utils/store";

const SuccessPage = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const payment_intent = searchParams.get("payment_intent");
	const { makeCartEmpty } = useCartStore();

	useEffect(() => {
		const makeRequest = async () => {
			try {
				await fetch(`${serverUrl}/api/confirm/${payment_intent}`, {
					method: "PUT",
				});
				makeCartEmpty(); // Make cart empty after successfull Order Done!
				setTimeout(() => {
					router.push("/orders");
				}, 3000);
			} catch (err) {
				console.log(err);
			}
		};

		if (payment_intent) makeRequest();
	}, [payment_intent, router]);

	return (
		<>
			<div className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-15rem)] flex items-center justify-center text-center text-2xl text-green-700">
				<p className="max-w-[600px]">
					Payment successful. You are being redirected to the orders page.
					Please do not close the page.
				</p>
				<ConfettiExplosion className="absolute m-auto" />
			</div>
		</>
	);
};

const SuspensedWrapper = () => {
	return (
		<Suspense>
			<SuccessPage />
		</Suspense>
	);
};

export default SuspensedWrapper;
