import gql from "graphql-tag";

// export const GET_POKEMONS = gql`
//   query pokemons($limit: Int, $offset: Int) {
//     pokemons(limit: $limit, offset: $offset) {
//       count
//       next
//       previous
//       status
//       message
//       results {
//         url
//         name
//         image
//         id
//       }
//     }
//   }
// `;

export const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset) {
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
