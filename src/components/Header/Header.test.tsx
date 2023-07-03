import { render, screen } from "@testing-library/react";
import Header from "../Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

describe("Header", () => {
    it("renders Search when search is true", () => {
        const search: boolean = true;
        const queryClient = new QueryClient();

        render(
            <QueryClientProvider client={queryClient}>
            <BrowserRouter> 
              <Header search={search} />
            </BrowserRouter>
          </QueryClientProvider>);
        expect(screen.getByTestId("search")).toBeInTheDocument();
    });
});
