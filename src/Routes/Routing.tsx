import Registration from "../components/Registration";
import Login from "../components/Login";
import Home from "../components/Home";
import NotFound from "../components/NotFound";
import { Routes, Route } from "react-router-dom";


const Routing = () => {
    return <>
        <Routes>
            <Route path="/">
                <Route index element={<Home />} />
                <Route path="registration" element={<Registration />} />
                <Route path="login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    </>;
}
export default Routing