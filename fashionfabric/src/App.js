import "./App.css";
import { useContext, useEffect } from "react";
import axios from "axios";
import { appContext } from "./Components/Contexts/AppContext";
import NavigationAndRoutes from "./Components/User/NavigationAndRoutes";
import Footer from "./Components/User/Footer";
import { Divider } from "@chakra-ui/react";

function App() {
    return (
        <div className="App">
            <NavigationAndRoutes />
            <Divider />
            <Footer />
        </div>
    );
}

export default App;
