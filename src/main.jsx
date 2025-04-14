import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ContextComp from "./ContextApi/ContextPage.jsx";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'


const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ContextComp>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextComp>
  </QueryClientProvider>
);
