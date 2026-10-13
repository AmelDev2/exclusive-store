import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const categories = [
  { name: "Woman's Fashion", hasSub: true },
  { name: "Men's Fashion", hasSub: true },
  { name: "Electronics", hasSub: false },
  { name: "Home & Lifestyle", hasSub: false },
  { name: "Medicine", hasSub: false },
  { name: "Sports & Outdoor", hasSub: false },
  { name: "Baby's & Toys", hasSub: false },
  { name: "Groceries & Pets", hasSub: false },
  { name: "Health & Beauty", hasSub: false },
];

const CategorySidebar = () => {
  return (
    <div className="w-64 py-4 border-r border-gray-200 hidden lg:block pr-6">
      <ul className="flex flex-col gap-4">
        {categories.map((category, index) => (
          <li key={index}>
            <Link
              to={`/category/${category.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
              className="flex items-center justify-between text-gray-800 hover:text-red-500 font-medium text-sm transition-all duration-300 transform hover:translate-x-1 group py-1"
            >
              <span>{category.name}</span>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-transform duration-300 group-hover:scale-110" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;