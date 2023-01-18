import { useParams, useSearchParams } from "react-router-dom";

export default function Product() {
    const params = useParams();
    console.log(params);
    return <h1>Product</h1>;
}
