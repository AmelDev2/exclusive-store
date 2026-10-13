import { useState, useEffect, useRef } from "react";
import FlashSalesTimer from "../components/FlashSalesTimer";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton"; 
import { useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Truck,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

const sidebarCategories = [
  {
    name: "Woman's Fashion",
    slug: "womens-fashion",
    categories: [
      "tops",
      "womens-dresses",
      "womens-shoes",
      "womens-bags",
      "womens-jewellery",
    ],
  },
  {
    name: "Men's Fashion",
    slug: "mens-fashion",
    categories: ["mens-shirts", "mens-shoes"],
  },
  {
    name: "Smartphones & Mobile",
    slug: "mobile",
    categories: ["smartphones", "mobile-accessories"],
  },
  {
    name: "Laptops & Computers",
    slug: "computers",
    categories: ["laptops", "tablets"],
  },
  {
    name: "Fragrances & Beauty",
    slug: "beauty",
    categories: ["fragrances", "beauty", "skin-care"],
  },
  {
    name: "Watches & Accessories",
    slug: "accessories",
    categories: [
      "mens-watches",
      "womens-watches",
      "sunglasses",
      "sports-accessories",
    ],
  },
  {
    name: "Home Decoration",
    slug: "home",
    categories: ["home-decoration", "furniture"],
  },
];

const heroSlides = [
  {
    id: 1,
    subtitle: " iPhone Series",
    titleLine1: "Up to 10%",
    titleLine2: "off Voucher",
    image:
      "https://cdn.dummyjson.com/products/images/smartphones/iPhone%205s/1.png",
  },
  {
    id: 2,
    subtitle: "⚡ Mega Tech Sale",
    titleLine1: "Up to 50%",
    titleLine2: "off Electronics",
    image:
      "https://cdn.dummyjson.com/products/images/laptops/Lenovo%20Yoga%20920/1.png",
  },
  {
    id: 3,
    subtitle: "✨ Exclusive Collection",
    titleLine1: "Trending Styles",
    titleLine2: "Arrivals 2026",
    image:
      "https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/1.png",
  },
];

const USD_TO_SAR = 3.75;

const formatPrice = (price) => {
  const converted = price * USD_TO_SAR;
  return `SAR ${converted.toFixed(2)}`;
};

const getOriginalPrice = (product) => {
  const discount = Number(product.discountPercentage) || 0;

  if (discount <= 0 || discount >= 100) {
    return product.price;
  }

  return product.price / (1 - discount / 100);
};

const mapProductToCard = (product) => {
  const discount = Number(product.discountPercentage) || 0;

  return {
    id: product.id,
    name: product.title,
    brand: product.brand || "",
    description: product.description || "",
    price: formatPrice(product.price),
    originalPrice: formatPrice(getOriginalPrice(product)),
    rating: product.rating ?? 0,
    reviews: product.rating ?? 0,
    discount: discount > 0 ? `-${Math.round(discount)}%` : "",
    image: product.thumbnail,
    images: product.images || [],
    stock: product.stock ?? 0,
    category: product.category,
  };
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const productsSectionRef = useRef(null);
  const [flashScrollIndex, setFlashScrollIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  // مصفوفة خاصة بالمنتجات المطابقة للبحث فقط
  const searchResults = searchQuery.trim() === "" ? [] : products.filter((product) => 
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("https://dummyjson.com/products?limit=0", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        const cleanProducts = (data.products || []).filter(
          (product) =>
            !["groceries", "kitchen-accessories"].includes(product.category),
        );

        setProducts(cleanProducts);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error fetching products:", err);
          setError(
            "Failed to load products. Please check your internet connection and try again.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === heroSlides.length - 1 ? 0 : prev + 1,
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const flashSalesProducts = products.slice(0, 8);

  const selectedCategory = sidebarCategories.find(
    (category) => category.slug === activeCategory,
  );

  const filteredExploreProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) =>
          selectedCategory?.categories.includes(product.category),
        );

  const handleCategorySelect = (slug) => {
    setActiveCategory(slug);
    setFlashScrollIndex(0);

    productsSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleNextFlash = () => {
    setFlashScrollIndex((prev) =>
      prev < flashSalesProducts.length - 4 ? prev + 1 : 0,
    );
  };

  const handlePrevFlash = () => {
    setFlashScrollIndex((prev) => Math.max(prev - 1, 0));
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-red-500 mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* القائمة الجانبية والسلايدر */}
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4 border-r border-gray-200 pr-6 hidden md:block">
          <ul className="space-y-4 font-medium text-sm">
            {sidebarCategories.map((cat) => (
              <li
                key={cat.slug}
                onClick={() => handleCategorySelect(cat.slug)}
                className={`flex justify-between items-center cursor-pointer transition-all duration-300 transform hover:translate-x-1 group py-1 ${
                  activeCategory === cat.slug
                    ? "text-red-500 font-bold"
                    : "text-gray-700 hover:text-red-500"
                }`}
              >
                <span>{cat.name}</span>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-transform duration-300 group-hover:scale-110" />
              </li>
            ))}
          </ul>
        </aside>

        {/* بانر */}
        <div className="w-full md:w-3/4 bg-black text-white p-8 md:p-12 rounded-lg flex items-center justify-between relative overflow-hidden shadow-xl min-h-95">
          <div className="z-10 transition-all duration-700 ease-in-out w-1/2">
            <p className="text-sm tracking-wider mb-2 text-gray-300">
              {heroSlides[currentSlide].subtitle}
            </p>

            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              {heroSlides[currentSlide].titleLine1}
              <br />
              {heroSlides[currentSlide].titleLine2}
            </h1>

            <button
              onClick={() => handleCategorySelect("all")}
              className="underline font-semibold hover:text-red-400 text-base flex items-center gap-2 group cursor-pointer"
            >
              Shop Now{" "}
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
          </div>

          <div className="z-10 transition-all duration-700 flex justify-center items-center w-1/2 h-full">
            <img
              key={heroSlides[currentSlide].id}
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].subtitle}
              className="max-h-65 object-contain drop-shadow-[0_20px_20px_rgba(255,255,255,0.15)] animate-fade-in"
            />
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                aria-label={`Slide ${index + 1}`}
                onClick={() => setCurrentSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === index
                    ? "bg-red-500 w-8"
                    : "bg-gray-500 hover:bg-gray-300 w-2.5"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Flash Sales قسم ال  */}
      <section className="mt-20">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-4 h-8 bg-red-500 rounded-sm" />
          <h2 className="text-red-500 font-semibold">Today's</h2>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
            <h3 className="text-3xl font-bold tracking-wide">Flash Sales</h3>
            <FlashSalesTimer />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handlePrevFlash}
              aria-label="Previous products"
              className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 text-black" />
            </button>

            <button
              onClick={handleNextFlash}
              aria-label="Next products"
              className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
            >
              <ArrowRight className="w-5 h-5 text-black" />
            </button>
          </div>
        </div>

        {/* عرض السكيلتون الوهمي للمنتجات عند ضعف الشبكة مثلا  */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <ProductCardSkeleton key={`flash-skeleton-${index}`} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {flashSalesProducts
              .slice(flashScrollIndex, flashScrollIndex + 4)
              .map((product) => (
                <ProductCard
                  key={`flash-${product.id}`}
                  product={mapProductToCard(product)}
                />
              ))}
          </div>
        )}
      </section>

      <hr className="my-16 border-gray-200" />

      {/* Best Selling Products  قسم ال*/}
      <section className="mt-20">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-4 h-8 bg-red-500 rounded-sm" />
          <h2 className="text-red-500 font-semibold">This Month</h2>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h3 className="text-3xl font-bold tracking-wide">
            Best Selling Products
          </h3>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <ProductCardSkeleton key={`best-skeleton-${index}`} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.slice(8, 12).map((product) => (
              <ProductCard
                key={`best-${product.id}`}
                product={mapProductToCard(product)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Browse By Category */}
      <section className="mt-12">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-4 h-8 bg-red-500 rounded-sm" />
          <h2 className="text-red-500 font-semibold">Categories</h2>
        </div>

        <h3 className="text-3xl font-bold tracking-wide mb-8">
          Browse By Category
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-4">
          <button
            onClick={() => handleCategorySelect("all")}
            className={`border rounded-lg p-6 text-center transition-all cursor-pointer ${
              activeCategory === "all"
                ? "bg-red-500 text-white border-red-500 shadow-md"
                : "border-gray-200 hover:border-red-500 hover:text-red-500"
            }`}
          >
            <span className="font-medium text-sm">All Products</span>
          </button>

          {sidebarCategories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => handleCategorySelect(cat.slug)}
              className={`border rounded-lg p-6 text-center transition-all cursor-pointer ${
                activeCategory === cat.slug
                  ? "bg-red-500 text-white border-red-500 shadow-md"
                  : "border-gray-200 hover:border-red-500 hover:text-red-500"
              }`}
            >
              <span className="font-medium text-sm">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* البانر الإعلاني */}
      <section className="my-20 bg-black text-white p-10 md:p-16 rounded-lg flex flex-col md:flex-row items-center justify-between">
        <div className="space-y-4 max-w-md">
          <span className="text-green-400 font-semibold text-sm">
            Categories
          </span>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Enhance Your Music Experience
          </h2>

          <button
            onClick={() => handleCategorySelect("all")}
            className="bg-green-500 text-white px-8 py-3 rounded font-medium hover:bg-green-600 cursor-pointer"
          >
            Buy Now!
          </button>
        </div>

        <div className="mt-8 md:mt-0">
          <img
            src="https://cdn.dummyjson.com/products/images/smartphones/iPhone%2013%20Pro/1.png"
            alt="Speaker"
            className="max-h-55 object-contain drop-shadow-[0_15px_15px_rgba(255,255,255,0.2)]"
          />
        </div>
      </section>

      {/* Explore Our Products قسم  */}
      <section ref={productsSectionRef} className="mt-12 pt-4 scroll-mt-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-4 h-8 bg-red-500 rounded-sm" />
          <h2 className="text-red-500 font-semibold">Our Products</h2>
        </div>

        <h3 className="text-3xl font-bold tracking-wide mb-8">
          {activeCategory === "all"
            ? "Explore Our Products"
            : `Products: ${selectedCategory?.name || activeCategory}`}
        </h3>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <ProductCardSkeleton key={`explore-skeleton-${index}`} />
            ))}
          </div>
        ) : filteredExploreProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {filteredExploreProducts.map((product) => (
              <ProductCard
                key={`explore-${product.id}`}
                product={mapProductToCard(product)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-12">
            No matching products found in this category.
          </p>
        )}
      </section>

      {/* قسم نتائج البحث المنفصل - يظهر فقط إذا بحث المستخدم عن شيء */}
      {searchQuery.trim() !== "" && (
        <section id="search-results-section" className="mt-16 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-4 h-8 bg-red-500 rounded-sm" />
            <h2 className="text-red-500 font-semibold">Search Results</h2>
          </div>

          <h3 className="text-3xl font-bold tracking-wide mb-8">
            Results for "{searchQuery}"
          </h3>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <ProductCardSkeleton key={`search-skeleton-${index}`} />
              ))}
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {searchResults.map((product) => (
                <ProductCard
                  key={`search-result-${product.id}`}
                  product={mapProductToCard(product)}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-12">
              No matching products found for "{searchQuery}".
            </p>
          )}
        </section>
      )}

      {/* New Arrival قسم ال  */}
      <section className="mt-24">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-4 h-8 bg-red-500 rounded-sm" />
          <h2 className="text-red-500 font-semibold">Featured</h2>
        </div>

        <h3 className="text-3xl font-bold tracking-wide mb-8">New Arrival</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-black p-6 rounded-lg text-white">
          <div
            className="relative rounded-lg p-8 flex flex-col justify-end min-h-87.5 overflow-hidden bg-cover bg-center group"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=800')`,
            }}
          >
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent"></div>
            <div className="relative z-10">
              <h4 className="text-2xl font-bold mb-2">PlayStation 5</h4>
              <p className="text-gray-300 text-sm mb-4">
                Black and White version of the PS5 coming out on sale.
              </p>
              <button
                onClick={() => handleCategorySelect("computers")}
                className="underline font-medium w-fit hover:text-red-400 cursor-pointer"
              >
                Shop Now
              </button>
            </div>
          </div>

          <div className="grid grid-rows-2 gap-6">
            <div
              className="relative rounded-lg p-8 flex flex-col justify-end min-h-40 overflow-hidden bg-cover bg-center group"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800')`,
              }}
            >
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent"></div>
              <div className="relative z-10">
                <h4 className="text-xl font-bold mb-1">Women's Collections</h4>
                <p className="text-gray-300 text-xs mb-2">
                  Featured woman collections that give you another vibe.
                </p>
                <button
                  onClick={() => handleCategorySelect("womens-fashion")}
                  className="underline font-medium w-fit text-sm hover:text-red-400 cursor-pointer"
                >
                  Shop Now
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div
                className="relative rounded-lg p-6 flex flex-col justify-end min-h-40 overflow-hidden bg-cover bg-center group"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=600')`,
                }}
              >
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent"></div>
                <div className="relative z-10">
                  <h4 className="text-lg font-bold mb-1">Speakers</h4>
                  <p className="text-gray-300 text-xs mb-2">
                    Discover electronic accessories.
                  </p>
                  <button
                    onClick={() => handleCategorySelect("mobile")}
                    className="underline font-medium w-fit text-xs hover:text-red-400 cursor-pointer"
                  >
                    Shop Now
                  </button>
                </div>
              </div>

              <div
                className="relative rounded-lg p-6 flex flex-col justify-end min-h-40 overflow-hidden bg-cover bg-center group"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=600')`,
                }}
              >
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent"></div>
                <div className="relative z-10">
                  <h4 className="text-lg font-bold mb-1">Perfume</h4>
                  <p className="text-gray-300 text-xs mb-2">
                    Discover fragrances.
                  </p>
                  <button
                    onClick={() => handleCategorySelect("beauty")}
                    className="underline font-medium w-fit text-xs hover:text-red-400 cursor-pointer"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* قسم مميزات المتجر  */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 my-24 text-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4 text-black">
            <Truck className="w-8 h-8" />
          </div>
          <h4 className="font-bold text-lg mb-1">FREE AND FAST DELIVERY</h4>
          <p className="text-sm text-gray-500">
            Free delivery for all orders over SAR 525
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4 text-black">
            <RefreshCw className="w-8 h-8" />
          </div>
          <h4 className="font-bold text-lg mb-1">24/7 CUSTOMER SERVICE</h4>
          <p className="text-sm text-gray-500">
            Friendly 24/7 customer support
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4 text-black">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h4 className="font-bold text-lg mb-1">MONEY BACK GUARANTEE</h4>
          <p className="text-sm text-gray-500">
            We return money within 30 days
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;