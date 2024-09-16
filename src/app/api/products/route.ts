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

export const POST = async (req: NextRequest) => {
	try {
		const body = await req.json();
		console.log("the product body", body);
		const product = await prisma.product.create({
			data: body,
		});
		return new NextResponse(JSON.stringify(product), { status: 201 });
	} catch (err) {
		console.log(err);
		return new NextResponse(
			JSON.stringify({ message: "Something went wrong!" }),
			{ status: 500 }
		);
	}
};
