declare type Menu = {
	id: number;
	slug: string;
	title: string;
	desc?: string;
	img?: string;
	color: string;
}[];

declare type Product = {
	id: number;
	title: string;
	desc?: string;
	img?: string;
	price: number;
	options?: { title: string; additionalPrice: number }[];
};

export type OrderType = {
	id: string;
	userEmail: string;
	price: number;
	products: CartItemType[];
	status: string;
	createdAt: Date;
	intent_id?: String;
};

declare type CartItemType = {
	id: string;
	title: string;
	img?: string;
	price: number;
	optionTitle?: string;
	quantity: number;
};

declare type Props = {
	params: { category: String };
};

declare type Products = Product[];
