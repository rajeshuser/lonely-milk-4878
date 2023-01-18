import { NavLink, Route, Routes } from "react-router-dom";
import { Image, Icon, HStack, Link, Box, Divider } from "@chakra-ui/react";
import { VscAccount } from "react-icons/vsc";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Home from "./Home";
import Products from "./Products";
import Account from "./Account";
import Cart from "./Cart";

const links = [
    {
        path: "/",
        presentation: <Image src=".../Resources/logo.png" />,
        element: <Home />,
    },
    { path: "/gifts", presentation: "Gifts", element: <Products /> },
    { path: "/new", presentation: "New", element: <Products /> },
    { path: "/women", presentation: "Women", element: <Products /> },
    { path: "/men", presentation: "Men", element: <Products /> },
    { path: "/children", presentation: "Children", element: <Products /> },
    { path: "/outerwear", presentation: "Outerwear", element: <Products /> },
    { path: "/bags", presentation: "Bags", element: <Products /> },
    { path: "/account", presentation: <Icon as={VscAccount} boxSize={10} />, element: <Account /> },
    {
        path: "/cart",
        presentation: <Icon as={AiOutlineShoppingCart} boxSize={10} />,
        element: <Cart />,
    },
];

// GIFTS
// NEW
// WOMEN
// MEN
// CHILDREN
// OUTERWEAR
// BAGS

export default function NavigationAndRoutes() {
    const activeLinkStyle = {
        color: "white",
        fontWeight: "bold",
        textShadow: "0px 0px 3px white",
        textDecoration: "none",
        width: "8%",
    };
    const defaultLinkStyle = { color: "white", textDecoration: "none", width: "8%" };

    return (
        <div>
            <Box height="100px">
                <HStack
                    width="100%"
                    margin="auto"
                    backgroundColor="#001122"
                    justifyContent="center"
                    alignItems="center"
                    fontSize="large"
                    padding="20px"
                    position="fixed"
                    height="inherit"
                >
                    {links.map((link) => (
                        <Link
                            key={link.path}
                            as={NavLink}
                            to={link.path}
                            style={({ isActive }) =>
                                isActive ? activeLinkStyle : defaultLinkStyle
                            }
                        >
                            {link.presentation}
                        </Link>
                    ))}
                </HStack>
            </Box>
            <Routes>
                {links.map((link) => (
                    <Route key={link.path} path={link.path} element={link.element} />
                ))}
            </Routes>
        </div>
    );
}
