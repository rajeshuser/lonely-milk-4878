import {
	Heading,
	Stack,
	Box,
	HStack,
	ListItem,
	OrderedList,
	Text,
	VStack,
	Divider,
	Button
} from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input } from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
import { appContext } from "../Contexts/AppContext";
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function cartBill(cartProducts) {
	let bill = 0;
	for (let product of cartProducts) {
		bill += +product.price * product.quantity;
	}
	return bill;
}

function DebitCard() {
	const cardHolderNameRef = useRef();
	const cardNumberRef = useRef();
	const cardExpirydateRef = useRef();
	const navigate = useNavigate();
	const { user, baseURL, refreshUser } = useContext(appContext);

	function isCardDetailsValid() {
		if (cardHolderNameRef.current.value === "") {
			alert("Please enter the card holder name");
			return false;
		}
		if (cardNumberRef.current.value.length !== 12) {
			alert("The card number should be of 12 digits");
			return false;
		}
		if (cardExpirydateRef.current.value === "") {
			alert("Please select the expiry date");
			return false;
		}
		return true;
	}

	function handleCardNumber() {
		if (cardNumberRef.current.value.length > 12) {
			cardNumberRef.current.value = cardNumberRef.current.value.substring(0, 12);
		}
	}

	function makePayment() {
		if (isCardDetailsValid() === false) {
			return;
		}
		alert("Payment succeessful");
		moveCartItemsToOrdersItems();
		navigate("/");
	}

	async function moveCartItemsToOrdersItems() {
		let getResponse = await axios({ method: "get", baseURL, url: `/users/${user.id}` });
		let updatedUser = getResponse.data;
		updatedUser.orders = [...updatedUser.orders, ...updatedUser.cart];
		updatedUser.cart = [];
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
	}

	return (
		<VStack>
			<Heading fontSize="xl">Debit Card</Heading>
			<FormControl>
				<FormLabel>Name on card</FormLabel>
				<Input type="text" ref={cardHolderNameRef} />
			</FormControl>
			<FormControl>
				<FormLabel>Card number</FormLabel>
				<Input type="number" ref={cardNumberRef} onChange={handleCardNumber} />
			</FormControl>
			<FormControl>
				<FormLabel>Valid through</FormLabel>
				<Input type="month" min={getCurrentDate()} ref={cardExpirydateRef} />
			</FormControl>
			<Button
				backgroundColor="gold"
				fontWeight="bold"
				_hover={{ backgroundColor: "yellow", border: "2px solid black" }}
				onClick={makePayment}
			>
				Purchase Now
			</Button>
		</VStack>
	);
}

function getCurrentDate() {
	const currentDate = new Date();
	const year = String(currentDate.getFullYear());
	const month = String(currentDate.getMonth() + 1).padStart(2, "0");
	const formatedDate = `${year}-${month}`;
	return formatedDate;
}

export default function Checkout() {
	const [cartProducts, setCartProducts] = useState([]);
	const { user, baseURL } = useContext(appContext);

	function capitalize(string) {
		return string[0].toUpperCase() + string.substring(1);
	}

	useEffect(() => {
		getCartProductsOfUser();

		function formatAsQueryParams(cartProducts) {
			// cartProducts = [[id, quantity], ...]
			let string = "";
			for (let [id] of cartProducts) {
				if (cartProducts.length > 1) string += "&";
				string += "id=" + id;
			}
			return string;
		}

		async function getCartProductsOfUser() {
			let usersResponse = await axios({
				method: "get",
				baseURL,
				url: `/users/${user.id}`
			});
			let updatedUser = usersResponse.data;
			let productsResponse = await axios({
				method: "get",
				baseURL,
				url: `/products?${formatAsQueryParams(updatedUser.cart)}`
			});
			let cartProducts = productsResponse.data;
			addQuantityKey(cartProducts, updatedUser);
			function addQuantityKey(cartProducts, updatedUser) {
				for (let i = 0; i < updatedUser.cart.length; i++) {
					// adding the key-value "quantity:number" in each "orderedProduct"
					cartProducts[i].quantity = updatedUser.cart[i][1];
				}
			}
			setCartProducts(cartProducts);
		}
	}, []);

	return (
		<Box margin="20px">
			<Heading margin="20px">Checkout</Heading>
			<Stack
				direction={["column", "column", "row", "row", "row"]}
				justifyContent="space-around"
				width="90%"
				margin="auto"
				spacing="50px"
			>
				<VStack
					spacing="20px"
					border="1px solid black"
					borderRadius="20px"
					padding="10px"
					width="100%"
					alignItems="stretch"
				>
					<Heading fontSize="20px">Your orders</Heading>
					<OrderedList divider={<Divider />}>
						{cartProducts.map((product) => (
							<ListItem
								key={product.id}
								fontSize="lg"
								as={HStack}
								justifyContent="space-between"
								margin="10px 0"
								borderBottom="1px solid grey"
								padding="10px 0"
							>
								<Text fontWeight="bold" width="50%" textAlign="left">
									{capitalize(product.name).substring(0, 15)}
								</Text>
								<Text
									width="30px"
									backgroundColor="#00aaff"
									color="white"
									fontWeight="bold"
									borderRadius="10px"
								>
									{product.quantity}
								</Text>
								<Text>${+product.price}</Text>
								<Text>${product.quantity * +product.price}</Text>
							</ListItem>
						))}
					</OrderedList>
					<Box fontWeight="bold">
						<HStack justifyContent="space-between">
							<Text>Cart Total</Text>
							<Text>${cartBill(cartProducts)}</Text>
						</HStack>
						<HStack justifyContent="space-between">
							<Text>Shipping Charges</Text>
							<Text>$10</Text>
						</HStack>
						<HStack justifyContent="space-between">
							<Text>Gross Total</Text>
							<Text>${cartBill(cartProducts) + 10}</Text>
						</HStack>
					</Box>
				</VStack>
				<VStack
					width="100%"
					spacing="20px"
					border="1px solid black"
					borderRadius="20px"
					padding="10px"
					alignItems="stretch"
				>
					<Heading fontSize="20px">Card details</Heading>
					<HStack justifyContent="space-around">
						<Box fontWeight="bold">Address: {user.address}</Box>
						<Box fontWeight="bold">Phone: {user.phone}</Box>
					</HStack>
					<DebitCard />
				</VStack>
			</Stack>
		</Box>
	);
}
