import {
	Heading,
	Box,
	FormControl,
	FormLabel,
	Input,
	VStack,
	Text,
	Button
} from "@chakra-ui/react";
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay
} from "@chakra-ui/react";
import axios from "axios";
import { useContext } from "react";
import { useReducer } from "react";
import { appContext } from "../Contexts/AppContext";

const initialProduct = {
	id: "",
	name: "",
	price: "",
	color: "",
	category: "",
	style: "",
	size: "",
	material: "",
	gender: "",
	ageGroup: "",
	season: "",
	images: [],
	description: ""
};

function reducer(product, action = { key: null, value: null }) {
	switch (action.key) {
		case "reset":
			return { ...initialProduct };
		case "populate":
			return action.value;
		case "id":
		case "name":
		case "price":
		case "color":
		case "category":
		case "style":
		case "size":
		case "material":
		case "gender":
		case "ageGroup":
		case "season":
		case "images":
		case "deascription":
			return { ...product, [action.key]: action.value };
		default:
			return product;
	}
}

export default function CRUDOperationsBox({ flex, setRefresh, setProducts }) {
	const [product, dispatch] = useReducer(reducer, initialProduct);
	const { baseURL } = useContext(appContext);

	async function handleGetProduct() {
		let response = await axios({
			method: "get",
			baseURL,
			url: `/products/${product.id}`
		});
		dispatch({ key: "populate", value: response.data });
		setProducts([response.data]);
		alert("Product is populated");
	}

	async function handlePatchProduct() {
		const productsWithoutEmptyFields = { ...product };
		for (let key in productsWithoutEmptyFields) {
			if (!productsWithoutEmptyFields[key]) {
				delete productsWithoutEmptyFields[key];
			}
		}
		let response = await axios({
			method: "patch",
			baseURL,
			url: `/products/${product.id}`,
			headers: {
				"content-type": "application/json"
			},
			data: productsWithoutEmptyFields
		});
		alert("Product is patched");
		setRefresh({});
		dispatch({ key: "reset" });
	}

	async function handleDeleteProduct() {
		let response = await axios({
			method: "delete",
			baseURL,
			url: `/products/${product.id}`
		});
		alert("Product is deleted");
		setRefresh({});
		dispatch({ key: "reset" });
	}

	async function handleClearProduct() {
		setRefresh({});
		dispatch({ key: "reset" });
	}

	function capitalize(string) {
		return string[0].toUpperCase() + string.substring(1);
	}

	function getFormControls(product) {
		let formControls = [];
		for (let key in product) {
			formControls.push(
				<FormControl>
					<Input
						placeholder={capitalize(key)}
						type={key === "price" ? "number" : "text"}
						value={product[key]}
						onChange={(event) => {
							if (key === "images") {
								dispatch({
									key: key,
									value: event.target.value
										.split(",")
										.map((image) => image.trim())
								});
							} else {
								return dispatch({ key: key, value: event.target.value });
							}
						}}
					/>
					<If isTruthy={key === "images"}>
						<Text color="grey" textAlign="justify" fontSize="small">
							* Separate multile image links by comma
						</Text>
					</If>
				</FormControl>
			);
		}
		return formControls;
	}

	function If({ isTruthy, children }) {
		return isTruthy ? children : null;
	}

	return (
		<Box margin="0 auto auto auto" flex={flex} as={VStack} width={["80%", "50%", "30%"]}>
			<Heading fontSize="2xl">Product</Heading>
			<Text color="grey" textAlign="justify" fontSize="small">
				Note: Fields left empty will not be updated in database
			</Text>
			{getFormControls(product)}
			<Button
				color="black"
				width="100%"
				border="1px solid grey"
				_hover={{ backgroundColor: "green", color: "white" }}
				onClick={handleGetProduct}
				colorScheme="green"
			>
				Get
			</Button>
			<Button
				color="black"
				width="100%"
				border="1px solid grey"
				_hover={{ backgroundColor: "yellow", color: "black" }}
				onClick={handlePatchProduct}
				colorScheme="yellow"
			>
				Patch
			</Button>
			<Button
				color="black"
				width="100%"
				border="1px solid grey"
				_hover={{ backgroundColor: "red", color: "white" }}
				onClick={handleDeleteProduct}
				colorScheme="red"
			>
				Delete
			</Button>
			<Button color="black" width="100%" border="1px solid grey" onClick={handleClearProduct}>
				Clear
			</Button>
		</Box>
	);
}

var dummyProduct = {
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
};
