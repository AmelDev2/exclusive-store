import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductCardSkeleton = () => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      {/* صورة وهمية */}
      <div className="h-48 mb-4">
        <Skeleton height="100%" borderRadius="8px" />
      </div>
      {/* العنوان الوهمي */}
      <Skeleton count={2} height={16} className="mb-2" />
      {/* السعر والتقييم */}
      <div className="flex justify-between items-center mt-4">
        <Skeleton width={60} height={20} />
        <Skeleton width={40} height={20} />
      </div>
    </div>
  );
};
export default ProductCardSkeleton