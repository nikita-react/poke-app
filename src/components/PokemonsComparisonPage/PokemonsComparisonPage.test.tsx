import PokemonsComparisonPage from "./PokemonsComparisonPage";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import usePokemonSort from "../../hooks/usePokemonSort";
import { renderHook } from '@testing-library/react'

jest.mock('../../hooks/usePokemonSort', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("PokemonsComparisonPage", () => {

    const queryClient = new QueryClient();
    const pokemonsData = {
        pokemon_v2_pokemon: [
            {
                id: 1,
                name: "bulbasaur",
                height: 7,
                base_experience: 64,
                is_default: true
            },
            {
                id: 4,
                name: "charmander",
                height: 6,
                base_experience: 62,
                is_default: true
            },
        ]
    }

    test("render PokemonsComparisonPage", () => {
        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <PokemonsComparisonPage />
                </BrowserRouter>
            </QueryClientProvider>
        );
        const layout = getByTestId("layout");
        expect(layout).toBeInTheDocument();
    })



    // test('should sort data by default correctly', () => {
    //   const { result } = renderHook(() =>
    //     usePokemonSort(pokemonsData, "Default"),
    //   );

    //   expect(result.current).toEqual(pokemonsData); 
    // });
})