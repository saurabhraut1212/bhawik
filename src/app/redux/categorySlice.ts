import { Category } from '../types/types';

const initialState = {
	categories: [] as Category[],
};

const categoryReducer = (
	state = initialState,
	action: { type: string; payload: Category[] }
) => {
	switch (action.type) {
		case 'SET_CATEGORIES':
			return { ...state, categories: action.payload };
		default:
			return state;
	}
};

export const setCategories = (categories: Category[]) => ({
	type: 'SET_CATEGORIES',
	payload: categories,
});

export default categoryReducer;
