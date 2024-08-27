import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../utils/connect";

// Fetch all products
export const GET = async (req: NextRequest) => {
	try {
		const { searchParams } = new URL(req.url);
		let category = searchParams.get("cat");

		const products = await prisma.product.findMany({
			where: { ...(category ? { catSlug: category } : { isFeatured: true }) },
		});

		return new NextResponse(JSON.stringify(products), { status: 200 });
	} catch (error) {
		return new NextResponse(
			JSON.stringify({ message: "something went wrong" }),
			{ status: 500 }
		);
	}
};

export const POST = () => {
	return new NextResponse("hello", { status: 200 });
};
