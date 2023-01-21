import { NavLink, Route, Routes } from "react-router-dom";
import { Image, Icon, HStack, Link, Box, Divider } from "@chakra-ui/react";
import { VscAccount } from "react-icons/vsc";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Home from "./Home";
import Products from "./Products";
import Product from "./Product";
import Account from "./Account";
import Cart from "./Cart";

const links = [
    {
        to: "/",
        presentation: <Image src=".../Resources/logo.png" />,
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
        path: "/cart",
        element: <Cart />,
    },
];

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
                </HStack>
            </Box>
            <Routes>
                {routes.map((route) => (
                    <Route key={route.path} path={route.path} element={route.element} />
                ))}
            </Routes>
        </div>
    );
}
