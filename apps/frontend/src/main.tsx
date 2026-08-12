import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Renter } from "./pages/renter.tsx";
import { Layout } from "./pages/layout.tsx";
import { Rate } from "./pages/rate.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Renter />,
      },
      {
        path: "/rate",
        element: <Rate />,
      },
    ],
  },
]);
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
