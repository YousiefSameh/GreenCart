import { assets, features } from "@assets/assets";

const BottomBanner = () => {
	return (
		<div className="relative mt-24">
			<img
				src={assets.bottom_banner_image}
				className="w-full hidden md:block"
				alt=""
			/>
			<img
				src={assets.bottom_banner_image_sm}
				className="w-full block md:hidden"
				alt=""
			/>
			<div className="absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-24">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-primary mb-6">Why We Are The Best?</h1>
          {features.map((item, i) => (
            <div key={i} className="flex items-center gap-4 mt-2">
              <img src={item.icon} className="w-9 md:w-11" alt={item.title} />
              <div>
                <h3 className="text-lg md:text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-500/70 text-xs md:text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
		</div>
	);
};

export default BottomBanner;
