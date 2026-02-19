import toast from "react-hot-toast";

export function loadCart() {

  let cartData = localStorage.getItem("cart");

  if (!cartData || cartData === "undefined") {
    localStorage.setItem("cart", "[]");
    cartData = "[]";
  }

  try {
    return JSON.parse(cartData);
  } catch (error) {
    console.error("Error parsing cart data:", error);
    return [];
  }
}

export function addToCart(product, quantity) {

  const labeled =
  product.labeled_price ?? product.labeledPrice ?? null;

  if (quantity < 1) {
    toast.error("Quantity must be at least 1");
    return;
  }

  let cart = loadCart();

  const existingItemIndex = cart.findIndex(
    (item) => item.product_id === product.product_id
  );

  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += quantity;
  } 
  else {
    cart.push({
      product_id: product.product_id,
      name: product.name,
      price: product.price,
      labeledPrice: labeled,
      quantity: quantity,
      image: product.images?.[0] || "",
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  toast.success("Product added to cart");
}