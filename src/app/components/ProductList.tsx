'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, clearProducts } from '../redux/productSlice';
import ProductGrid from './ProductGrid';
import { RootState } from '../redux/rootReducer';

const ProductList: React.FC<{
	selectedCategory: string;
	searchQuery: string;
	limit: number;
	skip: number;
	handleLoadMore: () => void;
	loadingMore: boolean;
}> = ({
	selectedCategory,
	searchQuery,
	limit,
	skip,
	handleLoadMore,
	loadingMore,
}) => {
	const dispatch = useDispatch();
	const products = useSelector((state: RootState) => state.product.products);

	const fetchProducts = async () => {
		const query = new URLSearchParams({
			category: selectedCategory || '',
			limit: limit.toString(),
			skip: skip.toString(),
			search: searchQuery,
		});

		try {
			const response = await fetch(`/api/products?${query.toString()}`);
			if (!response.ok) throw new Error('Failed to fetch products');
			const data = await response.json();
			if (skip === 0) {
				dispatch(clearProducts());
			}
			dispatch(setProducts(data.products));
		} catch (error) {
			console.error('Error fetching products:', error);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, [selectedCategory, searchQuery, limit, skip, dispatch]);

	return (
		<div>
			{products?.length === 0 ? (
				<p>No products found.</p>
			) : (
				<ProductGrid products={products} />
			)}
			{(selectedCategory || searchQuery) && (
				<div className="flex justify-center mt-4">
					<button
						onClick={handleLoadMore}
						disabled={
							loadingMore || products.length === 0 || products.length < 10
						}
						className={`px-4 py-2 bg-blue-600 text-white rounded-md ${
							loadingMore || products.length === 0 || products.length < 10
								? 'opacity-50 cursor-not-allowed bg-blue-400'
								: 'hover:bg-blue-700 transition-colors duration-300'
						}`}
					>
						{loadingMore ? 'Loading...' : 'Load More'}
					</button>
				</div>
			)}
		</div>
	);
};

export default ProductList;
