import { loadCart } from "./cart";

const KEY = "checkout_items";

export function startCheckoutFromCart() {
    const items = loadCart();
    localStorage.setItem(KEY, JSON.stringify(items));
}

export function startCheckoutBuyNow(product, quantity = 1) {
    const labeled =
        product.labeled_price ?? product.labeledPrice ?? null;

    const item = {
        product_id: product.product_id,
        name: product.name,
        price: product.price,
        labeledPrice: labeled,
        quantity: quantity,
        image: product.images?.[0] || "",
    };

    localStorage.setItem(KEY, JSON.stringify([item]));
}

export function loadCheckoutItems() {
    const raw = localStorage.getItem(KEY);
    if (!raw || raw === "undefined") return [];
    try {
        return JSON.parse(raw);
    } catch (err) {
        console.error("Failed to parse checkout items", err);
        return [];
    }
}

export function clearCheckoutItems() {
    localStorage.removeItem(KEY);
}