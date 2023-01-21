import { Heading, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { appContext } from "../Contexts/AppContext";
import ProductCard from "./ProductCard";

export default function Favourites(user) {
    const { baseURL } = useContext(appContext);
    const [favouriteProducts, setFavouriteProducts] = useState(dummyFavouriteProducts);

    useEffect(() => {
		return;
        getFavouriteProducts();

        function formatAsQueryParams(favouriteProductsIDs) {
            let string = "";
            for (let id of favouriteProductsIDs) {
                if (favouriteProductsIDs.length > 1) string += "&";
                string += "id" + id;
            }
        }

        async function getFavouriteProducts() {
            let response = await axios({
                method: "get",
                baseURL,
                url: `/users?${formatAsQueryParams(user.favourites)}`,
            });
			setFavouriteProducts(response.data);
        }
    }, []);

    return (
        <SimpleGrid minHeight="70vh" columns={4} spacing="5px" margin="10px">
            {favouriteProducts.map((product) => (
                <ProductCard {...product} />
            ))}
        </SimpleGrid>
    );
}

var dummyFavouriteProducts = [
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
