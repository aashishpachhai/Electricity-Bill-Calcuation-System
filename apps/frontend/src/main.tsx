import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Renter } from "./pages/renter.tsx";
import { Layout } from "./pages/layout.tsx";
import { Rate } from "./pages/rate.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { Dashboard } from "./pages/dashboard.tsx";
import { History } from "./pages/history.tsx";
import { RecordReaing } from "./pages/recordReading.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/renter",
        element: <Renter />,
      },
      {
        path: "/rate",
        element: <Rate />,
      },
      {
        index: true,
        // path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/record-reading",
        element: <RecordReaing />,
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
