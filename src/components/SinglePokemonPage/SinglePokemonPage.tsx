import { useParams } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Loading from "../MUIComponents/Loading";
import usePokemonData from "../../hooks/usePokemonData";
import PokemonPageWrapper from "../PokemonPageWrapper";

const SinglePokemonPage = () => {
  const { id } = useParams();
  const { pokemonId,
    name,
    height,
    base_experience,
    is_default,
    description,
    flavor_text,
    isLoading, } = usePokemonData(id);


  if (isLoading) {
    return <Loading />;
  }
  return (
    <PokemonPageWrapper search={false}>
      <div data-testid="renderSinglePokemon-container" className="container flex justify-start mx-auto">
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
