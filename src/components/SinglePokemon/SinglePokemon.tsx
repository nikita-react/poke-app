import Layout from "../Layout";
import Footer from "../Footer";
import Header from "../Header";
import RenderSinglePokemon from "../RenderSinglePokemon";

const SinglePokemon = () => {
  return (
    <Layout styles="flex justify-between flex-col gap-5	">
      <Header />
      <RenderSinglePokemon />
      <Footer />
    </Layout>
  );
};

export default SinglePokemon;
