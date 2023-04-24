import { FC } from "react";
import Layout from "../Layout";
import Footer from "../Footer";
import Header from "../Header";
import RenderPokemons from "../RenderPokemons";

const Home: FC = () => {
  return (
    <Layout styles="flex justify-between flex-col gap-5	">
      <Header />
      <RenderPokemons />
      <Footer />
    </Layout>
  );
};

export default Home;
