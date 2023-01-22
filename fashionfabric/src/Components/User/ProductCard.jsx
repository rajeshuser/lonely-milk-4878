import { Card, CardBody, CardHeader, CardFooter, Image, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { Button, Box, Stack } from "@chakra-ui/react";
import { useContext } from "react";
import { appContext } from "../Contexts/AppContext";
import axios from "axios";

export default function ProductCard(props) {
    const {
        quantity,
        showCartButtons = false,
        id,
        name,
        price,
        color,
        category,
        style,
        size,
        material,
        gender,
        ageGroup,
        season,
        images,
        description,
    } = props;
    const navigate = useNavigate();
    const [imageIndex, setImageIndex] = useState(0);
    const { user, baseURL } = useContext(appContext);

    const handleQuantityChange = (change) => {
        if (user === null) {
            return;
        }

        changeProductQuantityInUserCart();
        async function changeProductQuantityInUserCart() {
            let getResponse = await axios({
                method: "get",
                baseURL,
                url: `/users/${user.id}`,
            });

            let user = getResponse.user;

            for (let cartItem of user.cart) {
                if (cartItem[0] === id) {
                    cartItem[1] += Math.max(1, cartItem[1] + change);
                    break;
                }
            }

            let patchResponse = await axios({
                method: "patch",
                baseURL,
                url: `/users/${user.id}`,
                headers: {
                    "content-type": "application/json",
                },
                data: user,
            });
        }
    };

    const handleRemove = () => {
        deleteUser();
        async function deleteUser() {
            let deleteResponse = await axios({
                method: "delete",
                baseURL,
                url: `/users/${user.id}`,
            });
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setImageIndex((imageIndex) => (imageIndex + 1) % images.length);
        }, 3000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Card height="fit-content" margin="50px 0" _hover={{ cursor: "pointer" }}>
            <CardBody width="100%" padding="0 0 20px 0">
                <Image
                    src={images[imageIndex]}
                    fallbackSrc="https://via.placeholder.com/150"
                    boxSize="100%"
                    objectFit="contain"
                    onClick={() => navigate(`/product/${id}`)}
                />
                <Heading fontSize="sm" marginY="10px">
                    {name}
                </Heading>
                <Text>${price}</Text>
                <Text>{quantity === undefined ? "New" : "Quantity: " + quantity}</Text>
                {showCartButtons ? (
                    <Stack
                        width="100%"
                        padding="10px"
                        direction="row"
                        justifyContent="center"
                        spacing="10px"
                    >
                        <Button width="30%" onClick={() => handleQuantityChange(1)}>
                            +Quantity
                        </Button>
                        <Button width="30%" onClick={() => handleQuantityChange(-1)}>
                            -Quantity
                        </Button>
                        <Button width="30%" onClick={handleRemove}>
                            Remove
                        </Button>
                    </Stack>
                ) : null}
            </CardBody>
        </Card>
    );
}
