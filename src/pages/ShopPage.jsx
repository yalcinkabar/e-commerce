import { useState, useEffect } from "react";
import api from '../api/axios'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import FilterBar from "../components/FilterBar";
import ShopPagination from "../components/ShopPagination";
import BrandLogos from "../components/BrandLogos";

function ShopPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;
    const [products, setProducts] = useState([]);
    useEffect(() => {
        api
            .get("/products")
            .then((response) => {
                setProducts(response.data.products);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    const currentProducts = products.slice(
        startIndex,
        endIndex
    );
    const totalPages = Math.ceil(
        products.length / productsPerPage
    );

    const productGrid = (
        <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
            {currentProducts.map((product) => (
                <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                >
                    <ProductCard
                        image={product.images?.[0]?.url}
                        title={product.name}
                        category="Product"
                        oldPrice={product.price}
                        newPrice={product.price}
                    />
                </Link>
            ))}
        </div>

    );
    const categories = useSelector(
        (state) => state.client.categories
    );
    const topCategories = [...categories]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);

    return (
        <>
            <section className="bg-[#FAFAFA] px-6 py-10">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 lg:flex-row">
                    <h1 className="text-3xl font-bold text-[#252B42]">
                        Shop
                    </h1>

                    <div className="flex items-center gap-2 text-sm font-bold">
                        <span className="text-[#252B42]">Home</span>
                        <span className="text-[#BDBDBD]">{">"}</span>
                        <span className="text-[#BDBDBD]">Shop</span>
                    </div>
                </div>
            </section>

            <section className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 py-8 sm:grid-cols-2 lg:grid-cols-5">
                {topCategories.map((category) => (
                    <CategoryCard
                        key={category.id}
                        image={category.img}
                        title={category.title}
                        count={category.rating}
                    />
                ))}
            </section>

            <section>
                <FilterBar />
            </section>

            <section>{productGrid}</section>

            <section>
                <ShopPagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                />
            </section>

            <section>
                <BrandLogos />
            </section>
        </>
    );
}

export default ShopPage;