import { NavLink, Route, Routes } from "react-router-dom";
import {
    Image,
    Icon,
    HStack,
    Link,
    Box,
    Divider,
    Heading,
    Text,
    VStack,
    position,
    textDecoration,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { VscAccount } from "react-icons/vsc";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsKey } from "react-icons/bs";
import Home from "./Home";
import Products from "./Products";
import Product from "./Product";
import Account from "./Account";
import Admin from "../Admin/Admin";
import Cart from "./Cart";
import Checkout from "./Checkout";
import AdminDashboard from "../Admin/AdminDashboard";
import logo from "../../Resources/logo.png";
import { useRef } from "react";
import { useState } from "react";
const links = [
    {
        to: "/",
        presentation: <Image src={logo} height="100%" />,
    },
    {
        to: "/products/gifts?category=gifts",
        presentation: "Gifts",
    },
    { to: "/products/new?isNew=true", presentation: "New" },
    { to: "/products/women?gender=women", presentation: "Women" },
    { to: "/products/men?gender=men", presentation: "Men" },
    { to: "/products/children?ageGroup=children", presentation: "Children" },
    {
        to: "/products/outerwear?isOuterwear=true",
        presentation: "Outerwear",
    },
    { to: "/products/bags?category=bags", presentation: "Bags" },
    {
        to: "/account",
        presentation: <Icon as={VscAccount} boxSize={10} />,
    },
    {
        to: "/admin",
        presentation: <Icon as={BsKey} boxSize={10} />,
    },
    {
        to: "/cart",
        presentation: <Icon as={AiOutlineShoppingCart} boxSize={10} />,
    },
];

const routes = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/products/:option",
        element: <Products />,
    },
    {
        path: "/product/:id",
        element: <Product />,
    },
    {
        path: "/account",
        element: <Account />,
    },
    {
        path: "/admin",
        element: <Admin />,
    },
    {
        path: "/cart",
        element: <Cart />,
    },
    {
        path: "/checkout",
        element: <Checkout />,
        AdminDashboard,
    },
    {
        path: "/admindashboard",
        element: <AdminDashboard />,
    },
];

export default function NavigationAndRoutes() {
    const [navBoxDisplay, setNavBoxDisplay] = useState("none");
    const navOptionsBoxForSmallScreenRef = useRef();

    function displayNavOptionsForSmallScreens() {
        let box = navOptionsBoxForSmallScreenRef.current;
        setNavBoxDisplay(navBoxDisplay === "none" ? "flex" : "none");
    }

    const activeLinkStyle = {
        color: "white",
        fontWeight: "bold",
        textShadow: "0px 0px 3px white",
        textDecoration: "none",
        width: "10%",
    };
    const defaultLinkStyle = { color: "white", textDecoration: "none", width: "8%" };

    return (
        <Box>
            <Box height="100px">
                {/* for small and medium screens */}
                <Box
                    width="100%"
                    margin="auto"
                    display={["flex", "flex", "flex", "none", "none"]}
                    flexDirection="column"
                    backgroundColor="#001122"
                    justifyContent="center"
                    alignItems="center"
                    fontSize="large"
                    padding="20px"
                    position="fixed"
                    height="inherit"
                    zIndex="1000"
                >
                    <HStack justifyContent="space-around" width="100%">
                        <Heading color="white">Fashion Fabric</Heading>
                        <HamburgerIcon
                            color="white"
                            boxSize="30px"
                            _hover={{ cursor: "pointer" }}
                            onClick={displayNavOptionsForSmallScreens}
                        />
                    </HStack>
                    <div
                        style={{
                            backgroundColor: "white",
                            borderRadius: "10px",
                            top: "70px",
                            height: "fit-content",
                            marginLeft: "60vw",
                            width: "30%",
                            position: "absolute",
                            display: navBoxDisplay,
                            flexDirection: "column",
                        }}
                        // id="box"
                        // ref={navOptionsBoxForSmallScreenRef}
                    >
                        {links.map((link) => {
                            if (link.to === "/") {
                                return;
                            }
                            return (
                                <Link
                                    key={link.to}
                                    as={NavLink}
                                    to={link.to}
                                    style={({ isActive }) =>
                                        isActive
                                            ? {
                                                  color: "white",
                                                  backgroundColor: "#555555",
                                                  textDecoration: "none",
                                                  borderRadius: "5px",
                                              }
                                            : {
                                                  color: "black",
                                                  backgroundColor: "#ffffff",
                                                  textDecoration: "none",
                                                  borderRadius: "5px",
                                              }
                                    }
                                    // _hover={{ backgroundColor: "#333333" }}
                                >
                                    {link.presentation}
                                </Link>
                            );
                        })}
                    </div>
                </Box>
                {/* for large screens */}
                <Box
                    width="100%"
                    margin="auto"
                    display={["none", "none", "none", "flex", "flex"]}
                    flexDirection="row"
                    backgroundColor="#001122"
                    justifyContent="center"
                    alignItems="center"
                    fontSize="large"
                    padding="20px"
                    position="fixed"
                    height="inherit"
                    zIndex="1000"
                >
                    {links.map((link) => (
                        <Link
                            key={link.to}
                            as={NavLink}
                            to={link.to}
                            style={({ isActive }) =>
                                isActive ? activeLinkStyle : defaultLinkStyle
                            }
                        >
                            {link.presentation}
                        </Link>
                    ))}
                </Box>
            </Box>
            <Routes>
                {routes.map((route) => (
                    <Route key={route.path} path={route.path} element={route.element} />
                ))}
            </Routes>
        </Box>
    );
}
