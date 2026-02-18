import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Loader from "../components/loader";

const money = (v) => `Rs. ${Number(v || 0).toLocaleString("en-LK")}`;

export default function ProductOverview() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setStatus("loading");
    setProduct(null);
    setActiveImage(0);

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/products/${params.id}`)
      .then((res) => {
        setProduct(res.data);
        setStatus("success");
        toast.success("Loaded");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to load product");
        setStatus("error");
      });
  }, [params.id]);

  const images = useMemo(() => product?.images || [], [product]);
  const mainImage = images?.[activeImage] || images?.[0] || "";

  return (
  <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--color-secondary)/55,_#ffffff_55%)]">
    <div className="mx-auto max-w-7xl px-4 py-10">
      {/* Loading */}
      {status === "loading" && (
        <div className="flex justify-center items-center h-[60vh]">
          <Loader />
        </div>
      )}

      {/* Error */}
      {status === "error" && (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="rounded-3xl border bg-white/80 backdrop-blur p-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)] text-center">
            <h1 className="text-xl font-semibold text-[--color-accent]">
              Failed to load product details
            </h1>
            <p className="mt-2 text-sm text-[--color-text-muted]">
              Please refresh and try again.
            </p>
          </div>
        </div>
      )}

      {/* Success */}
      {status === "success" && product && (
        <>
          {/* Top header row */}
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[--color-text-muted]">
                PRODUCTS / DETAILS
              </p>
              <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[--color-text]">
                {product.name}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span
                className={[
                  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
                  "border bg-white/70 backdrop-blur",
                  product.stock > 0
                    ? "border-[--color-primary]/30 text-[--color-primary]"
                    : "border-[--color-accent]/30 text-[--color-accent]",
                ].join(" ")}
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>

              <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border bg-white/70 backdrop-blur text-[--color-text] border-gray-200">
                {product.category || "Uncategorized"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* LEFT: Gallery */}
            <div className="lg:col-span-7">
              <div className="rounded-[28px] border bg-white/70 backdrop-blur overflow-hidden shadow-[0_14px_45px_rgba(0,0,0,0.10)]">
                {/* Main image */}
                <div className="relative aspect-[16/11] bg-gradient-to-br from-white to-gray-50">
                  {/* floating meta */}
                  <div className="absolute left-5 top-5 flex items-center gap-2">
                    <span className="rounded-full border bg-white/80 px-3 py-1 text-xs font-semibold text-[--color-text] backdrop-blur">
                      {product.images?.length || 0} Photos
                    </span>
                    <span className="rounded-full border bg-white/80 px-3 py-1 text-xs font-semibold text-[--color-text] backdrop-blur">
                      Stock: {product.stock ?? 0}
                    </span>
                  </div>

                  <img
                    src={product.images?.[activeImage]}
                    alt={product.name}
                    className="h-full w-full object-contain p-6 sm:p-10"
                    draggable="false"
                  />

                  {/* soft vignette */}
                  <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_center,black,transparent_70%)] bg-black/10" />
                </div>

                {/* Thumbnails */}
                {product.images?.length > 1 && (
                  <div className="border-t bg-white/60 p-4">
                    <div className="flex gap-3 overflow-x-auto pb-1">
                      {product.images.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveImage(index)}
                          className={[
                            "group shrink-0 rounded-2xl p-1 transition",
                            "border bg-white/70 backdrop-blur",
                            "hover:shadow-md",
                            activeImage === index
                              ? "border-[--color-primary] ring-2 ring-[--color-primary]/25"
                              : "border-gray-200",
                          ].join(" ")}
                          aria-label={`Select image ${index + 1}`}
                        >
                          <img
                            src={img}
                            alt={`thumb-${index}`}
                            className="h-20 w-20 rounded-xl object-cover"
                            draggable="false"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modern feature pills */}
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border bg-white/70 backdrop-blur px-3 py-2 text-xs font-semibold text-[--color-text] border-gray-200">
                  Secure payments
                </span>
                <span className="rounded-full border bg-white/70 backdrop-blur px-3 py-2 text-xs font-semibold text-[--color-text] border-gray-200">
                  Fast delivery
                </span>
                <span className="rounded-full border bg-white/70 backdrop-blur px-3 py-2 text-xs font-semibold text-[--color-text] border-gray-200">
                  Easy returns
                </span>
              </div>
            </div>

            {/* RIGHT: Details */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-6 rounded-[28px] border bg-white/75 backdrop-blur p-6 sm:p-7 shadow-[0_14px_45px_rgba(0,0,0,0.10)]">
                {/* Price */}
                <div className="rounded-2xl border bg-gradient-to-br from-white to-gray-50 p-5">
                  <p className="text-xs font-semibold text-[--color-text-muted]">
                    Price
                  </p>

                  <div className="mt-2 flex items-end justify-between gap-3">
                    <div className="text-3xl font-extrabold text-[--color-text]">
                      Rs. {Number(product.price || 0).toLocaleString("en-LK")}
                    </div>

                    {product.labeled_price ? (
                      <div className="text-right">
                        <p className="text-[11px] font-semibold text-[--color-text-muted]">
                          Old price
                        </p>
                        <p className="text-sm text-gray-400 line-through">
                          Rs.{" "}
                          {Number(product.labeled_price || 0).toLocaleString(
                            "en-LK"
                          )}
                        </p>
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-3 text-xs text-[--color-text-muted]">
                    Stock Available:{" "}
                    <span className="font-semibold text-[--color-text]">
                      {product.stock ?? 0}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-5">
                  <p className="text-sm leading-relaxed text-[--color-text-muted]">
                    {product.description ||
                      "No description available for this product."}
                  </p>
                </div>

                {/* Info cards */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border bg-white/70 p-4">
                    <p className="text-[11px] font-semibold text-[--color-text-muted]">
                      Category
                    </p>
                    <p className="mt-1 font-semibold text-[--color-text]">
                      {product.category || "N/A"}
                    </p>
                  </div>
                  <div className="rounded-2xl border bg-white/70 p-4">
                    <p className="text-[11px] font-semibold text-[--color-text-muted]">
                      Availability
                    </p>
                    <p className="mt-1 font-semibold text-[--color-text]">
                      {product.stock > 0 ? "Ready to ship" : "Not available"}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-7 space-y-3">
                  {/* Buy Now - modern gradient */}
                    <button
                    disabled={product.stock <= 0}
                    className={[
                        "h-12 w-full rounded-2xl text-white font-semibold transition-all duration-200",
                        "focus:outline-none focus:ring-4 focus:ring-green-500/30",
                        product.stock > 0
                        ? "bg-green-500 hover:bg-green-600 active:scale-[0.98] shadow-sm hover:shadow-md"
                        : "bg-gray-300 cursor-not-allowed shadow-none",
                    ].join(" ")}
                    >
                    Buy Now
                    </button>

                    <button
                    disabled={product.stock <= 0}
                    className={[
                        "h-12 w-full rounded-2xl font-semibold transition-all duration-200",
                        "focus:outline-none focus:ring-4 focus:ring-yellow-400/30",
                        product.stock > 0
                        ? "bg-yellow-300 text-gray-800 hover:bg-yellow-400 active:scale-[0.98] shadow-sm hover:shadow-md"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none",
                    ].join(" ")}
                    >
                    Add to Cart
                    </button>

                  <div className="pt-2 text-center text-xs text-[--color-text-muted]">
                    Secure checkout • Fast delivery • Easy returns
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  </div>
);
}