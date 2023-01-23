import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
    Stack,
    Image,
    Spinner,
    Text,
    Heading,
    HStack,
    Divider,
    StackDivider,
    Button,
    VStack,
    Box,
} from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { appContext } from "../Contexts/AppContext";
import { BiStore } from "react-icons/bi";
import { SlInfo, SlNotebook } from "react-icons/sl";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import Slider from "./Slider";

function capitalize(word) {
    return word[0].toUpperCase() + word.substring(1);
}

function IconTitleInfoButton({ icon, title, info }) {
    return (
        <HStack>
            {icon}
            <VStack>
                <Text alignSelf="flex-start" textDecorationLine="underline">
                    {title}
                </Text>
                <Text>{info}</Text>
            </VStack>
        </HStack>
    );
}

function LinkButton({ text }) {
    return (
        <Button variant="transparant" textDecorationLine="underline">
            {text}
        </Button>
    );
}

function Recommendations() {
    const [recommendations, setRecommendations] = useState(dummyRecommendations);
    const { baseURL } = useContext(appContext);
    const [requestStatus, setRequestStatus] = useState("success");
    useEffect(() => {
        setRequestStatus("loading");
        getRecommendations();
        async function getRecommendations() {
            try {
                const response = await axios({
                    method: "get",
                    baseURL,
                    url: "/products?id=1&id=2&id=3&id=4&id=5",
                });
                setRecommendations(response.data);
                setRequestStatus("success");
            } catch (error) {
                console.log(error);
                setRequestStatus("error");
            }
        }
    }, []);
    if (requestStatus === "loading") {
        return <Spinner />;
    } else if (requestStatus === "error") {
        return <Heading>Recommendations</Heading>;
    } else if (requestStatus === "success") {
        return <Slider products={recommendations} title="Recommendations" />;
    }
}

export default function Product() {
    // how to subscribe to browserURL
    const { id } = useParams();
    const navigate = useNavigate();
    const { baseURL, user } = useContext(appContext);
    const [product, setProduct] = useState(dummyProduct);
    const [requestStatus, setRequestStatus] = useState("success");

    useEffect(() => {
        // return;
        setRequestStatus("loading");
        getProduct();
        async function getProduct() {
            try {
                let response = await axios({
                    method: "get",
                    baseURL,
                    url: `/products/${id}`,
                });
                console.log(response.data);
                setRequestStatus("success");
                setProduct(response.data);
            } catch (error) {
                setRequestStatus("error");
                console.log(error);
            }
        }
    }, []);

    function handleAddToCart() {
        if (user === null) {
            alert("Please login to add in cart");
            navigate("/account");
        } else {
            addProductInUserCart();
            async function addProductInUserCart() {
                // cart = [[id, quantity], ...]

                console.log(user)
                let getResponse = await axios({
                    method: "get",
                    baseURL,
                    url: `/users/${user.id}`,
                });

                let updatedUser = getResponse.data;

                const cart = updatedUser.cart;

                for (let [id] of cart) {
                    if (id === product.id) {
                        alert("Product is already in the cart");
                        return;
                    }
                }
				
                let patchResponse = await axios({
                    method: "patch",
                    baseURL,
                    url: `users/${updatedUser.id}`,
                    headers: {
                        "content-type": "application/json",
                    },
                    data: { cart: [...updatedUser.cart, [product.id, 1]] },
                });

                if (patchResponse.status === 200) {
                    alert("Product is added to the cart");
                }
            }
        }
    }

    function handleMakeFavourite() {
        // how to use make network request offline
        if (user === null) {
            alert("Please login to make favourite");
            navigate("/account");
        } else {
            addProductInUserFavourites();
            async function addProductInUserFavourites() {
                // favourites = [id, ...]
                let getResponse = await axios({
                    method: "get",
                    baseURL,
                    url: `users/${user.id}`,
                });

                let updatedUser = getResponse.data;

                const favourites = updatedUser.favourites;
                for (let id of favourites) {
                    if (id === product.id) {
                        alert("Product is already in favourites");
                        return;
                    }
                }

                let patchResponse = await axios({
                    method: "patch",
                    baseURL,
                    url: `users/${updatedUser.id}`,
                    headers: {
                        "content-type": "application/json",
                    },
                    data: { favourites: [...updatedUser.favourites, product.id] },
                });
            }
        }
    }

    return requestStatus === "loading" ? (
        <Spinner />
    ) : requestStatus == "error" ? (
        <Text>???</Text>
    ) : requestStatus == "success" ? (
        <Box>
            <Stack direction="row">
                <Image
                    src={product.images[0]}
                    boxSize="50%"
                    fallbackSrc="https://via.placeholder.com/150"
                    objectFit="contain"
                />
                <VStack
                    divider={<Divider />}
                    alignItems="flex-start"
                    paddingLeft="20px"
                    textAlign="left"
                >
                    <HStack divider={<StackDivider borderColor="grey" />} spacing="20px">
                        <Text>{capitalize(product.gender)}</Text>
                        <Text>{capitalize(product.ageGroup)}</Text>
                        <Text>{capitalize(product.category)}</Text>
                    </HStack>
                    <Box alignSelf="flex-end" paddingRight="100px">
                        <MdFavoriteBorder onClick={handleMakeFavourite} />
                    </Box>
                    <Heading fontSize="xl">{capitalize(product.name)}</Heading>
                    <Text>${product.price}</Text>
                    <HStack>
                        <Text>Instalment payments available</Text>
                        <SlInfo />
                    </HStack>
                    <Text>Color: {capitalize(product.color)}</Text>
                    <Text>Style: {capitalize(product.style)}</Text>
                    <Text>Size: {product.size.toUpperCase()}</Text>
                    <Text>
                        Free Shipping And Returns
                        <LinkButton text="More Details" />
                    </Text>
                    <HStack>
                        <Button
                            variant="outline"
                            borderColor="black"
                            color="white"
                            backgroundColor="black"
                            _hover={{ textShadow: "0 0 5px white", fontWeight: "bold" }}
                            onClick={handleAddToCart}
                        >
                            Add To Cart
                        </Button>
                        <Button
                            variant="outline"
                            borderColor="black"
                            _hover={{ color: "white", backgroundColor: "black" }}
                        >
                            Send Using Gift
                        </Button>
                    </HStack>
                    <VStack alignItems="left" spacing="20px">
                        <IconTitleInfoButton
                            icon={<BiStore alignSelf="flex-start" />}
                            title="Find in Store"
                            info="Find this item in your closest Burberry
					store"
                        />
                        <IconTitleInfoButton
                            icon={<SlNotebook />}
                            title="Book an Appointment"
                            info="In-store, virtual, or after-care appointment – depending
					on your country"
                        />
                    </VStack>
                    <Box>
                        <Text textAlign="left">Product Details</Text>
                        <Text textAlign="justify">{product.description}</Text>
                    </Box>
                    <HStack width="100%">
                        <LinkButton text="More Details" />
                        <LinkButton text="Contact Us" />
                    </HStack>
                </VStack>
            </Stack>
            <Recommendations />
        </Box>
    ) : null;
}

var dummyProduct = {
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
};

var dummyRecommendations = [
    { ...dummyProduct },
    { ...dummyProduct },
    { ...dummyProduct },
    { ...dummyProduct },
    { ...dummyProduct },
];
