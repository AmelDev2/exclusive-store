import { Link } from "react-router-dom";

const MyCancellations=()=> {
  const cancellations = [];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-sm text-gray-400 mb-8">
        <Link to="/" className="hover:text-black">Home</Link> / <span className="text-black font-medium">My Cancellations</span>
      </div>

      <h1 className="text-3xl font-bold mb-6">My Cancellations</h1>

      {cancellations.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500 text-lg mb-4">No cancelled orders found.</p>
          <Link to="/" className="bg-red-500 text-white px-6 py-3 rounded font-medium hover:bg-red-600 transition-colors inline-block">
            Back to Home
          </Link>
        </div>
      ) : (
        <div>{/*View Cancellations*/}</div>
      )}
    </div>
  );
}

export default MyCancellations