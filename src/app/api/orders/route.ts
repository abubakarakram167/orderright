import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../utils/connect";
import { auth } from "@/auth";

// Fetch all Orders
export const GET = async (req: NextRequest) => {
	const session = await auth();
	console.log("in server::", session);
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

export const POST = () => {
	return new NextResponse("hello", { status: 200 });
};
