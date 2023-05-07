import { FC } from "react";
import Layout from "../Layout";
import Footer from "../Footer";
import Header from "../Header";
import RenderPokemons from "../RenderPokemons";

const PokemonsPage: FC = () => {
  return (
    <Layout styles="flex justify-between flex-col gap-5	">
      <Header search={true} />
      <RenderPokemons />
      <Footer />
    </Layout>
  );
};

export default PokemonsPage;
