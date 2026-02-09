export default function ProductCard({ product }) {
  return (
    <div className="
      w-[240px]
      bg-white
      rounded-xl
      border border-gray-200
      shadow-sm
      hover:shadow-lg
      transition
    ">

      {/* Image */}
      <div className="relative h-[220px] bg-gray-50 rounded-t-xl overflow-hidden">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-full object-contain p-4"
        />

        {product.stock > 0 && (
          <span className="
            absolute top-3 left-3
            bg-gray-500
            text-white
            text-xs
            px-2 py-1
            rounded-md
          ">
            In Stock
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
          {product.name}
        </h3>

        {/* Price */}
        <div>
          <span className="text-lg font-semibold text-primary">
            Rs. {product.price}
          </span>
          {product.labeled_price && (
            <span className="ml-2 text-sm text-gray-400 line-through">
              Rs. {product.labeled_price}
            </span>
          )}
        </div>

        {/* Button */}
       <button
            className="
                mt-3
                w-full
                py-2
                rounded-lg
                text-sm
                font-medium
                border-2
                border-primary
                text-green-600
                hover:bg-primary
                hover:text-white
                transition
                duration-200
            "
            >
            View Details
        </button>
      </div>
    </div>
  );
}