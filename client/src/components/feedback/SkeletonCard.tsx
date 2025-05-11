import { memo } from "react";

const SkeletonCard = () => {
  return (
    <div className="animate-pulse bg-white p-2 rounded-[20px] shadow-2xl relative z-40">
      <div className="bg-[#F6F6F6] p-4 w-full h-[254px] flex items-center justify-center rounded-[20px] mb-2">
        <div className="bg-gray-300 size-full rounded"></div>
      </div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-100 rounded w-1/3"></div>
    </div>
  );
};

export default memo(SkeletonCard);