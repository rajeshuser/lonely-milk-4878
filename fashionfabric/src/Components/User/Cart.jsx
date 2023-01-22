import { Link, useNavigate } from "react-router-dom";
import { Heading, SimpleGrid, Box, Button, HStack, border, transition } from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { appContext } from "../Contexts/AppContext";
import ProductCard from "./ProductCard";

export default function Cart() {
    const { baseURL, user } = useContext(appContext);
    const [cartProducts, setCartProducts] = useState(dummyCartProducts);
    const navigate = useNavigate();

    if (user === null) {
        alert("Please sign-in to see user cart");
        // "navigate("/account")" is not immediatly getting triggered;
        // being triggered after the browser is minimised and then clicked on the cart again
        navigate("/account");
        // below is alternative if above does not work
        // return <Link to="/account">Go to account</Link>
    }

    useEffect(() => {
        return;
        getCartProducts();

        function formatAsQueryParams(cartProducts) {
            // cartProducts = [[id, quantity], ...]
            let string = "";
            for (let [id] of cartProducts) {
                if (cartProducts.length > 1) string += "&";
                string += "id=" + id;
            }
            return string;
        }

        async function getCartProducts() {
            let response = await axios({
                method: "get",
                baseURL,
                url: `/products?${formatAsQueryParams(user.cart)}`,
            });
            const cartProducts = response.data;
            addQuantityKey(cartProducts, user);
            function addQuantityKey(cartProducts, user) {
                for (let i = 0; i < user.cart; i++) {
                    // adding the key-value "quantity:number" in each "orderedProduct"
                    cartProducts[i].quantity = user.cary[1];
                }
            }
            setCartProducts(cartProducts);
        }
    }, []);

    return (
        <Box>
            <HStack justifyContent="space-around" paddingTop="50px">
                <Heading>Your Cart</Heading>
                <Button
                    margin="20px"
                    backgroundColor="gold"
                    // transition="color 1s ease-out"
                    _hover={{
                        backgroundColor: "yellow",
                        border: "1px solid black",
                        // position: "relative",
                    }}
                    onClick={() => navigate("/checkout")}
                >
                    Buy Now
                </Button>
            </HStack>
            <SimpleGrid minHeight="70vh" columns={4} spacing="5px" margin="10px">
                {cartProducts.map((product) => (
                    <ProductCard {...product} showCartButtons={true} />
                ))}
            </SimpleGrid>
        </Box>
    );
}

var dummyCartProducts = [
    {
        quantity: 3,
        id: 1,
        name: "vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus",
        price: 1150,
        color: "brown",
        category: "knitwear",
        style: "cardigan",
        size: "xs",
        material: "wool",
        gender: "female",
        ageGroup: "adult",
        season: "winter",
        images: [
            "https://assets.burberry.com/is/image/Burberryltd/EC955983-5422-40AF-AE13-A5FEDBACE6D4?$BBY_V2_ML_1x1$&wid=887&hei=887",
            "https://assets.burberry.com/is/image/Burberryltd/7F53A08D-9474-42A0-A5AB-1DD2EA0BDDCD?$BBY_V2_SL_1x1$&wid=887&hei=887",
        ],
        description:
            "diam vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui sapien eget mi proin sed libero enim sed faucibus",
    },
    {
        quantity: 3,
        id: 2,
        name: "vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus",
        price: 1150,
        color: "brown",
        category: "knitwear",
        style: "cardigan",
        size: "xs",
        material: "wool",
        gender: "female",
        ageGroup: "adult",
        season: "winter",
        images: [
            "https://assets.burberry.com/is/image/Burberryltd/EC955983-5422-40AF-AE13-A5FEDBACE6D4?$BBY_V2_ML_1x1$&wid=887&hei=887",
            "https://assets.burberry.com/is/image/Burberryltd/7F53A08D-9474-42A0-A5AB-1DD2EA0BDDCD?$BBY_V2_SL_1x1$&wid=887&hei=887",
        ],
        description:
            "diam vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui sapien eget mi proin sed libero enim sed faucibus",
    },
    {
        quantity: 3,
        id: 3,
        name: "vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus",
        price: 1150,
        color: "brown",
        category: "knitwear",
        style: "cardigan",
        size: "xs",
        material: "wool",
        gender: "female",
        ageGroup: "adult",
        season: "winter",
        images: [
            "https://assets.burberry.com/is/image/Burberryltd/EC955983-5422-40AF-AE13-A5FEDBACE6D4?$BBY_V2_ML_1x1$&wid=887&hei=887",
            "https://assets.burberry.com/is/image/Burberryltd/7F53A08D-9474-42A0-A5AB-1DD2EA0BDDCD?$BBY_V2_SL_1x1$&wid=887&hei=887",
        ],
        description:
            "diam vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui sapien eget mi proin sed libero enim sed faucibus",
    },
    {
        quantity: 3,
        id: 4,
        name: "vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus",
        price: 1150,
        color: "brown",
        category: "knitwear",
        style: "cardigan",
        size: "xs",
        material: "wool",
        gender: "female",
        ageGroup: "adult",
        season: "winter",
        images: [
            "https://assets.burberry.com/is/image/Burberryltd/EC955983-5422-40AF-AE13-A5FEDBACE6D4?$BBY_V2_ML_1x1$&wid=887&hei=887",
            "https://assets.burberry.com/is/image/Burberryltd/7F53A08D-9474-42A0-A5AB-1DD2EA0BDDCD?$BBY_V2_SL_1x1$&wid=887&hei=887",
        ],
        description:
            "diam vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui sapien eget mi proin sed libero enim sed faucibus",
    },
    {
        quantity: 3,
        id: 5,
        name: "vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus",
        price: 1150,
        color: "brown",
        category: "knitwear",
        style: "cardigan",
        size: "xs",
        material: "wool",
        gender: "female",
        ageGroup: "adult",
        season: "winter",
        images: [
            "https://assets.burberry.com/is/image/Burberryltd/EC955983-5422-40AF-AE13-A5FEDBACE6D4?$BBY_V2_ML_1x1$&wid=887&hei=887",
            "https://assets.burberry.com/is/image/Burberryltd/7F53A08D-9474-42A0-A5AB-1DD2EA0BDDCD?$BBY_V2_SL_1x1$&wid=887&hei=887",
        ],
        description:
            "diam vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui sapien eget mi proin sed libero enim sed faucibus",
    },
];
