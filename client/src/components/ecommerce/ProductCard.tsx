import { IProduct } from "@customTypes/ProductsTypes";
import { assets } from "@assets/assets";
import useProductCard from "@hooks/useProductCard";

const ProductCard = ({ item }: { item: IProduct }) => {
	const {
    navigate,
    items,
    currency,
    handleAddToCart,
    handleDeteteProductFromCart
  } = useProductCard();

	return item && (
		<div onClick={() => {
			navigate(`/products/${item.category.toLowerCase()}/${item._id}`);
			scrollTo(0, 0)
		}} className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white w-full">
			<div className="group cursor-pointer flex items-center justify-center px-2">
				<img
					className="group-hover:scale-105 transition max-w-26 md:max-w-36"
					src={item.image[0]}
					alt={item.name}
				/>
			</div>
			<div className="text-gray-500/60 text-sm">
				<p>{item.category}</p>
				<p className="text-gray-700 font-medium text-lg truncate w-full">
					{item.name}
				</p>
				<div className="flex items-center gap-0.5">
					{Array(5)
						.fill("")
						.map((_, i) => (
							<img
								key={i}
								className="md:w-3.5 w-3"
								src={i < 4 ? assets.star_icon : assets.star_dull_icon}
								alt={item.name}
							/>
						))}
					<p>(4)</p>
				</div>
				<div className="flex items-end justify-between mt-3">
					<p className="md:text-xl text-base font-medium text-primary">
						{currency}{item.offerPrice}{" "}
						<span className="text-gray-500/60 md:text-sm text-xs line-through">
							{currency}{item.price}
						</span>
					</p>
					<div onClick={(e) => e.stopPropagation()} className="text-primary">
						{!items[item._id] ? (
							<button
								className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/40 md:w-[80px] w-[64px] h-[34px] rounded cursor-pointer"
								onClick={() => handleAddToCart(item._id)}
							>
								<img src={assets.cart_icon} alt="" />
								Add
							</button>
						) : (
							<div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded select-none">
								<button
									onClick={() =>
										handleDeteteProductFromCart(
											item._id,
											Math.max(items[item._id] - 1, 0)
										)
									}
									className="cursor-pointer text-md px-2 h-full"
								>
									-
								</button>
								<span className="w-5 text-center">{items[item._id]}</span>
								<button
									onClick={() => handleAddToCart(item._id)}
									className="cursor-pointer text-md px-2 h-full"
								>
									+
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
