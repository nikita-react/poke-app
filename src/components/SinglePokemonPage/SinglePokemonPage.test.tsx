import { render, screen, renderHook } from "@testing-library/react";
import SinglePokemonPage from "./index";
import { QueryClient, QueryClientProvider, UseQueryResult } from "@tanstack/react-query";
import * as query from "../../hooks/useGQLQuery";
import usePokemonData from "../../hooks/usePokemonData";
import { BrowserRouter } from "react-router-dom";

const client = new QueryClient();

const spyOnSinglePokemonData = jest.spyOn(query, "useGQLQuery");

describe('SinglePokemonPage', () => {
    it('should render the component', () => {
        spyOnSinglePokemonData.mockReturnValue({
            data: {
                pokemon_v2_pokemon: [
                    {
                        id: 1,
                        name: 'bulbasaur',
                        height: 7,
                        base_experience: 64,
                        is_default: true,
                    }
                ],
                pokemon_v2_pokemonspeciesdescription: [
                    {
                        description: 'bulbasaur is a pokemon',
                    }
                ],
                pokemon_v2_pokemonspeciesflavortext: [
                    {
                        flavor_text: 'bulbasaur is a pokemon',
                    }
                ],
            },
            isLoading: false,
        } as UseQueryResult<unknown, unknown>);
        render(
            <QueryClientProvider client={client}>
                <BrowserRouter>
                    <SinglePokemonPage />
                </BrowserRouter>
            </QueryClientProvider>
        );
        expect(screen.getByTestId('renderSinglePokemon-container')).toBeInTheDocument();
    });

    it('should show loader', () => {
        spyOnSinglePokemonData.mockReturnValue({
            data: undefined,
            isLoading: true,
        } as UseQueryResult<unknown, unknown>);
        render(
            <QueryClientProvider client={client}>
                <BrowserRouter>
                    <SinglePokemonPage />
                </BrowserRouter>
            </QueryClientProvider>
        );
        expect(screen.getByTestId('global-loader')).toBeInTheDocument();
    });

    it('should return the correct data', () => {
        spyOnSinglePokemonData.mockReturnValue({
            data: {
                pokemon_v2_pokemon: [
                    {
                        id: 1,
                        name: 'bulbasaur',
                        height: 7,
                        base_experience: 64,
                        is_default: true,
                    }
                ],
                pokemon_v2_pokemonspeciesdescription: [
                    {
                        description: 'bulbasaur is a pokemon',
                    }
                ],
                pokemon_v2_pokemonspeciesflavortext: [
                    {
                        flavor_text: 'bulbasaur is a pokemon',
                    }
                ],
            },
            isLoading: false,
        } as UseQueryResult<unknown, unknown>);
        render(
            <QueryClientProvider client={client}>
                <BrowserRouter>
                    <SinglePokemonPage />
                </BrowserRouter>
            </QueryClientProvider>
        );
        const expected = {
            pokemonId: 1,
            name: 'bulbasaur',
            height: 7,
            base_experience: 64,
            is_default: true,
            description: 'bulbasaur is a pokemon',
            flavor_text: 'bulbasaur is a pokemon',
            isLoading: false,
        };
        const {
            result: {
                current: {
                    pokemonId,
                    name,
                    height,
                    base_experience,
                    is_default,
                    description,
                    flavor_text,
                    isLoading,
                },
            },
        } = renderHook(() => usePokemonData(1));

        const result = {
            pokemonId,
            name,
            height,
            base_experience,
            is_default,
            description,
            flavor_text,
            isLoading,
        }
        expect(result).toEqual(expected);
    });


    it('should render list correctly corresponding to BE response', () => {
        // TODO: add data-testid to list and check if it is in the document
    });
});
