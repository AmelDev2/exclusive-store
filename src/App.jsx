import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import 'react-loading-skeleton/dist/skeleton.css';

export default function App() {
  return <RouterProvider router={router} />;
}
