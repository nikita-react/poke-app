import MUITable from "../MUITable";

const RenderSelectedPokemons = () => {
  const data = {
    pokemon_v2_pokemon: [
      {
        id: 1,
        name: "bulbasaur",
        height: 7,
        base_experience: 64,
        is_default: true,
      },
      {
        id: 2,
        name: "ivysaur",
        height: 10,
        base_experience: 142,
        is_default: true,
      },
      {
        id: 3,
        name: "venusaur",
        height: 20,
        base_experience: 263,
        is_default: true,
      },
      {
        id: 4,
        name: "charmander",
        height: 6,
        base_experience: 62,
        is_default: true,
      },
      {
        id: 5,
        name: "charmeleon",
        height: 11,
        base_experience: 142,
        is_default: true,
      },
      {
        id: 6,
        name: "charizard",
        height: 17,
        base_experience: 267,
        is_default: true,
      },
      {
        id: 7,
        name: "squirtle",
        height: 5,
        base_experience: 63,
        is_default: true,
      },
      {
        id: 8,
        name: "wartortle",
        height: 10,
        base_experience: 142,
        is_default: true,
      },
      {
        id: 9,
        name: "blastoise",
        height: 16,
        base_experience: 265,
        is_default: true,
      },
      {
        id: 10,
        name: "caterpie",
        height: 3,
        base_experience: 39,
        is_default: true,
      },
    ],
    pokemon_v2_pokemon_aggregate: {
      aggregate: {
        count: 1279,
      },
    },
  };

  return (
    <></>

    // <MUITable data={data} showPagination={false} />
  );
};
export default RenderSelectedPokemons;
