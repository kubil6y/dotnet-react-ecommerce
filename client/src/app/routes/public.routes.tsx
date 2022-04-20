import { NotFound, ServerError } from "../../errors";
import { AboutPage } from "../../features/about";
import { Catalog, ProductDetails } from "../../features/catalog";
import { ContactPage } from "../../features/contact";
import { HomePage } from "../../features/home";

export const publicRoutes = [
  {
    id: "pub:1",
    path: "/",
    component: () => <HomePage />,
    exact: true,
  },
  {
    id: "pub:2",
    path: "/catalog",
    component: () => <Catalog />,
    exact: true,
  },
  {
    id: "pub:3",
    path: "/catalog/:id",
    component: () => <ProductDetails />,
    exact: true,
  },
  {
    id: "pub:4",
    path: "/about",
    component: () => <AboutPage />,
    exact: true,
  },
  {
    id: "pub:5",
    path: "/contact",
    component: () => <ContactPage />,
    exact: true,
  },
  {
    id: "pub:6",
    path: "/server-error",
    component: () => <ServerError />,
    exact: true,
  },
  {
    id: "pub:not_found_404",
    path: "*",
    component: () => <NotFound />,
    exact: true,
  },
];
