import { Link, useNavigate } from "react-router-dom"
import { Heading, SimpleGrid, Box, Button, HStack, border, transition } from "@chakra-ui/react"
import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { appContext } from "../Contexts/AppContext"
import ProductCard from "./ProductCard"
import Empty from "./Empty"

export default function Cart() {
	const { baseURL, user } = useContext(appContext)
	const [cartProducts, setCartProducts] = useState(dummyCartProducts)
	const navigate = useNavigate()

	useEffect(() => {
		if (user === null) {
			alert("Please sign-in to see user cart")
			navigate("/account")
		}
		
		getCartProducts()

		function formatAsQueryParams(cartProducts) {
			// cartProducts = [[id, quantity], ...]
			let string = ""
			for (let [id] of cartProducts) {
				if (cartProducts.length > 1) string += "&"
				string += "id=" + id
			}
			return string
		}

		async function getCartProducts() {
			let updatedUser = (
				await axios({
					method: "get",
					baseURL,
					url: `/users/${user.id}`,
				})
			).data

			if (updatedUser.cart.length === 0) {
				setCartProducts([])
				return
			}

			let response = await axios({
				method: "get",
				baseURL,
				url: `/products?${formatAsQueryParams(updatedUser.cart)}`,
			})
			const cartProducts = response.data
			addQuantityKey(cartProducts, updatedUser)
			function addQuantityKey(cartProducts, updatedUser) {
				for (let i = 0; i < updatedUser.cart.length; i++) {
					// adding the key-value "quantity:number" in each "orderedProduct"4
					cartProducts[i].quantity = updatedUser.cart[i][1]
				}
			}

			setCartProducts([...cartProducts])
		}
	}, [])

	return (
		<Box>
			<HStack justifyContent="space-around" paddingTop="50px">
				<Heading>Your Cart</Heading>
				<Button
					margin="20px"
					backgroundColor="gold"
					// transition="color 1s ease-out"
					_hover={{
						backgroundColor: "yellow",
						border: "1px solid black",
						// position: "relative",
					}}
					onClick={() => navigate("/checkout")}
				>
					Buy Now
				</Button>
			</HStack>
			{cartProducts.length === 0 ? (
				<Empty minHeight="50vh" />
			) : (
				<SimpleGrid minHeight="70vh" columns={[1, 2, 3, 4, 4]} spacing="5px" margin="10px">
					{cartProducts.map((product) => (
						<ProductCard {...product} showCartButtons={true} />
					))}
				</SimpleGrid>
			)}
		</Box>
	)
}

var dummyCartProducts = []
