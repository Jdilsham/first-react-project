import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import meediaUpload from "../../../utils/mediaUpload";
import toast from "react-hot-toast";
import axios from "axios";

export default function AddProduct() {
    
    const location = useLocation()

  const [productID, setProfductID] = useState(location.state.product_id);
  const [name, setName] = useState(location.state.name);
  const [altName, setAltName] = useState(location.state.alt_names.join(","));
  const [description, setDescription] = useState(location.state.description);
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState(location.state.price);
  const [labelledPrice, setLabelledPrice] = useState(location.state.labeled_price);
  const [stock, setStock] = useState(location.state.stock);
  const [category, setCategory] = useState(location.state.category);

  const navigate = useNavigate()

  async function updateProduct(){
    const token = localStorage.getItem("token");
    if(token == null){
        navigate("/");
        return
    }

    const Promises = [];

    for(let i=0; i<images.length; i++){
        Promises[i] = meediaUpload(images[i])
    }

    try{
        let urls = await Promise.all(Promises)


        if(urls == 0){
            urls = location.state.images 
        }
        const alternativeNames = altName.split(",")

        const product = {
            productID: productID,
            name: name,
            altNames: alternativeNames,
            description: description,
            images: urls,
            price: price,
            labeledPrice: labelledPrice,
            stock: stock,
            category: category
        }

        await axios.put(import.meta.env.VITE_API_URL + "/api/products/"+productID, product,{
            headers:{
                Authorization : "Bearer "+token
            }
        })

        toast.success("Success");
        navigate("/admin/products")

    }catch{
        toast.error("An error occurred");
    }


  }

  return (
    <div className="w-full flex justify-center py-12">
      <div className="w-full max-w-5xl bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-gray-200 px-10 py-8">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Update Product</h2>
          <p className="text-m text-gray-500 mt-1">
            Fill product details below
          </p>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

          {/* Product ID */}
          <div>
            <label className="label">Product ID</label>
            <input
              value={productID}
              onChange={(e) => setProfductID(e.target.value)}
              className="input"
              placeholder="eg: DS-CR-1011"
              disabled
            />
          </div>

          {/* Name */}
          <div>
            <label className="label">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              placeholder="eg: Alovera Night Cream"
            />
          </div>

          {/* Alt Name */}
          <div>
            <label className="label">Alt Name</label>
            <input
              value={altName}
              onChange={(e) => setAltName(e.target.value)}
              className="input"
              placeholder="Comma-separated; eg: night cream, beauty"
            />
          </div>

          {/* Category */}
          <div>
            <label className="label">Category</label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input"
              placeholder="eg: Beauty"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="label">Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input resize-none"
              placeholder="Description about the product"
            />
          </div>

          {/* Images */}
          <div className="md:col-span-2">
            <label className="label">Images</label>

            <input
              type="file"
              multiple
              onChange={(e) => setImages(Array.from(e.target.files))}
              className="mt-2 w-full text-sm
                file:px-4 file:py-2 file:rounded-lg
                file:border-0 file:bg-green-500 file:text-white
                hover:file:bg-green-600 cursor-pointer"
            />

            {/* Preview Grid */}
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {images.map((file, index) => {
                  const isImage = file.type.startsWith("image/");
                  return (
                    <div
                      key={index}
                      className="h-32 rounded-xl border bg-gray-50 overflow-hidden shadow-sm hover:shadow-md transition"
                    >
                      {isImage ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="h-full flex items-center justify-center text-xs text-gray-500 px-2 text-center">
                          📄 {file.name}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Price */}
                <div>
                    <label className="label">Price</label>
                    <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="input"
                    />
                </div>

                {/* Labelled Price */}
                <div>
                    <label className="label">Labelled Price</label>
                    <input
                    value={labelledPrice}
                    onChange={(e) => setLabelledPrice(e.target.value)}
                    className="input"
                    />
                </div>

                {/* Stock */}
                <div>
                    <label className="label">Stock</label>
                    <input
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="input"
                    />
                </div>

            </div>

            {/* Action Buttons */}
            <div className="md:col-span-2 mt-8 flex justify-end gap-4">

                {/* Cancel */}
                <button
                    type="button"
                    className="
                    px-6 py-2.5 rounded-lg border border-gray-300
                    text-gray-600 font-medium
                    hover:bg-gray-300 transition
                    "
                    onClick={() => {
                     navigate("/admin/products");
                    }}
                >
                    Cancel
                </button>

                {/* Submit */}
                <button
                    type="button"
                    className="
                    px-6 py-2.5 rounded-lg bg-green-500
                    text-white font-semibold
                    hover:bg-green-600 transition
                    shadow-md
                    "
                    onClick={() => {
                        updateProduct();
                    }}
                >
                    Update  Product
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}