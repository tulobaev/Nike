import AdminPage from "../components/pages/AdminPage";
import HomePage from "../components/pages/HomePage";
import BrandPage from "../components/products/brand/BrandPage";
import ProductDetails from "../components/products/details/ProductDetails";
import ProductsPage from "../components/products/ProductsPage";

export const links = [
  {
    link: "/",
    element: <HomePage />,
  },
  {
    link: "/products",
    element: <ProductsPage />,
    title: "Products",
  },
  {
    link: "/admin",
    element: <AdminPage />,
    title: "Admin",
  },
  {
    link: "/details/:id",
    element: <ProductDetails />,
  },
  {
    link: "/brand/:brand",
    element: <BrandPage />,
  },
];
