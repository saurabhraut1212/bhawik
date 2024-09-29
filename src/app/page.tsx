'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories } from './redux/categorySlice';
import ProductList from './components/ProductList';
import CategorySelector from './components/CategorySelector';
import { RootState } from './redux/rootReducer';

const Page: React.FC = () => {
	const dispatch = useDispatch();
	const { categories } = useSelector((state: RootState) => state.category);
	const [selectedCategory, setSelectedCategory] = useState<string>('beauty');
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [searchInput, setSearchInput] = useState<string>('');
	const [limit, setLimit] = useState<number>(10);
	const [skip, setSkip] = useState<number>(0);
	const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
	const [loadingMore, setLoadingMore] = useState<boolean>(false);
	const [loadingProducts, setLoadingProducts] = useState<boolean>(false);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await fetch('/api/products?type=categories');
				if (!response.ok) throw new Error('Failed to fetch categories');
				const data = await response.json();
				dispatch(setCategories(data));
			} catch (error) {
				console.error(error);
			}
		};
		fetchCategories();
	}, [dispatch]);

	const handleSearch = async () => {
		setLoadingSearch(true);
		setLoadingProducts(true);
		setSearchQuery(searchInput);
		setSkip(0);

		setTimeout(() => {
			setLoadingSearch(false);
			setLoadingProducts(false);
		}, 1000);
	};

	const handleReset = () => {
		setSearchInput('');
		setSearchQuery('');
		setSkip(0);
		setLoadingProducts(false);
	};

	const handleLoadMore = async () => {
		setLoadingMore(true);
		setSkip((prevSkip) => prevSkip + limit);

		setTimeout(() => {
			setLoadingMore(false);
		}, 1000);
	};

	return (
		<div className="w-full mx-auto p-6 bg-gray-100 min-h-screen">
			<h1 className="text-5xl mb-4 font-bold text-gray-800 flex justify-center">
				Product Categories
			</h1>
			<CategorySelector onCategoryChange={setSelectedCategory} />
			<div className="mt-4 flex items-center">
				<input
					type="text"
					placeholder="Search products..."
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
					className="p-2 w-full border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600"
				/>
				<button
					onClick={handleSearch}
					disabled={!searchInput || loadingSearch}
					className={`ml-2 px-4 py-2 bg-blue-600 text-white rounded-md ${
						!searchInput || loadingSearch
							? 'opacity-50 cursor-not-allowed bg-blue-400'
							: 'hover:bg-blue-700 transition-colors duration-300'
					}`}
				>
					{loadingSearch ? 'Searching...' : 'Search'}
				</button>
				<button
					onClick={handleReset}
					className={
						'ml-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-300'
					}
				>
					Reset
				</button>
			</div>
			<h2 className="text-5xl mt-4 mb-4 flex justify-center font-semibold text-gray-800">
				Products
			</h2>

			{loadingProducts ? (
				<div className="text-center text-xl text-blue-500">
					Loading products...
				</div>
			) : (
				<ProductList
					selectedCategory={selectedCategory}
					searchQuery={searchQuery}
					limit={limit}
					skip={skip}
					handleLoadMore={() => handleLoadMore}
					loadingMore={loadingMore}
				/>
			)}
		</div>
	);
};

export default Page;
