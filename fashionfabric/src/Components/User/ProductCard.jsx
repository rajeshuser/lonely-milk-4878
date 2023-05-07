import {
	Card,
	CardBody,
	CardHeader,
	CardFooter,
	Image,
	Heading,
	Text,
	HStack
} from "@chakra-ui/react";
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
		description
	} = props;
	const navigate = useNavigate();
	const [imageIndex, setImageIndex] = useState(0);
	const [countInCart, setCountInCart] = useState(quantity);
	const { user, baseURL, refreshUser } = useContext(appContext);

	const handleQuantityChange = (change) => {
		if (user === null) {
			return;
		}

		changeProductQuantityInUserCart();
		async function changeProductQuantityInUserCart() {
			let getResponse = await axios({
				method: "get",
				baseURL,
				url: `/users/${user.id}`
			});

			let updatedUser = getResponse.data;
			for (let cartItem of updatedUser.cart) {
				if (cartItem[0] === id) {
					cartItem[1] = Math.max(1, cartItem[1] + change);
					setCountInCart(cartItem[1]);
					break;
				}
			}

			let patchResponse = await axios({
				method: "patch",
				baseURL,
				url: `/users/${updatedUser.id}`,
				headers: {
					"content-type": "application/json"
				},
				data: updatedUser
			});

			if (patchResponse.status === 200) {
				refreshUser();
			}
		}
	};

	const handleRemove = async () => {
		let getResponse = await axios({
			method: "get",
			baseURL,
			url: `/users/${user.id}`
		});
		const updatedUser = getResponse.data;
		updatedUser.cart = updatedUser.cart.filter((cartItem) => cartItem[0] !== id);
		let patchResponse = await axios({
			method: "patch",
			baseURL,
			url: `/users/${updatedUser.id}`,
			headers: {
				"content-type": "application/json"
			},
			data: updatedUser
		});
		refreshUser();
	};

	return (
		<Card
			height="fit-content"
			margin="50px 0"
			_hover={{ cursor: "pointer" }}
			backgroundColor="#aaddff"
		>
			<CardBody width="100%" padding="0 0 20px 0">
				<Box
					onMouseEnter={(event) => setImageIndex(1)}
					onMouseLeave={(event) => setImageIndex(0)}
					position="relative"
					top="0px"
					left="0px"
					margin="auto"
				>
					{images.map((image, index) => (
						<Image
							key={index}
							src={image}
							fallbackSrc="https://via.placeholder.com/150"
							boxSize="100%"
							onClick={() => navigate(`/product/${id}`)}
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

				<Heading fontSize="sm" marginY="10px">
					{name}
				</Heading>

				<Text>${price}</Text>

				<HStack justifyContent="center">
					<Text>Color</Text>
					<Box
						backgroundColor={color}
						width="15px"
						height="15px"
						margin="auto"
						borderRadius="100px"
					/>
				</HStack>

				<Text>{countInCart === undefined ? "New" : "Order quantity: " + countInCart}</Text>

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
