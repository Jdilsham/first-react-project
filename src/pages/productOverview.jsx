import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Loader from "../components/loader";


export default function ProductOverview(){
    const params = useParams();
    const [product, setProducts] = useState(null);
    const [status, setStatus] = useState("loading");
    const [activeImage, setActiveImage] = useState(0);

    useEffect(()=>{
        axios.get(import.meta.env.VITE_API_URL + "/api/products/"+params.id)
        .then((response)=>{
            setProducts(response.data)
            setStatus("success")
            toast.success("Success");
        })
        .catch((error)=>{
            console.log(error);
            toast.error("Failed to load product");
            setStatus("error")
        })

    },[])

    return(

        <div className="min-h-screen bg-gray-50 py-10 px-4">
            {status === "loading" && (
            <div className="flex justify-center items-center h-[60vh]">
                <Loader />
            </div>
            )}

            {status === "error" && (
            <div className="flex justify-center items-center h-[60vh]">
                <h1 className="text-xl text-red-500 font-semibold">
                Failed to load product details
                </h1>
            </div>
            )}
            
            {status === "success" && product && (
            <div className="min-h-screen bg-gray-50 py-10 px-4">
                <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* LEFT : IMAGE GALLERY */}
                <div>
                   {/* {/* Main Image 
                    <div className="w-full h-[420px] bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                    <img
                        src={product.images?.[activeImage]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-300"
                    />
                    </div>

                    {/* Thumbnails 
                    {product.images?.length > 1 && (
                    <div className="flex gap-3 mt-4">
                        {product.images.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveImage(index)}
                            className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition
                            ${activeImage === index ? "border-green-500" : "border-gray-200"}
                            `}
                        >
                            <img
                            src={img}
                            alt={`thumb-${index}`}
                            className="w-full h-full object-cover"
                            />
                        </button>
                        ))}
                    </div>
                    )} */}

                    {/* Main Image */}
                    <div className="w-full h-[420px] bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                        <img 
                            src={product.images?.[activeImage]}
                            alt={product.name}
                            className="w-full h-full object-cover transition-all duration-300"
                        />
                    </div>
                    
                    {/* Thumbnails */}
                    <div>
                        
                    </div>

                </div>

                {/* RIGHT : PRODUCT DETAILS */}
                <div className="flex flex-col space-y-6">

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-gray-800">
                    {product.name}
                    </h1>

                    {/* Stock */}
                    <span
                    className={`w-fit px-4 py-1 text-sm rounded-full font-medium
                        ${product.stock > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }
                    `}
                    >
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>

                    {/* Price */}
                    <div className="flex items-center gap-4">
                    <span className="text-3xl font-semibold text-green-600">
                        Rs. {product.price}
                    </span>

                    {product.labeled_price && (
                        <span className="text-lg text-gray-400 line-through">
                        Rs. {product.labeled_price}
                        </span>
                    )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed">
                    {product.description || "No description available for this product."}
                    </p>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-6 text-sm">
                    <div>
                        <p className="text-gray-500">Category</p>
                        <p className="font-medium text-gray-800">
                        {product.category || "N/A"}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-500">Stock Available</p>
                        <p className="font-medium text-gray-800">
                        {product.stock}
                        </p>
                    </div>
                    </div>

                    {/* CTA */}
                    <button
                    disabled={product.stock <= 0}
                    className={`
                        mt-6 h-[50px] rounded-xl text-white text-lg font-medium transition
                        ${product.stock > 0
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-gray-400 cursor-not-allowed"
                        }
                    `}
                    >
                    Add to Cart
                    </button>
                </div>
                </div>
            </div>
            )}
            
        </div>
    );

}