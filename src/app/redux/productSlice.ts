import { Product } from '../types/types';

const initialState = {
	products: [] as Product[],
};

const productReducer = (
	state = initialState,
	action: { type: string; payload: Product[] }
) => {
	switch (action.type) {
		case 'SET_PRODUCTS':
			return { ...state, products: action.payload };
		case 'CLEAR_PRODUCTS':
			return { ...state, products: [] };
		default:
			return state;
	}
};

export const setProducts = (products: Product[]) => ({
	type: 'SET_PRODUCTS',
	payload: products,
});

export const clearProducts = () => ({
	type: 'CLEAR_PRODUCTS',
});

export default productReducer;
