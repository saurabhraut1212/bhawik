import { Product } from '../types/types';

const ProductItem: React.FC<{ product: Product }> = ({ product }) => (
	<div className="flex flex-col p-4 border border-gray-200 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:bg-gray-200 h-60 w-full max-w-xs mx-auto">
		<h3 className="text-xl font-bold mt-2 text-gray-800 text-center truncate">
			{product.title}
		</h3>
		<p className="mt-2 text-gray-600 text-base text-center line-clamp-3">
			{product.description}
		</p>
		<p className="mt-2 text-gray-500 text-sm text-center">
			Category:{' '}
			<span className="font-medium text-gray-700">{product.category}</span>
		</p>
		<p className="mt-2 text-gray-800 text-lg text-center font-bold">
			Price: ${product.price}
		</p>
	</div>
);

export default ProductItem;
