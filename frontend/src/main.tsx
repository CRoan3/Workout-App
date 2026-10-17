import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ApiError } from "@/lib/apiClient";
import "./index.css";
import App from "./App.tsx";

// One cache for the whole app; every useQuery reads from and writes to it
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000, // treat fetched data as fresh for 30s before refetching
      // Retry network/server failures, but not 4xx errors (a 404 won't fix itself)
      retry: (failureCount, error) =>
        !(error instanceof ApiError && error.status < 500) && failureCount < 2,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>
);
