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

declare type Props = {
	params: { category: String };
};

declare type Products = Product[];
