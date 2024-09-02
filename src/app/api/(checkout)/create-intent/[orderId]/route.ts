import { NextRequest, NextResponse } from "next/server";
import prisma from "utils/connect";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const POST = async (
	req: NextRequest,
	{ params }: { params: { orderId: string } }
) => {
	const { orderId } = params;

	const order = await prisma.order.findUnique({
		where: {
			id: orderId,
		},
	});

	if (order) {
		// Create a PaymentIntent with the order amount and currency
		const paymentIntent = await stripe.paymentIntents.create({
			amount: 100 * 100,
			currency: "usd",
			// In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
			automatic_payment_methods: {
				enabled: true,
			},
		});

		await prisma.order.update({
			where: {
				id: orderId,
			},
			data: {
				intent_id: paymentIntent.id,
			},
		});

		console.log("the payment intent id:", paymentIntent);

		return new NextResponse(
			JSON.stringify({
				clientSecret: paymentIntent.client_secret,
				// [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.
				dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
			}),
			{
				status: 200,
			}
		);
	} else {
		return new NextResponse(JSON.stringify({ message: "Order not found!" }), {
			status: 404,
		});
	}
};
