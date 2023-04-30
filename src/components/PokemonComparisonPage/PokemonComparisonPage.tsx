import Layout from "../Layout";
import Footer from "../Footer";
import Header from "../Header";
import RenderSelectedPokemons from "../RenderSelectedPokemons";

const PokemonComparisonPage = () => {
  return (
    <Layout styles="flex justify-between flex-col gap-5	">
      <Header />
      <RenderSelectedPokemons />
      <Footer />
    </Layout>
  );
};

export default PokemonComparisonPage;
