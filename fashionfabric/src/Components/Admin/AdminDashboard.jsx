import { Box, Heading, SimpleGrid, Stack, Button, HStack } from "@chakra-ui/react";
import ProductCard from "../User/ProductCard";
import ProductCardForAdmin from "./ProductCardForAdmin";
import Pagination from "../User/Pagination";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { appContext } from "../Contexts/AppContext";
import CRUDOperationsBox from "./CRUDOperationsBox";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
	const [products, setProducts] = useState(dummyProducts);
	const [searchParams, setSearchParams] = useSearchParams();
	const { baseURL } = useContext(appContext);
	const [refresh, setRefresh] = useState({});
	const navigate = useNavigate();

	function getQueryParams() {
		if (searchParams.toString() === "") return "";
		else return "?" + searchParams.toString();
	}

	useEffect(
		function () {
			// return;
			getProducts();
			async function getProducts() {
				let response = await axios({
					method: "get",
					baseURL,
					url: `/products${getQueryParams()}`,
				});
				setProducts(response.data);
			}
		},
		[searchParams, refresh],
	);

	function handleSearchParams({ _page, _limit }) {
		setSearchParams((searchParams) => ({ ...searchParams, _page, _limit }));
	}

	function removeAdminFromLocalStorage() {
		localStorage.removeItem("admin");
		navigate("/admin");
	}

	return (
		<Box minHeight="70vh" width="80%" margin="auto">
			<Stack direction={["column", "column", "row", "row", "row"]} alignItems="center">
				<Heading margin="10px" flex="1">
					Admin Dashboard
				</Heading>
				<Button
					as={Box}
					marginLeft="80%"
					onClick={removeAdminFromLocalStorage}
					_hover={{ cursor: "pointer" }}
					width="fit-content"
				>
					Signout
				</Button>
			</Stack>
			<Stack direction={["column", "column", "row", "row", "row"]} spacing="30px">
				<CRUDOperationsBox flex="1" setRefresh={setRefresh} />
				<SimpleGrid
					minHeight="70vh"
					flex="3"
					columns={[1, 2, 3]}
					spacing="5px"
					margin="10px"
				>
					{products.map((product) => (
						<ProductCardForAdmin {...product} />
					))}
				</SimpleGrid>
			</Stack>
			<Pagination handleSearchParams={handleSearchParams} />
		</Box>
	);
}

var dummyProducts = [
	{
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
			"https://assets.burberry.com/is/image/Burberryltd/7F53A08D-9474-42A0-A5AB-1DD2EA0BDDCD?$BBY_V2_SL_1x1$&wid=887&hei=887",
		],
		description:
			"diam vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui sapien eget mi proin sed libero enim sed faucibus",
	},
	{
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
			"https://assets.burberry.com/is/image/Burberryltd/7F53A08D-9474-42A0-A5AB-1DD2EA0BDDCD?$BBY_V2_SL_1x1$&wid=887&hei=887",
		],
		description:
			"diam vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui sapien eget mi proin sed libero enim sed faucibus",
	},
	{
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
			"https://assets.burberry.com/is/image/Burberryltd/7F53A08D-9474-42A0-A5AB-1DD2EA0BDDCD?$BBY_V2_SL_1x1$&wid=887&hei=887",
		],
		description:
			"diam vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui sapien eget mi proin sed libero enim sed faucibus",
	},
	{
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
			"https://assets.burberry.com/is/image/Burberryltd/7F53A08D-9474-42A0-A5AB-1DD2EA0BDDCD?$BBY_V2_SL_1x1$&wid=887&hei=887",
		],
		description:
			"diam vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui sapien eget mi proin sed libero enim sed faucibus",
	},
	{
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
			"https://assets.burberry.com/is/image/Burberryltd/7F53A08D-9474-42A0-A5AB-1DD2EA0BDDCD?$BBY_V2_SL_1x1$&wid=887&hei=887",
		],
		description:
			"diam vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui sapien eget mi proin sed libero enim sed faucibus",
	},
	{
		id: 6,
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
			"https://assets.burberry.com/is/image/Burberryltd/7F53A08D-9474-42A0-A5AB-1DD2EA0BDDCD?$BBY_V2_SL_1x1$&wid=887&hei=887",
		],
		description:
			"diam vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui sapien eget mi proin sed libero enim sed faucibus",
	},
	{
		id: 7,
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
			"https://assets.burberry.com/is/image/Burberryltd/7F53A08D-9474-42A0-A5AB-1DD2EA0BDDCD?$BBY_V2_SL_1x1$&wid=887&hei=887",
		],
		description:
			"diam vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui sapien eget mi proin sed libero enim sed faucibus",
	},
	{
		id: 8,
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
			"https://assets.burberry.com/is/image/Burberryltd/7F53A08D-9474-42A0-A5AB-1DD2EA0BDDCD?$BBY_V2_SL_1x1$&wid=887&hei=887",
		],
		description:
			"diam vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui sapien eget mi proin sed libero enim sed faucibus",
	},
	{
		id: 9,
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
			"https://assets.burberry.com/is/image/Burberryltd/7F53A08D-9474-42A0-A5AB-1DD2EA0BDDCD?$BBY_V2_SL_1x1$&wid=887&hei=887",
		],
		description:
			"diam vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui sapien eget mi proin sed libero enim sed faucibus",
	},
	{
		id: 10,
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
			"https://assets.burberry.com/is/image/Burberryltd/7F53A08D-9474-42A0-A5AB-1DD2EA0BDDCD?$BBY_V2_SL_1x1$&wid=887&hei=887",
		],
		description:
			"diam vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui sapien eget mi proin sed libero enim sed faucibus",
	},
	{
		id: 11,
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
			"https://assets.burberry.com/is/image/Burberryltd/7F53A08D-9474-42A0-A5AB-1DD2EA0BDDCD?$BBY_V2_SL_1x1$&wid=887&hei=887",
		],
		description:
			"diam vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui sapien eget mi proin sed libero enim sed faucibus",
	},
	{
		id: 12,
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
			"https://assets.burberry.com/is/image/Burberryltd/7F53A08D-9474-42A0-A5AB-1DD2EA0BDDCD?$BBY_V2_SL_1x1$&wid=887&hei=887",
		],
		description:
			"diam vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui sapien eget mi proin sed libero enim sed faucibus",
	},
];
