import { Product } from '../types/types';
import ProductItem from './ProductItem';

interface ProductGridProps {
	products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{products?.map((product) => (
				<ProductItem key={product.id} product={product} />
			))}
		</div>
	);
};

export default ProductGrid;
