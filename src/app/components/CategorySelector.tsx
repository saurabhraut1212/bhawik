'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCategories } from '../redux/categorySlice';
import { Category } from '../types/types';

const CategorySelector: React.FC<{
	onCategoryChange: (category: string) => void;
}> = ({ onCategoryChange }) => {
	const [categories, setCategoriesState] = useState<Category[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<string>('');
	const dispatch = useDispatch();

	const fetchCategories = async () => {
		try {
			const response = await fetch('/api/products?type=categories');
			if (!response.ok) throw new Error('Failed to fetch categories');
			const data: Category[] = await response.json();

			setCategoriesState(data);
			dispatch(setCategories(data));

			setSelectedCategory('');
			onCategoryChange('');
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	return (
		<select
			onChange={(e) => {
				setSelectedCategory(e.target.value);
				onCategoryChange(e.target.value);
			}}
			value={selectedCategory}
			className="w-full p-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600"
		>
			<option value="">All categories</option>
			{categories.map((category) => (
				<option key={category.slug} value={category.slug}>
					{category.name}
				</option>
			))}
		</select>
	);
};

export default CategorySelector;
