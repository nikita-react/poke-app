import { useGQLQuery } from "../../hooks/useGQLQuery";
import { GET_POKEMON } from "../../queries";
import { useParams } from "react-router-dom";
import { SinglePokemonData } from "../../types";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Loading from "../Loading";

const RenderSinglePokemon = () => {
  const { id } = useParams();

  const { data, isLoading } = useGQLQuery<SinglePokemonData>(
    ["pokemon"],
    GET_POKEMON,
    {
      id: id,
    }
  );

  const {
    pokemon_v2_pokemon,
    pokemon_v2_pokemonspeciesdescription,
    pokemon_v2_pokemonspeciesflavortext,
  } = data || {};

  const {
    id: pokemonId,
    name,
    height,
    base_experience,
    is_default,
  } = pokemon_v2_pokemon?.[0] || {};

  const { description } = pokemon_v2_pokemonspeciesdescription?.[0] || {};
  const { flavor_text } = pokemon_v2_pokemonspeciesflavortext?.[0] || {};

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="container flex justify-start mx-auto">
      <img
        className="w-1/2 shrink-0 h-fit "
        alt={name}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
      />

      <div className={`flex flex-col grow`}>
        <ListItem className="bg-slate-50 " component="div" disablePadding>
          <ListItemButton>
            <ListItemText className="px-5 " primary={`Id: ${pokemonId}`} />
          </ListItemButton>
        </ListItem>
        <ListItem className="bg-slate-50 " component="div" disablePadding>
          <ListItemButton>
            <ListItemText className="px-5 " primary={`Name: ${name}`} />
          </ListItemButton>
        </ListItem>
        <ListItem className="bg-slate-50 " component="div" disablePadding>
          <ListItemButton>
            <ListItemText className="px-5 " primary={`Height: ${height}`} />
          </ListItemButton>
        </ListItem>
        <ListItem className="bg-slate-50 " component="div" disablePadding>
          <ListItemButton>
            <ListItemText
              className="px-5 "
              primary={`Experience: ${base_experience}`}
            />
          </ListItemButton>
        </ListItem>
        <ListItem className="bg-slate-50 " component="div" disablePadding>
          <ListItemButton>
            <ListItemText
              className="px-5 "
              primary={`Default: ${is_default}`}
            />
          </ListItemButton>
        </ListItem>
        <ListItem className="bg-slate-50 " component="div" disablePadding>
          <ListItemButton>
            <ListItemText
              className="px-5 "
              primary={`Description: ${description} ${flavor_text}`}
            />
          </ListItemButton>
        </ListItem>
      </div>
    </div>
  );
};
export default RenderSinglePokemon;
