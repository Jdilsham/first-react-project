import toast from "react-hot-toast";

export function loadCart() {

    const cartData = localStorage.getItem("cart");

    if (cartData == null || cartData === "undefined") {
        localStorage.setItem("cart", "[]");
        cartData = "[]";
    }
    
    try {
        return JSON.parse(cartData);
    } catch (error) {
        console.error("Error parsing cart data from localStorage:", error);
        return [];
    }
}

export function addToCart(product, quantity) {
    const cart = loadCart();
    const existingItemIndex = cart.findIndex((item) => {
        return item.product_id === product.product_id;
    })
    
    if (existingItemIndex !== -1) {
        
        if(quantity < 1){
            toast.error("Quantity must be at least 1");
            return;
        }

        const cartItem = {
            product_id: product.product_id,
            name: product.name,
            price: product.price,
            labeledPrice: product.labeledPrice,
            quantity: quantity,
            image: product.images?.[0] || "",
        }

        cart.push(cartItem);
    }else{
        const existingItem = cart[existingItemIndex];
        const newQuantity = existingItem.quantity + quantity;

        if(newQuantity < 1){
            cart = cart.filter((item)=>{
                return item.product_id !== product.product_id;
            })
        } else {
            cart[existingItemIndex].quantity = newQuantity;
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Product added to cart");
}


