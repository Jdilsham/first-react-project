import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Header from "../components/header";

export default function HomePage() {
    return (
        <div className="w-full h-full">
            <Header/>

            <Routes path="/">
                <Route path="/" element={<h1 className="text-xl font-semibold text-gray-800">Welcome to Home Page</h1>} />
                <Route path="/products" element={<h1 className="text-xl font-semibold text-gray-800">Our Products</h1>} />
                <Route path="/about" element={<h1 className="text-xl font-semibold text-gray-800">About Us</h1>} />
                <Route path="/contact" element={<h1 className="text-xl font-semibold text-gray-800">Contact Us</h1>} /> 

                <Route path="/*" element={<h1 className="text-xl font-semibold text-gray-800">Page Not Found</h1>} />
            </Routes>
        </div>
    );
}