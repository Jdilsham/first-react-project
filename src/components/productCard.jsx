import { Link } from "react-router-dom";

export default function ProductCard({product}){
  return(

    <div className="
          w-[260px]
          bg-white
          rounded-xl
          border border-gray-200
          shadow-sm
          hover:shadow-lg
          hover:scale-105
          transition
          duration-400
      ">
    
        <div className="relative w-full h-[260px] bg-gray-50 rounded-t-xl overflow-hidden">
          <img 
            src={product.images?.[0]}
            alt={product.name}
            className="w-full h-full object-cover p-1 pt-5"
          />
          
          {
            product.stock > 0 ? (
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
            ):(
              <span className="
                absolute top-3 left-3
                bg-gray-500
                text-white
                text-xs
                px-2 py-1
                rounded-md
              ">
                Out of Stock
              </span>
            )
          }
        </div>

        <div className="p-4 space-y-2">
          <h3 className="text-lg font-semibold text-text">
            {product.name}
          </h3>

          <div>
            <span className="text-lg text-primary font-semibold">
              Rs.{product.price}
            </span>
            {product.labeled_price && (
              <span className="ml-3 text-sm text-gray-400 line-through">
                Rs. {product.labeled_price}
              </span>
            )}
          </div>

          <Link to={"/overview/"+product.product_id} className="
            flex
            items-center
            justify-center
            mt-3
            w-full
            h-[40px]
            py-2
            border-2
            rounded-md
            border-primary
            text-primary
            hover:bg-primary
            hover:text-white
            transition
            duration-400
            
          " >
            View Product
          </Link>
        </div>

      </div>
  );
  
}