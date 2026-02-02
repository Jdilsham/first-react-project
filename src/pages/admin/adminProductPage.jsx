import axios from "axios";
import { useState } from "react";

const sampleProducts = [
  {
    id: 1,
    productID: "COS24001",
    name: "Flawless Finish Liquid Foundation - Beige",
    category: "Makeup",
    price: 2299,
    labeledPrice: 2599,
    images: ["https://example.com/foundation-beige.jpg"],
    altNames: ["Liquid Foundation", "Beige Foundation"],
    createdAt: "2026-02-01T10:30:00Z",
  },
  {
    id: 2,
    productID: "COS24002",
    name: "Velvet Matte Lipstick - Rose Red",
    category: "Makeup",
    price: 1499,
    labeledPrice: 1799,
    images: ["https://example.com/lipstick-rose.jpg"],
    altNames: ["Matte Lipstick", "Rose Lipstick"],
    createdAt: "2026-02-01T11:15:00Z",
  },
  {
    id: 3,
    productID: "COS24003",
    name: "Hydrating Face Moisturizer",
    category: "Skincare",
    price: 1999,
    labeledPrice: 2299,
    images: ["https://example.com/moisturizer.jpg"],
    altNames: ["Face Cream", "Daily Moisturizer"],
    createdAt: "2026-02-01T12:00:00Z",
  },
  {
    id: 4,
    productID: "COS24004",
    name: "Waterproof Mascara - Black",
    category: "Makeup",
    price: 1299,
    labeledPrice: 1599,
    images: ["https://example.com/mascara-black.jpg"],
    altNames: ["Black Mascara", "Waterproof Mascara"],
    createdAt: "2026-02-01T13:20:00Z",
  },
  {
    id: 5,
    productID: "COS24005",
    name: "Nourishing Hair Serum",
    category: "Hair Care",
    price: 1799,
    labeledPrice: 2099,
    images: ["https://example.com/hair-serum.jpg"],
    altNames: ["Hair Oil", "Hair Treatment"],
    createdAt: "2026-02-01T14:10:00Z",
  },
];


export default function AdminProductPage(){

    const [products, getProducts] = useState(sampleProducts);

    // axios.get(import.meta.env.VITE_API_URL + "/api/products").then(
    //     (response)=>{
    //         console.log(response.data);
    //     }
    // )

    return(

        <div className="w-full h-full">

            <table  className="w-full border">
                <thead>
                    <tr>
                        <th>
                            Image
                        </th>
                        <th>
                            Product ID
                        </th>
                        <th>
                            Product Name
                        </th>
                        <th>
                            Product Price
                        </th>
                        <th>
                            Labelled Price
                        </th>
                        <th>
                            Catagory
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item) => (
                        <tr key={item.productID}>
                            <td>
                                <img
                                src={item.images[0]}
                                className="w-16 h-16 object-cover"
                                alt={item.name}
                                />
                            </td>
                            <td>{item.productID}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.labeledPrice}</td>
                            <td>{item.category}</td>
                        </tr>
                    ))}
                    </tbody>
            </table>
        </div>
    );
}