import { assets } from "@assets/assets";
import { useState } from "react";
import { Link } from "react-router-dom";

const {
	main_banner_bg,
	main_banner_bg_sm,
	white_arrow_icon,
	black_arrow_icon,
} = assets;

interface MainBannerProps {
	className?: string;
}

const MainBanner: React.FC<MainBannerProps> = ({ className = "" }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const handleImageLoad = () => {
		setIsLoading(false);
	};

	const handleImageError = () => {
		setError("Failed to load banner image");
		setIsLoading(false);
	};

	return (
		<div className={`relative ${className}`}>
			{isLoading && (
				<div className="absolute inset-0 flex items-center justify-center bg-gray-100">
					<div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
				</div>
			)}
			{error && (
				<div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-red-500">
					{error}
				</div>
			)}
			<img
				className="w-full hidden md:block"
				src={main_banner_bg}
				alt="Main banner for desktop view"
				loading="lazy"
				onLoad={handleImageLoad}
				onError={handleImageError}
				width={1920}
				height={600}
			/>
			<img
				className="w-full block md:hidden"
				src={main_banner_bg_sm}
				alt="Main banner for mobile view"
				loading="lazy"
				onLoad={handleImageLoad}
				onError={handleImageError}
				width={768}
				height={400}
			/>
			<div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24">
				<div className="">
					<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15">
						Freshness You Can Trust, Savings You will Love!
					</h1>
				</div>
				<div className="flex items-center mt-6 font-medium">
					<Link
						to="/products"
						className="group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white cursor-pointer"
					>
						Shop Now
						<img
							src={white_arrow_icon}
							className="md:hidden transition group-focus:translate-x-1"
							alt="Arrow Icon"
						/>
					</Link>
					<Link
						to="/products"
						className="group flex items-center gap-2 px-7 md:px-9 py-3 cursor-pointer"
					>
						Explore Deals
						<img
							src={black_arrow_icon}
							className="md:hidden transition group-focus:translate-x-1"
							alt="Arrow Icon"
						/>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default MainBanner;
