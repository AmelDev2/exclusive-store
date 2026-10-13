import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Account from "./pages/Account"
import MyOrders from "./pages-account/MyOrders";
import MyCancellations from "./pages-account/MyCancellations";
import MyReviews from "./pages-account/MyReviews";

export const router = createBrowserRouter([
  {
    element: <Layout />, 
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      {path:"/about", element:<About/>},
      {path:"/contact",element:<Contact/>},
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/cart", element: <Cart /> },
      { path: "/wishlist", element: <Wishlist /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/product/:id", element: <ProductDetails /> },
      { path: "/orders", element: <MyOrders /> },
      { path: "/cancellations", element: <MyCancellations /> },
      { path: "/reviews", element: <MyReviews /> },
      
      {path:"/account",element:<Account/>}
    ],
  },
  { path: "*", element: <NotFound /> },
]);