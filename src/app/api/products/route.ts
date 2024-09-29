import { NextResponse } from 'next/server';

const fetchCategories = async () => {
	const apiUrl = 'https://dummyjson.com/products/categories';
	const response = await fetch(apiUrl);
	if (!response.ok) {
		throw new Error('Failed to fetch categories');
	}
	return response.json();
};

const fetchProducts = async (
	category: string,
	limit: string,
	skip: string,
	searchQuery: string
) => {
	let apiUrl;

	if (searchQuery) {
		apiUrl = `https://dummyjson.com/products/search?q=${searchQuery}&limit=${limit}&skip=${skip}`;
	} else if (category) {
		apiUrl = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
	} else {
		apiUrl = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
	}

	const response = await fetch(apiUrl);
	if (!response.ok) {
		throw new Error('Failed to fetch products');
	}
	return response.json();
};
export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const type = searchParams.get('type');
	const category = searchParams.get('category') || '';
	const limit = searchParams.get('limit') || '10';
	const skip = searchParams.get('skip') || '0';
	const searchQuery = searchParams.get('search') || '';

	if (type === 'categories') {
		const categories = await fetchCategories();
		return NextResponse.json(categories);
	} else {
		const products = await fetchProducts(category, limit, skip, searchQuery);
		return NextResponse.json(products);
	}
}
