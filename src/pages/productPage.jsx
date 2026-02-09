import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../components/loader";
import ProductCard from "../components/productCard";

export default function ProductPage(){
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        if(isLoading){
            axios.get(import.meta.env.VITE_API_URL + "/api/products")
            .then((response) => {
                setProducts(response.data);
                setIsLoading(false)
                //console.log(response.data);
            })
            .catch((error)=>{
                console.log(error);
                toast.error("Faild to load products");
            })
        }
    },[isLoading]);

    return(
        <div className="min-h-screen bg-gray-100 px-8 py-8">
            {isLoading ? (
                <Loader />
            ) : (
                <div className="
                max-w-7xl mx-auto
                grid
                grid-cols-2
                sm:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-5
                gap-8
                ">
                {products.map((item) => (
                    <ProductCard key={item.product_id} product={item} />
                    
                ))}
                </div>
            )}
        </div>
    );
}