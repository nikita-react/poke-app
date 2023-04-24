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

export interface Column {
  id: string;
  label: string;
  align?: "left" | "center" | "right";
}

export interface TableData {
  columns: ReadonlyArray<Column>;
  data: PokemonsData | undefined;
  page: number;
  rowsPerPage: number;
  id?: string;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangePage: (event: unknown, newPage: number) => void;
}
