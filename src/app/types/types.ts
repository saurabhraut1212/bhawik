export interface Product {
	id: number;
	title: string;
	description: string;
	category: string;
	price: number;
}

export interface Category {
	slug: string;
	name: string;
	url: string;
}

export interface RootState {
	category: {
		categories: Category[];
	};
	product: {
		products: Product[];
	};
}
