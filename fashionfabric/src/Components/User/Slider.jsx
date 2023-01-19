import { Heading, Box, HStack } from "@chakra-ui/react";
import ProductCard from "./ProductCard";

export default function Slider({ products, title }) {
    console.log(products);
    return (
        <Box marginY="100px">
            <Heading>{title}</Heading>
            <HStack>
                {products.map((product) => (
                    <ProductCard {...product} />
                ))}
            </HStack>
        </Box>
    );
}
