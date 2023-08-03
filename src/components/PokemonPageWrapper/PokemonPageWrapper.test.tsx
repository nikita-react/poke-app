import PokemonPageWrapper from "./PokemonPageWrapper";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


describe("PokemonPageWrapper", () => {
    const queryClient = new QueryClient();

    test("check if header and footer are rendered", () => {
       const {getByTestId} =  render(
            <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <PokemonPageWrapper children={<></>} search={true} />
            </BrowserRouter>
            </QueryClientProvider>
        );
        const header = getByTestId("header");
        const footer = getByTestId("footer");
        const layout = getByTestId("layout");
        expect(layout).toBeInTheDocument();
        expect(header).toBeInTheDocument();
        expect(footer).toBeInTheDocument();
})

test ("check layout styles", () => {
    const { getByTestId } = render(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <PokemonPageWrapper children={<></>} search={true} />
            </BrowserRouter>
            </QueryClientProvider>
      );
      const layoutComponent = getByTestId("layout");

      const stylesProp = layoutComponent.className;

      expect(stylesProp).toBe("min-h-screen flex justify-between flex-col gap-5");
    })
});