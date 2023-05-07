import {
	Card,
	CardBody,
	CardHeader,
	CardFooter,
	Image,
	Heading,
	Text,
	HStack,
	VStack
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
				<HStack justifyContent="space-between" width="100%" padding="0px 10px">
					<Heading fontSize="sm" marginY="5px">
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
				<Box
					onMouseEnter={(event) => setImageIndex(1)}
					onMouseLeave={(event) => setImageIndex(0)}
					position="relative"
					top="0px"
					left="0px"
					margin="auto"
				>
					{product.images.map((image, index) => (
						<Image
							key={index}
							src={image}
							fallbackSrc="https://via.placeholder.com/150"
							boxSize="100%"
							onClick={() => navigate(`/product/${product.id}`)}
							opacity={index === imageIndex ? 1 : 0}
							borderTopLeftRadius="5px"
							borderTopRightRadius="5px"
							transition="opacity 0.5s ease"
							position={index === 0 ? "relative" : "absolute"}
							top="0px"
							left="0px"
						/>
					))}
				</Box>
				<VStack padding="10px">{getProductPairs()}</VStack>
			</CardBody>
		</Card>
	);
}
