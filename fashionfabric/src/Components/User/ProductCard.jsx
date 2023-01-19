import { Card, CardBody, CardHeader, CardFooter, Image, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";

export default function ProductCard(props) {
    const {
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
    const [imageIndex, setImageIndex] = useState(images[0]);

    useEffect(() => {
        const timer = setInterval(() => {
            setImageIndex((imageIndex) => (imageIndex + 1) % images.length);
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Card
            height="fit-content"
            margin="50px 0"
            _hover={{ cursor: "pointer" }}
            onClick={() => navigate(`/product/${id}`)}
        >
            <CardBody width="100%" padding="0 0 20px 0">
                <Image
                    src={images[0]}
                    fallbackSrc="https://via.placeholder.com/150"
                    boxSize="100%"
                    objectFit="contain"
                />
                <Heading fontSize="sm" marginY="10px">
                    {name}
                </Heading>
                <Text>${price}</Text>
                <Text>New</Text>
            </CardBody>
        </Card>
    );
}
