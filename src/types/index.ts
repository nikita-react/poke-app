export interface Pokemon {
  id: number;
  name: string;
  height: number;
  base_experience: number;
  is_default: boolean;
}

export interface PokemonsData {
  pokemon_v2_pokemon: Pokemon[];
  pokemon_v2_pokemon_aggregate: {
    aggregate: {
      count: number;
    };
  };
}
export interface PokemonDescription {
  flavor_text?: string;
  description?: string;
}
export interface SinglePokemonData {
  pokemon_v2_pokemon: Pokemon[];
  pokemon_v2_pokemonspeciesflavortext: PokemonDescription[];
  pokemon_v2_pokemonspeciesdescription: PokemonDescription[];
}
export interface Column {
  id: string;
  label: string;
  align?: "left" | "center" | "right";
}

export interface TableData {
  columns: readonly Column[];
  data: PokemonsData | any;
  page?: number;
  rowsPerPage?: number;
  id?: string;
  handleChangeRowsPerPage?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleChangePage?: (event: any, newPage: number) => void;
  isFetching?: boolean;
  showPagination: boolean;
  handleChangeSelectedItems?: (event: any, id: number) => void;
  renderCheckbox: boolean;
}
