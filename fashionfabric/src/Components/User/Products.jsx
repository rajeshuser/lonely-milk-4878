import { Box, Spinner, SimpleGrid, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { appContext } from "../Contexts/AppContext";
import { useState } from "react";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";

export default function Products() {
    const { baseURL } = useContext(appContext);
    const [requestStatus, setRequestStatus] = useState("success");
    const [products, setProducts] = useState(dummyProducts);
    const { option } = useParams();
    useEffect(() => {
        return;
        setRequestStatus("loading");
        getProducts();
        async function getProducts() {
            try {
                let response = await axios({
                    method: "get",
                    baseURL,
                    url: "/products",
                });
                setRequestStatus("success");
                setProducts(response.data);
            } catch (error) {
                setRequestStatus("error");
            }
        }
    }, []);

    if (requestStatus === "loading") {
        return <Spinner margin="100px" />;
    } else if (requestStatus === "error") {
        return <h1>Error</h1>;
    } else if (requestStatus === "success") {
        return (
            <Box>
                <Heading>{option[0].toUpperCase() + option.substring(1)}</Heading>
                <SimpleGrid minHeight="70vh" columns={4} spacing="5px" margin="10px">
                    {products.map((product) => (
                        <ProductCard {...product} />
                    ))}
                </SimpleGrid>
                <Pagination />
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
