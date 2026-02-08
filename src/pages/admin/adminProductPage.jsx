import axios from "axios";
import { use, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { CiCirclePlus } from "react-icons/ci";
import toast from "react-hot-toast";
import LoaderRound from "../../components/loader.jsx";


function ProductDeleteConfirm(props) {
  const productid = props.product_id;
  const close = props.close;
  const refresh = props.refresh;

    async function deleteProduct(){
        try{
            const token = localStorage.getItem("token");

            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/${productid}`,{
                headers: {
                    Authorization : "Bearer "+token
                }
            });
            console.log(response.data);
            toast.success("Product deleted successfully");
            close();
            refresh();

        }catch(error){
            console.error(error);
            toast.error("Failed to delete product");
        }
    }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="w-[500px] rounded-2xl bg-white shadow-2xl p-8 relative animate-fadeIn">
        
        {/* Close button */}
        <button
          onClick={close}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-red-500 text-white font-bold flex items-center justify-center hover:bg-red-600 transition"
        >
          ✕
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-3xl">
            🗑️
          </div>
        </div>

        {/* Text */}
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">
          Delete Product
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Are you sure you want to delete this product? ID: {productid}
          <br />This action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-6">
          <button
            onClick={close}
            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition shadow-md"
            onClick={deleteProduct}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminProductPage() {

  const [products, setProducts] = useState([]);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [deleteProduct, setProductsToDelete] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

    useEffect(() => {
        if(isLoading){
            axios
            .get(import.meta.env.VITE_API_URL + "/api/products")
            .then((response) => {
                setProducts(response.data);
                setIsLoading(false)
            })
            
            .catch((error)=>{
                console.log(error);
            });
        }
        
    }, [isLoading]);

  return (
    <div className="w-full h-full p-6 bg-[color:var(--color-secondary)]">
        {
            isDeleteConfirmVisible && <ProductDeleteConfirm product_id={deleteProduct} refresh={()=>{setIsLoading(true)}} close={()=>{setIsDeleteConfirmVisible(false)}}/>
        }
        <Link to="/admin/add-product" className="fixed right-[50px] bottom-[50px] text-5xl hover:text-[color:var(--color-primary)]">
            <CiCirclePlus />
        </Link>

        <div className="bg-[color:var(--color-card)] rounded-xl shadow-lg overflow-hidden border border-[color:var(--color-border)]">

            {isLoading?<LoaderRound/>:<table className="w-full text-sm text-left text-[color:var(--color-text)]">

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
                        <button 
                            onClick={()=>{
                               setProductsToDelete(item.product_id)
                               setIsDeleteConfirmVisible(true)
                            }}
                        >
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

            </table>}
          
        </div>
    </div>
  );
}
