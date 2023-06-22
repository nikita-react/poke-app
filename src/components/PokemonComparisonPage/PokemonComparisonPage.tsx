import Layout from "../Layout";
import Footer from "../Footer";
import Header from "../Header";
import RenderSelectedPokemons from "../RenderSelectedPokemons";

const PokemonComparisonPage = () => {
  return (
    <Layout data-testid="layout" styles="flex justify-between flex-col gap-5">
      <Header data-testid="header" search={false} />
      <RenderSelectedPokemons data-testid="render-selected-pokemons" />
      <Footer data-testid="footer" />
    </Layout>
  );
};

export default PokemonComparisonPage;
