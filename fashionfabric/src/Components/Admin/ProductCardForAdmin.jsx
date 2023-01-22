import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Image,
    Heading,
    Text,
    HStack,
    VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { Button, Box, Stack } from "@chakra-ui/react";
import { useContext } from "react";
import { appContext } from "../Contexts/AppContext";
import axios from "axios";

export default function ProductCardForAdmin(product) {
    const navigate = useNavigate();
    const [imageIndex, setImageIndex] = useState(0);
    const { user, baseURL } = useContext(appContext);

    useEffect(() => {
        const timer = setInterval(() => {
            setImageIndex((imageIndex) => (imageIndex + 1) % product.images.length);
        }, 3000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    function capitalize(string) {
        return string[0].toUpperCase() + string.substring(1);
    }

    function getProductPairs() {
        let productPairs = [];
        for (let key in product) {
            if (key === "images" || key === "description") {
                continue;
            }
            productPairs.push(
                <HStack justifyContent="space-between" width="100%" padding="0px 20px">
                    <Heading fontSize="sm" marginY="10px">
                        {capitalize(key)}
                    </Heading>
                    <Text>
                        {typeof product[key] === "string"
                            ? product[key].substring(0, 15)
                            : product[key]}
                    </Text>
                </HStack>
            );
        }
        return productPairs;
    }

    return (
        <Card height="fit-content" margin="50px 0" _hover={{ cursor: "pointer" }}>
            <CardBody width="100%" padding="0">
                <Image
                    src={product.images[imageIndex]}
                    fallbackSrc="https://via.placeholder.com/150"
                    boxSize="100%"
                    objectFit="contain"
                    onClick={() => navigate(`/product/${product.id}`)}
                />
                <VStack>{getProductPairs()}</VStack>
            </CardBody>
        </Card>
    );
}
