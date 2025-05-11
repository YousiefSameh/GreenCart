import { useAppSelector } from "@store/hooks";
import MainBanner from "@components/ui/Home/MainBanner";
import Categories from "@components/ui/Home/Categories";
import BestSeller from "@components/ui/Home/BestSeller";
import BottomBanner from "@components/ui/Home/BottomBanner";
import NewsLetter from "@components/ui/Home/NewsLetter";

const Home = () => {
	const { products } = useAppSelector((state) => state.products);
	return (
		<div className="mt-10">
			<MainBanner />
			<Categories />
			<BestSeller products={products} />
			<BottomBanner />
			<NewsLetter />
		</div>
	);
};

export default Home;
