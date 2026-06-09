import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";
import ProductTabs from "../components/ProductTabs";
import BestsellerProducts from "../components/BestsellerProducts";
import BrandLogos from "../components/BrandLogos";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

function ProductDetailPage() {

    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        api
            .get(`/products/${id}`)
            .then((response) => {
                setProduct(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);
    console.log("ID:", id);
    console.log("PRODUCT:", product);
    if (!product) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <section className="mx-auto max-w-7xl p-6">
                <div className="grid gap-10 lg:grid-cols-2">
                    <ProductGallery product={product} />
                    <ProductInfo product={product} />
                </div>
            </section>
            <ProductTabs />
            <BestsellerProducts />
            <BrandLogos />
        </>
    );

}

export default ProductDetailPage;