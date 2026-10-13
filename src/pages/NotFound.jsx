import { Link } from "react-router-dom";

const NotFound = ()=> {
  return (
    <div className="container mx-auto px-4 py-12">
    
      <div className="text-sm text-gray-400 mb-20">
        <Link to="/" className="hover:text-black">Home</Link> /{" "}
        <span className="text-black font-medium">404 Error</span>
      </div>

      
      <div className="flex flex-col items-center justify-center text-center py-10">
        <h1 className="text-6xl md:text-8xl font-medium tracking-wider text-black mb-6">
          404 Not Found
        </h1>
        <p className="text-gray-600 text-sm md:text-base mb-16">
          Your visited page not found. You may go home page.
        </p>

        <Link
          to="/"
          className="bg-red-500 text-white px-10 py-4 rounded font-medium text-sm hover:bg-red-600 transition-colors shadow-sm"
        >
          Back to home page
        </Link>
      </div>
    </div>
  );
}

export default NotFound