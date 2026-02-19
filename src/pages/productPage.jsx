import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../components/loader";
import ProductCard from "../components/productCard";
import { Search, SlidersHorizontal } from "lucide-react";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      axios
        .get(import.meta.env.VITE_API_URL + "/api/products")
        .then((response) => {
          setProducts(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Failed to load products");
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen page-bg px-4 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-wide text-[--color-text-muted]">
              PRODUCTS
            </p>
            <h1 className="mt-1 text-2xl md:text-3xl font-extrabold text-[--color-text]">
              Browse Products
            </h1>
            <p className="mt-1 text-sm text-[--color-text-muted]">
              Discover the best items with clean, modern UI.
            </p>
          </div>

          {/* Search + Filter (UI only) */}
          <div className="flex w-full md:w-auto gap-2">
            <div className="flex h-12 flex-1 md:w-80 items-center gap-2 rounded-2xl border bg-white/75 px-3 glass">
              <Search className="h-5 w-5 text-[--color-text-muted]" />
              <input
                placeholder="Search products..."
                className="w-full bg-transparent text-sm outline-none text-[--color-text]"
              />
            </div>
            <button className="h-12 w-12 rounded-2xl border bg-white/75 glass hover:bg-white transition">
              <SlidersHorizontal className="mx-auto h-5 w-5 text-[--color-text]" />
            </button>
          </div>
        </div>

        {/* Body */}
        {isLoading ? (
          <div className="flex justify-center items-center h-[60vh]">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-40">
            {products.map((item) => (
              <ProductCard key={item.product_id} product={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}