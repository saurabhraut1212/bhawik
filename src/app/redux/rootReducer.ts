import { combineReducers } from 'redux';
import categoryReducer from './categorySlice';
import productReducer from './productSlice';

const rootReducer = combineReducers({
	category: categoryReducer,
	product: productReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
