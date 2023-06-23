import { useParams } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Loading from "../MUIComponents/Loading";
import usePokemonQuery from "../../hooks/usePokemonQuery";
import PokemonPageWrapper from "../PokemonPageWrapper";

const SinglePokemonPage = () => {
  const { id } = useParams();

  const { data, isLoading } = usePokemonQuery(id);


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
    <PokemonPageWrapper search={false}>
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
    </PokemonPageWrapper>
  );
};
export default SinglePokemonPage;
