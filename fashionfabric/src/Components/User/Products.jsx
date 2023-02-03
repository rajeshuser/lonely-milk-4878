import { Box, Spinner, SimpleGrid, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { appContext } from "../Contexts/AppContext";
import { useState } from "react";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import FilterSortSearch from "./FilterSortSearch";

export default function Products() {
	const { baseURL } = useContext(appContext);
	const [requestStatus, setRequestStatus] = useState("success");
	const [products, setProducts] = useState(dummyProducts);
	const { option } = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	const [totalCount, setTotalCount] = useState(25);

	const activePage = searchParams.get("_page") === null ? 1 : +searchParams.get("_page");
	const pageLimit = 5
	const handleSearchParams = (updatedSearchParams) => {
		// let newSearchParams = {};
		// for (let [param, value] of searchParams) {
		//     newSearchParams = { ...newSearchParams, [param]: value };
		// }
		let newSearchParams = { ...searchParams, ...updatedSearchParams };
		setSearchParams(newSearchParams);
	};

	useEffect(() => {
		// return;
		setRequestStatus("loading");
		getProducts();
		async function getProducts() {
			try {
				let response = await axios({
					method: "get",
					baseURL,
					url: `/products?${searchParams.toString()}&_limit=${pageLimit}`,
				});
				setRequestStatus("success");
				setProducts(response.data);
				setTotalCount(+response.headers["x-total-count"]);
			} catch (error) {
				setRequestStatus("error");
			}
		}
	}, [searchParams]);

	if (requestStatus === "loading") {
		return <Spinner margin="100px" />;
	} else if (requestStatus === "error") {
		return <h1>Error</h1>;
	} else if (requestStatus === "success") {
		return (
			<Box>
				<Heading margin="20px">{option[0].toUpperCase() + option.substring(1)}</Heading>
				<FilterSortSearch handleSearchParams={handleSearchParams} />
				{products.length === 0 ? (
					<Heading minHeight="50vh" paddingTop="25vh">
						Nothing is there on the page
					</Heading>
				) : (
					<SimpleGrid
						minHeight="70vh"
						columns={[1, 2, 3, 4, 4]}
						spacing="5px"
						margin="10px"
					>
						{products.map((product) => (
							<ProductCard {...product} />
						))}
					</SimpleGrid>
				)}
				<Pagination active={activePage} limit={pageLimit} total={totalCount} handleSearchParams={handleSearchParams} />
			</Box>
		);
	}
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
