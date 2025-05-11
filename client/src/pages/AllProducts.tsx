import ProductCard from "@components/ecommerce/ProductCard";
import SkeletonCard from "@components/feedback/SkeletonCard";
import { IProduct } from "@customTypes/ProductsTypes";
import { useAppSelector } from "@store/hooks";
import { useEffect, useState } from "react";

const AllProducts = () => {
	const { products, loading } = useAppSelector((state) => state.products);
	const { searchQuery } = useAppSelector((state) => state.search);
	const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

	useEffect(() => {
		if (searchQuery.length > 0) {
			setFilteredProducts(
				products.filter((product) =>
					product.name.toLowerCase().includes(searchQuery.toLowerCase())
				)
			);
		} else {
			setFilteredProducts(products);
		}
	}, [products, searchQuery]);
	return (
		<div className="mt-16 flex flex-col">
			<div className="flex flex-col items-start w-max">
				<p className="text-2xl font-medium">All Products</p>
				<div className="w-16 h-0.5 bg-primary rounded-full"></div>
			</div>
			{loading === "pending" ? (
				<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
					{Array.from({ length: 5 }).map((_, index) => (
						<SkeletonCard key={index} />
					))}
				</div>
			) : filteredProducts.length > 0 ? (
				filteredProducts.some((product) => product.inStock) ? (
					<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
						{filteredProducts
							.filter((product) => product.inStock)
							.map((item, index) => (
								<ProductCard key={index} item={item} />
							))}
					</div>
				) : (
					<div className="flex items-center justify-center h-[60vh]">
						<p className="text-2xl font-medium text-primary">
							No Products In Stock Found In This Category.
						</p>
					</div>
				)
			) : (
				<div className="flex items-center justify-center h-[60vh]">
					<p className="text-2xl font-medium text-primary">
						No Products Found In This Category.
					</p>
				</div>
			)}
		</div>
	);
};

export default AllProducts;
