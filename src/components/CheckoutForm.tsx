import React, { useState } from "react";
import {
	PaymentElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import AddressForm from "./AddressForm";

export default function CheckoutForm() {
	const stripe = useStripe();
	const elements = useElements();

	const [message, setMessage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js hasn't yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}

		setIsLoading(true);

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				// Make sure to change this to your payment completion page
				return_url: "http://localhost:3000/success",
			},
		});

		// This point will only be reached if there is an immediate error when
		// confirming the payment. Otherwise, your customer will be redirected to
		// your `return_url`. For some payment methods like iDEAL, your customer will
		// be redirected to an intermediate site first to authorize the payment, then
		// redirected to the `return_url`.
		if (error.type === "card_error" || error.type === "validation_error") {
			setMessage(error.message || "Something Went wrong!");
		} else {
			setMessage("An unexpected error occurred.");
		}

		setIsLoading(false);
	};

	return (
		<>
			<form
				id="payment-form"
				onSubmit={handleSubmit}
				className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-15rem)] p-4 lg:px-20 xl:px-40 flex flex-col gap-8"
			>
				<PaymentElement
					id="payment-element"
					options={{
						layout: "tabs",
					}}
				/>
				<AddressForm />
				<div className="flex flex-row justify-center sm:justify-start">
					<button
						disabled={isLoading || !stripe || !elements}
						className="bg-red-500 text-white p-1 rounded-md w-28"
						id="submit"
					>
						<span id="button-text">
							{isLoading ? (
								<div className="spinner" id="spinner"></div>
							) : (
								"Pay now"
							)}
						</span>
					</button>
				</div>

				{/* Show any error or success messages */}
				{message && <div id="payment-message">{message}</div>}
			</form>
		</>
	);
}
