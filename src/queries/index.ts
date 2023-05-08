import gql from "graphql-tag";

export const GET_POKEMONS = gql`
 query pokemonsSearch($limit: Int, $offset: Int, $query: String) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset, where: { name: {_regex: $query } }) {
      id
      name
      height
      base_experience
      is_default
    }
    pokemon_v2_pokemon_aggregate {
      aggregate {
        count
      }
    }
  }
`;


export const GET_POKEMON = gql`
  query pokemon($id: Int!) {
    pokemon_v2_pokemon(where: { id: { _eq: $id } }) {
      id
      name
      height
      base_experience
      is_default
    }
    pokemon_v2_pokemonspeciesdescription(where: { id: { _eq: $id } }) {
      description
    }
    pokemon_v2_pokemonspeciesflavortext(where: { id: { _eq: $id } }) {
      flavor_text
    }
  }
`;

export const GET_SELECTED_POKEMONS = gql`
  query selectedPokemons($_in: [Int!]) {
    pokemon_v2_pokemon(where: { id: { _in: $_in } }) {
      id
      name
      height
      base_experience
      is_default
    }
  }
`;
