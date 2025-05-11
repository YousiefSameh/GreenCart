import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
	actFetchProducts,
	actToggleProductStock,
} from "@store/products/productsSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ProductsList = () => {
	const dispatch = useAppDispatch();
	const { products, loading } = useAppSelector((state) => state.products);
	const currency = import.meta.env.VITE_CURRENCY;

	useEffect(() => {
		if (products.length <= 0) {
			dispatch(actFetchProducts());
		}
	}, [dispatch, products.length]);

	const handleStockToggle = async (
		productId: string,
		currentStock: boolean
	) => {
		try {
			await dispatch(
				actToggleProductStock({ productId, inStock: !currentStock })
			).unwrap();
			toast.success("Product stock updated successfully");
		} catch (error) {
			toast.error(
				error instanceof Error
					? error.message
					: "Failed to update product stock"
			);
		}
	};

	return (
		<div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
			<div className="w-full md:p-10 p-4">
				<h2 className="pb-4 text-lg font-medium">All Products</h2>
				<div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
					<table className="md:table-auto table-fixed w-full overflow-hidden">
						<thead className="text-gray-900 text-sm text-left">
							<tr>
								<th className="px-4 py-3 font-semibold truncate">Product</th>
								<th className="px-4 py-3 font-semibold truncate">Category</th>
								<th className="px-4 py-3 font-semibold truncate hidden md:block">
									Selling Price
								</th>
								<th className="px-4 py-3 font-semibold truncate">In Stock</th>
							</tr>
						</thead>
						<tbody className="text-sm text-gray-500">
							{products.map((product) => (
								<tr key={product._id} className="border-t border-gray-500/20">
									<td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
										<div className="border border-gray-300 rounded p-2">
											<img
												src={product.image[0]}
												alt="Product"
												className="w-16 hover:scale-105 transtion"
											/>
										</div>
										<span className="truncate max-sm:hidden w-full">
											{product.name}
										</span>
									</td>
									<td className="px-4 py-3">{product.category}</td>
									<td className="px-4 py-3 max-sm:hidden">
										{currency}
										{product.offerPrice}
									</td>
									<td className="px-4 py-3">
										<label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
											<input
												type="checkbox"
												className="sr-only peer"
												checked={product.inStock}
												onChange={() =>
													handleStockToggle(product._id, product.inStock)
												}
												disabled={loading === "pending"}
											/>
											<div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-primary transition-colors duration-200"></div>
											<span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
										</label>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default ProductsList;
