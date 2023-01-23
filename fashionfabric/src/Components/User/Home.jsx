import { HStack, Text, Heading, Box, Divider, Icon, Image, VStack, Stack } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Navigate, useNavigate } from "react-router";
import womenBag from "../../Resources/womenBagCropped.jpg";
import scarf from "../../Resources/scarf.jpg";
import menCoat from "../../Resources/menCoat.jpg";
import womenCoat from "../../Resources/womenCoat.jpg";
import rabbitGifting from "../../Resources/rabbitGifting.jpg";

export default function Home() {
    const navigate = useNavigate();
    return (
        <Box>
            {/* <video src="https://us.burberry.com/womens-bags/?brbref=hp_womens_bags" autoplay /> */}
            <Image
                src={womenBag}
                width="100%"
                margin="auto"
                onClick={() => navigate("/products/women?category=coats")}
                _hover={{ cursor: "pointer" }}
            />
            <Box position="relative" top="0">
                <Heading position="absolute" top="-100px" size="xl">
                    Women's Bags
                </Heading>
            </Box>
            <Divider />
            <Stack
                spacing="0"
                justifyContent="center"
                alignItems="center"
                direction={["column", "column", "row", "row", "row"]}
            >
                <Box
                    position="relative"
                    top="0"
                    onClick={() => navigate("/products/women?category=scarves")}
                    _hover={{ cursor: "pointer" }}
                >
                    <Heading size="md" position="absolute" top="50px" left="30px">
                        Scarves
                    </Heading>
                    <Image src={scarf} width="100%" margin="auto" />
                </Box>

                <Box
                    position="relative"
                    top="0"
                    onClick={() => navigate("/products/men?category=coats")}
                    _hover={{ cursor: "pointer" }}
                >
                    <Heading size="md" position="absolute" top="50px" left="30px">
                        Men's Coats
                    </Heading>
                    <Image src={menCoat} width="100%" margin="auto" />
                </Box>

                <Box
                    position="relative"
                    top="0"
                    onClick={() => navigate("/products/women?category=coats")}
                    _hover={{ cursor: "pointer" }}
                >
                    <Heading size="md" position="absolute" top="50px" left="30px">
                        Women's Coats
                    </Heading>
                    <Image src={womenCoat} width="100%" margin="auto" />
                </Box>
            </Stack>
            <Divider />
            <VStack margin="50px auto" height="20vh" minHeight="fit-content" spacing="5px">
                <Heading
                    size="md"
                    onClick={() => navigate("/products/women?category=sneaker")}
                    transition="all 0.3s ease-in"
                    _hover={{ cursor: "pointer", color: "blue", padding: "10px" }}
                >
                    WOMEN' SNEAKERS
                </Heading>
                <Heading
                    size="md"
                    onClick={() => navigate("/products/men?category=sneaker")}
                    transition="all 0.3s ease-in"
                    _hover={{ cursor: "pointer", color: "blue", padding: "10px" }}
                >
                    MEN'S SNEAKERS
                </Heading>
                <Heading
                    size="md"
                    onClick={() => navigate("/products/women?season=winter")}
                    transition="all 0.3s ease-in"
                    _hover={{ cursor: "pointer", color: "blue", padding: "10px" }}
                >
                    WOMEN'S WINTER EDIT
                </Heading>
                <Heading
                    size="md"
                    onClick={() => navigate("/products/men?season=winter")}
                    transition="all 0.3s ease-in"
                    _hover={{ cursor: "pointer", color: "blue", padding: "10px" }}
                >
                    MEN'S WINTER EDIT
                </Heading>
            </VStack>
            <Divider />
            <Box>
                <Image
                    src={rabbitGifting}
                    onClick={() => navigate("/products/gifts")}
                    _hover={{ cursor: "pointer", cursor: "pointer" }}
                />
                {/* <Heading size="sm">Take a Leap</Heading>
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
                </Heading> */}
            </Box>
        </Box>
    );
}
