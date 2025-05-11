import ProductCard from "@components/ecommerce/ProductCard"
import { IProduct } from "@customTypes/ProductsTypes"

const BestSeller = ({ products }: { products: IProduct[] }) => {
  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">Best Seller</p>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
        {products.filter((product) => product.inStock).slice(0, 5).map((item, i) => (
          <ProductCard key={i} item={item}/>
        ))}
      </div>
    </div>
  )
}

export default BestSeller