import { Spinner, Heading, Box, SimpleGrid } from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { appContext } from "../Contexts/AppContext";
import ProductCard from "./ProductCard";

export default function Recommendations() {
	const [recommendations, setRecommendations] = useState([]);
	const { baseURL } = useContext(appContext);
	const [requestStatus, setRequestStatus] = useState("success");

	useEffect(() => {
		setRequestStatus("loading");
		getRecommendations();
		async function getRecommendations() {
			try {
				const response = await axios({
					method: "get",
					baseURL,
					url: "/products?id=1&id=2&id=3&id=4"
				});
				setRecommendations(response.data);
				setRequestStatus("success");
			} catch (error) {
				console.log(error);
				setRequestStatus("error");
			}
		}
	}, []);

	if (requestStatus === "loading") {
		return <Spinner margin="100px" />;
	} else if (requestStatus === "error") {
		return <Heading>Something went wrong</Heading>;
	} else {
		return (
			<Box margin="100px">
				<Heading>Recommendations</Heading>
				<SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="20px" margin="auto">
					{recommendations.map((product) => (
						<ProductCard {...product} />
					))}
				</SimpleGrid>
			</Box>
		);
	}
}
