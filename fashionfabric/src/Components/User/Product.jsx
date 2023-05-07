import { useNavigate, useParams } from "react-router-dom";
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
	Box
} from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { appContext } from "../Contexts/AppContext";
import { BiStore } from "react-icons/bi";
import { SlInfo, SlNotebook } from "react-icons/sl";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import Recommendations from "./Recommendations";

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

export default function Product() {
	// how to subscribe to browserURL
	const { id } = useParams();
	const navigate = useNavigate();
	const { baseURL, user, refreshUser } = useContext(appContext);
	const [product, setProduct] = useState(null);
	const [requestStatus, setRequestStatus] = useState("loading");
	const [imageIndex, setImageIndex] = useState(0);

	useEffect(() => {
		setRequestStatus("loading");
		getProduct();
		async function getProduct() {
			try {
				let response = await axios({
					method: "get",
					baseURL,
					url: `/products/${id}`
				});
				setRequestStatus("success");
				setProduct(response.data);
			} catch (error) {
				setRequestStatus("error");
				console.log(error);
			}
		}
	}, []);

	async function handleAddToCart() {
		if (user === null) {
			alert("Please login to add in cart");
			navigate("/account");
			return;
		}
		// cart = [[id, quantity], ...]
		let getResponse = await axios({
			method: "get",
			baseURL,
			url: `/users/${user.id}`
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
				"content-type": "application/json"
			},
			data: { cart: [...updatedUser.cart, [product.id, 1]] }
		});

		if (patchResponse.status === 200) {
			alert("Product is added to the cart");
		}
	}

	async function handleToggleFavourite() {
		// how to use make network request offline
		if (user === null) {
			alert("Please login to make favourite");
			navigate("/account");
			return;
		}

		const updatedFavourites = [...user.favourites];
		const index = updatedFavourites.findIndex((id) => id === product.id);
		if (index === -1) {
			updatedFavourites.push(product.id);
		} else {
			updatedFavourites.splice(index, 1);
		}

		let patchResponse = await axios({
			method: "patch",
			baseURL,
			url: `users/${user.id}`,
			headers: {
				"content-type": "application/json"
			},
			data: { favourites: updatedFavourites }
		});

		refreshUser();
	}

	if (requestStatus === "loading") {
		return <Spinner margin="100px" />;
	} else if (requestStatus === "error") {
		return <Heading>Something went wrong</Heading>;
	} else {
		return (
			<Box>
				<Stack direction={["column", "column", "row", "row", "row"]}>
					<Box
						onMouseEnter={(event) => setImageIndex(1)}
						onMouseLeave={(event) => setImageIndex(0)}
						position="relative"
						top="0px"
						left="0px"
						margin="0px auto"
						flex="1"
					>
						{product.images.map((image, index) => (
							<Image
								key={index}
								src={image}
								fallbackSrc="https://via.placeholder.com/150"
								opacity={index === imageIndex ? 1 : 0}
								transition="opacity 0.5s ease"
								position={index === 0 ? "relative" : "absolute"}
								top="0px"
								left="0px"
							/>
						))}
					</Box>

					<VStack
						divider={<Divider />}
						alignItems="flex-start"
						paddingLeft="20px"
						textAlign="left"
						flex="1"
					>
						<HStack divider={<StackDivider borderColor="grey" />} spacing="20px">
							<Text>{capitalize(product.gender)}</Text>
							<Text>{capitalize(product.ageGroup)}</Text>
							<Text>{capitalize(product.category)}</Text>
						</HStack>
						<Box
							alignSelf="flex-end"
							paddingRight="100px"
							_hover={{ cursor: "pointer" }}
						>
							{user && user.favourites.includes(product.id) ? (
								<MdFavorite onClick={handleToggleFavourite} />
							) : (
								<MdFavoriteBorder onClick={handleToggleFavourite} />
							)}
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
		);
	}
}
