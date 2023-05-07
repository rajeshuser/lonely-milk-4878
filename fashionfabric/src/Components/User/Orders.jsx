import { Heading, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { appContext } from "../Contexts/AppContext";
import ProductCard from "./ProductCard";
import Empty from "./Empty";

export default function Orders({ user }) {
	const { baseURL } = useContext(appContext);
	const [orderedProducts, setOrderedProducts] = useState([]);

	useEffect(() => {
		// return;
		getOrderedProducts();

		function formatAsQueryParams(orderedProducts) {
			// orderedProducts = [[id, quantity], ...]
			let string = "";
			let firstIsSkipped = false;
			for (let [id] of orderedProducts) {
				if (orderedProducts.length > 1 && firstIsSkipped === true) string += "&";
				string += "id=" + id;
				firstIsSkipped = true;
			}
			return string;
		}
		async function getOrderedProducts() {
			if (user.orders.length === 0) {
				setOrderedProducts([]);
				return;
			}
			let response = await axios({
				method: "get",
				baseURL,
				url: `/products?${formatAsQueryParams(user.orders)}`
			});
			
			const orderedProducts = response.data;

			const productsCount = {};
			for (let [id, quantity] of user.orders) {
				if (productsCount[id]) {
					productsCount[id] += quantity;
				} else {
					productsCount[id] = quantity;
				}
			}

			for (let orderedProduct of orderedProducts) {
				// adding the key-value "quantity:number" in each "orderedProduct"
				orderedProduct.quantity = productsCount[orderedProduct.id];
			}

			setOrderedProducts(orderedProducts);
		}
	}, []);

	return orderedProducts.length === 0 ? (
		<Empty />
	) : (
		<SimpleGrid
			minHeight="70vh"
			columns={{ base: 1, md: 2, lg: 4 }}
			spacing="5px"
			margin="10px"
		>
			{orderedProducts.map((product) => (
				<ProductCard {...product} />
			))}
		</SimpleGrid>
	);
}

var dummyOrderedProducts = [
	{
		quantity: 3,
		id: 1,
		name: "vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus",
		price: 1150,
		color: "brown",
		category: "knitwear",
		style: "cardigan",
		size: "xs",
		material: "wool",
		gender: "female",
		ageGroup: "adult",
		season: "winter",
		images: [
			"https://assets.burberry.com/is/image/Burberryltd/EC955983-5422-40AF-AE13-A5FEDBACE6D4?$BBY_V2_ML_1x1$&wid=887&hei=887",
			"https://assets.burberry.com/is/image/Burberryltd/7F53A08D-9474-42A0-A5AB-1DD2EA0BDDCD?$BBY_V2_SL_1x1$&wid=887&hei=887"
		],
		description:
			"diam vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui sapien eget mi proin sed libero enim sed faucibus"
	},
	{
		quantity: 3,
		id: 2,
		name: "vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus",
		price: 1150,
		color: "brown",
		category: "knitwear",
		style: "cardigan",
		size: "xs",
		material: "wool",
		gender: "female",
		ageGroup: "adult",
		season: "winter",
		images: [
			"https://assets.burberry.com/is/image/Burberryltd/EC955983-5422-40AF-AE13-A5FEDBACE6D4?$BBY_V2_ML_1x1$&wid=887&hei=887",
			"https://assets.burberry.com/is/image/Burberryltd/7F53A08D-9474-42A0-A5AB-1DD2EA0BDDCD?$BBY_V2_SL_1x1$&wid=887&hei=887"
		],
		description:
			"diam vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui sapien eget mi proin sed libero enim sed faucibus"
	},
	{
		quantity: 3,
		id: 3,
		name: "vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus",
		price: 1150,
		color: "brown",
		category: "knitwear",
		style: "cardigan",
		size: "xs",
		material: "wool",
		gender: "female",
		ageGroup: "adult",
		season: "winter",
		images: [
			"https://assets.burberry.com/is/image/Burberryltd/EC955983-5422-40AF-AE13-A5FEDBACE6D4?$BBY_V2_ML_1x1$&wid=887&hei=887",
			"https://assets.burberry.com/is/image/Burberryltd/7F53A08D-9474-42A0-A5AB-1DD2EA0BDDCD?$BBY_V2_SL_1x1$&wid=887&hei=887"
		],
		description:
			"diam vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui sapien eget mi proin sed libero enim sed faucibus"
	},
	{
		quantity: 3,
		id: 4,
		name: "vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus",
		price: 1150,
		color: "brown",
		category: "knitwear",
		style: "cardigan",
		size: "xs",
		material: "wool",
		gender: "female",
		ageGroup: "adult",
		season: "winter",
		images: [
			"https://assets.burberry.com/is/image/Burberryltd/EC955983-5422-40AF-AE13-A5FEDBACE6D4?$BBY_V2_ML_1x1$&wid=887&hei=887",
			"https://assets.burberry.com/is/image/Burberryltd/7F53A08D-9474-42A0-A5AB-1DD2EA0BDDCD?$BBY_V2_SL_1x1$&wid=887&hei=887"
		],
		description:
			"diam vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui sapien eget mi proin sed libero enim sed faucibus"
	},
	{
		quantity: 3,
		id: 5,
		name: "vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus",
		price: 1150,
		color: "brown",
		category: "knitwear",
		style: "cardigan",
		size: "xs",
		material: "wool",
		gender: "female",
		ageGroup: "adult",
		season: "winter",
		images: [
			"https://assets.burberry.com/is/image/Burberryltd/EC955983-5422-40AF-AE13-A5FEDBACE6D4?$BBY_V2_ML_1x1$&wid=887&hei=887",
			"https://assets.burberry.com/is/image/Burberryltd/7F53A08D-9474-42A0-A5AB-1DD2EA0BDDCD?$BBY_V2_SL_1x1$&wid=887&hei=887"
		],
		description:
			"diam vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui sapien eget mi proin sed libero enim sed faucibus"
	}
];
