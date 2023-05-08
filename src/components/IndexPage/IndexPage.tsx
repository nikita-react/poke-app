import { FC } from "react";
import Layout from "../Layout";
import Footer from "../Footer";
import Header from "../Header";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const IndexPage: FC = () => {
    return (
        <Layout styles="flex flex-col justify-between gap-5">
            <Header search={false} />
            <div className="container mx-auto">
                <h1 className="mb-8 text-4xl font-bold text-center">Poke App</h1>

                <h3 className="mb-4 text-lg font-medium">
                    GitHub -{" "}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://github.com/nikita-react/poke-app"
                        className="text-blue-500 hover:underline"
                    >
                        https://github.com/nikita-react/poke-app
                    </a>
                </h3>
                <h3 className="mb-4 text-lg font-medium">
                    LinkedIn -{" "}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.linkedin.com/in/mykyta-voskoboinykov/"
                        className="text-blue-500 hover:underline"
                    >
                        https://www.linkedin.com/in/mykyta-voskoboinykov/
                    </a>
                </h3>

                <h3 className="mt-8 mb-4 text-lg font-medium">Technology stack:</h3>
                <ul className="list-disc list-inside">
                    <li className="mb-1">React Js</li>
                    <li className="mb-1">Typescript</li>
                    <li className="mb-1">Graphql</li>
                    <li className="mb-1">Tanstack</li>
                    <li className="mb-1">Tailwind</li>
                    <li className="mb-1">Material Ui</li>
                    <li className="mb-1">Supabase</li>
                    <li className="mb-1">React hook forms</li>
                    <li className="mb-1">React router dom</li>
                    <li className="mb-1">React toastify</li>
                </ul>

                <h3 className="mt-8 text-lg font-medium">
                    To view my application, you can either use the test data or create an account.
                </h3>
                <p className="mb-2">Test email: "test@email.com"</p>
                <p className="mb-6">Test password: "qwerty"</p>

                <div className="flex justify-center gap-5">
                    <Link to="/login">
                        <Button variant="contained" color="secondary">
                            Use Test Data
                        </Button>
                    </Link>
                    <Link to="/registration">
                        <Button variant="contained" color="secondary">
                            Create Account
                        </Button>
                    </Link>
                </div>
            </div>
            <Footer />
        </Layout>
    );
};

export default IndexPage;
