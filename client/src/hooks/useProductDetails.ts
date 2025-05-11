import { useEffect, useState } from "react";
import { IProduct } from "@customTypes/ProductsTypes";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useNavigate, useParams } from "react-router-dom";

const useProductDetails = () => {
  const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { products } = useAppSelector((state) => state.products);
	const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
	const { id } = useParams();

	const currency = import.meta.env.VITE_CURRENCY;

	const product = products.find((product) => product._id === id);

	const [thumbnail, setThumbnail] = useState<string | undefined>(
		product?.image[0]
	);

	useEffect(() => {
		if (products.length > 0) {
			let productsCopy = products.slice();
			productsCopy = productsCopy.filter(
				(item) => item.category === product?.category
			);
			setRelatedProducts(productsCopy);
		}
	}, [product?.category, products]);

	useEffect(() => {
		setThumbnail(product?.image[0] ? product.image[0] : undefined);
	}, [product?.image]);
  return {
    dispatch,
    navigate,
    product,
    relatedProducts,
    currency,
    thumbnail,
    setThumbnail
  }
}

export default useProductDetails