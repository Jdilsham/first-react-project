import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { CiCirclePlus } from "react-icons/ci";

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

    useEffect(() => {
        axios
        .get(import.meta.env.VITE_API_URL + "/api/products")
        .then((response) => {
            setProducts(response.data);
        })
        .catch((error)=>{
            console.log(error);
        });
    }, []);

  return (
    <div className="w-full h-full p-6 bg-[color:var(--color-secondary)]">
        <Link to="/admin/add-product" className="fixed right-[50px] bottom-[50px] text-5xl hover:text-[color:var(--color-primary)]">
            <CiCirclePlus />
        </Link>

        <div className="bg-[color:var(--color-card)] rounded-xl shadow-lg overflow-hidden border border-[color:var(--color-border)]">

            <table className="w-full text-sm text-left text-[color:var(--color-text)]">

            {/* TABLE HEADER */}
            <thead className="bg-gray-300 text-[color:var(--color-text-muted)] uppercase text-xs tracking-wider">
                <tr>
                    <th className="px-6 py-4">Image</th>
                    <th className="px-6 py-4">Product ID</th>
                    <th className="px-6 py-4">Product Name</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Labelled Price</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4">Actions</th>
                </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody className="divide-y divide-[color:var(--color-border)]">
                {products.map((item) => (
                <tr
                    key={item.product_id}
                    className="hover:bg-[color:var(--color-row-hover)] transition"
                >
                    {/* Image */}
                    <td className="px-6 py-4">
                    <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-14 h-14 rounded-lg object-cover border border-[color:var(--color-border)]"
                    />
                    </td>

                    {/* Product ID */}
                    <td className="px-6 py-4 font-medium">
                    {item.product_id}
                    </td>

                    {/* Name */}
                    <td className="px-6 py-4">
                    {item.name}
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4 font-semibold text-[color:var(--color-success)]">
                    Rs. {item.price}
                    </td>

                    {/* Labelled Price */}
                    <td className="px-6 py-4 text-[color:var(--color-text-muted)] line-through">
                    Rs. {item.labeled_price}
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4">
                    <span
                        className="px-3 py-1 text-xs font-semibold rounded-full
                        bg-[color:var(--color-info-bg)] text-[color:var(--color-info-text)]"
                    >
                        {item.category}
                    </span>
                    </td>

                    {/* stock */}
                    <td className="px-6 py-4">
                    <span
                        className="px-3 py-1 text-xs font-semibold rounded-full
                        bg-[color:var(--color-info-bg)] text-[color:var(--color-info-text)]"
                    >
                        {item.stock}
                    </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                    <div className="flex gap-5">
                        <button>
                        <AiOutlineDelete
                            className="text-[22px] text-[color:var(--color-text-muted)]
                            hover:text-[color:var(--color-accent)] transition"
                        />
                        </button>

                        <button onClick={()=>navigate("/admin/update-product",{
                            state : item
                        })}>
                        <FiEdit
                            className="text-[20px] text-[color:var(--color-text-muted)]
                            hover:text-[color:var(--color-primary)] transition"
                        />
                        </button>
                    </div>
                    </td>
                </tr>
                ))}
            </tbody>

            </table>
          
        </div>
    </div>
  );
}
