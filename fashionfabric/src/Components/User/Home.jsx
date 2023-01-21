import { HStack, Text, Heading, Box, Divider, Icon } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Navigate, useNavigate } from "react-router";

export default function Home() {
    const navigate = useNavigate();
    return (
        <Box>
            {/* <video src="https://us.burberry.com/womens-bags/?brbref=hp_womens_bags" autoplay /> */}
            <Box>
                <Heading size="xl">Women's Bags</Heading>
            </Box>
            <Divider />
            <HStack justifyContent="center" alignItems="center">
                <Heading
                    size="md"
                    onClick={() => navigate("/products/women?category=scarves")}
                    _hover={{ cursor: "pointer" }}
                >
                    Scarves
                </Heading>
                <Heading
                    size="md"
                    onClick={() => navigate("/products/men?category=coats")}
                    _hover={{ cursor: "pointer" }}
                >
                    Men's Coats and Jakcets
                </Heading>
                <Heading
                    size="md"
                    onClick={() => navigate("/products/women?category=coats")}
                    _hover={{ cursor: "pointer" }}
                >
                    Women's Coats and Jackets
                </Heading>
            </HStack>
            <Divider />
            <Box>
                <Heading
                    size="md"
                    onClick={() => navigate("/products/women?category=sneaker")}
                    _hover={{ cursor: "pointer" }}
                >
                    WOMEN' SNEAKERS
                </Heading>
                <Heading
                    size="md"
                    onClick={() => navigate("/products/men?category=sneaker")}
                    _hover={{ cursor: "pointer" }}
                >
                    MEN'S SNEAKERS
                </Heading>
                <Heading
                    size="md"
                    onClick={() => navigate("/products/women?season=winter")}
                    _hover={{ cursor: "pointer" }}
                >
                    WOMEN'S WINTER EDIT
                </Heading>
                <Heading
                    size="md"
                    onClick={() => navigate("/products/men?season=winter")}
                    _hover={{ cursor: "pointer" }}
                >
                    MEN'S WINTER EDIT
                </Heading>
            </Box>
            <Divider />
            <Box>
                <Heading size="sm">Take a Leap</Heading>
                <Heading
                    size="md"
                    onClick={() => navigate("/products/gifts")}
                    _hover={{ cursor: "pointer" }}
                >
                    Year Of The Rabbit Gifting
                </Heading>
                <Heading
                    size="sm"
                    onClick={() => navigate("/products/gifts?gender=women")}
                    _hover={{ cursor: "pointer" }}
                >
                    <Icon as={AiOutlineArrowRight} />
                    For her
                </Heading>
                <Heading
                    size="sm"
                    onClick={() => navigate("/products/gifts?gender=men")}
                    _hover={{ cursor: "pointer" }}
                >
                    <Icon as={AiOutlineArrowRight} />
                    For Him
                </Heading>
            </Box>
        </Box>
    );
}
