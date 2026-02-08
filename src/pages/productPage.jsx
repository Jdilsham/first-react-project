import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../components/loader";

export default function ProductPage(){
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        if(isLoading){
            axios.get(import.meta.env.VITE_API_URL + "/api/products")
            .then((response) => {
                setProducts(response.data);
                setIsLoading(false)
            })
            .catch((error)=>{
                console.log(error);
                toast.error("Faild to load products");
            })
        }
    },[isLoading]);

    return(
        <div className="w-full h-[calc(100vh-80px)]">
            {
                isLoading?<Loader/>
                :
                <div className="w-full h-full">
                    {
                        products.map((item)=>{
                            return (
                                <div>
                                    {item.product_id}
                                </div>
                            )
                        })
                            
                    }
                </div>
            }
        </div>
    );
}