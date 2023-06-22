import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import PokemonComparisonPage from '../components/PokemonComparisonPage';

const queryClient = new QueryClient();

describe('PokemonComparisonPage', () => {
  it('renders all child components', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary fallbackRender={() => <div>Error occurred</div>}>
          <PokemonComparisonPage />
        </ErrorBoundary>
      </QueryClientProvider>
    );

    expect(screen.getByTestId('layout')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('render-selected-pokemons')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
