import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../utils/connect";
import { auth } from "@/auth";

// Fetch all Orders
export const GET = async (req: NextRequest) => {
	const session = await auth();

	if (session) {
		if (session.user.isAdmin) {
			const orders = await prisma.order.findMany();
			return new NextResponse(JSON.stringify(orders), { status: 200 });
		} else {
			const orders = await prisma.order.findMany({
				where: { userEmail: session.user.email! },
			});
			return new NextResponse(JSON.stringify(orders), { status: 200 });
		}
	} else {
		return new NextResponse(
			JSON.stringify({ message: "Unauthorized Server access" }),
			{ status: 401 }
		);
	}
};

// CREATE ORDER
export const POST = async (req: NextRequest) => {
	const session = await auth();

	if (session) {
		try {
			const body = await req.json();
			const order = await prisma.order.create({
				data: body,
			});
			return new NextResponse(JSON.stringify(order), { status: 201 });
		} catch (err) {
			console.log(err);
			return new NextResponse(
				JSON.stringify({ message: "Something went wrong!" }),
				{ status: 500 }
			);
		}
	} else {
		return new NextResponse(
			JSON.stringify({ message: "You are not authenticated!" }),
			{ status: 401 }
		);
	}
};
