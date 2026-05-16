import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CopilotKit } from "@copilotkit/react-core";
import App from "./App";
import "./index.css";
import "@copilotkit/react-ui/styles.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1 },
    mutations: { retry: 0 },
  },
});

createRoot(document.getElementById("root")!).render(
  <CopilotKit runtimeUrl="/api/copilotkit">
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </CopilotKit>
);
