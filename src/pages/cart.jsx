import { loadCart } from "../../utils/cart";
import {
  ShoppingCart,
  ShieldCheck,
  Truck,
  Tag,
  Trash2,
  Minus,
  Plus,
  CreditCard,
  CheckCircle2,
} from "lucide-react";

const money = (v) => `Rs. ${Number(v || 0).toLocaleString("en-LK")}`;

function toNum(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function percentOff(labeled, price) {
  const L = toNum(labeled);
  const P = toNum(price);
  if (L <= 0 || P <= 0 || L <= P) return 0;
  return Math.round(((L - P) / L) * 100);
}

export default function Cart() {
  const cart = loadCart();

  const subtotal = cart.reduce(
    (sum, it) => sum + toNum(it.price) * toNum(it.quantity),
    0
  );

  const labeledSubtotal = cart.reduce(
    (sum, it) => sum + toNum(it.labeledPrice || it.price) * toNum(it.quantity),
    0
  );
  
  const savings = Math.max(0, labeledSubtotal - subtotal);

  return (
    <div className="min-h-[calc(100vh-80px)] page-bg px-4 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl soft-border border glass shadow-sm flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-[--color-primary]" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-[--color-text]">
                Shopping Cart
              </h1>
              <p className="text-sm text-[--color-text-muted]">
                Review items and checkout securely
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Step active icon={<ShoppingCart className="h-4 w-4" />} label="Cart" />
            <Line />
            <Step icon={<CreditCard className="h-4 w-4" />} label="Checkout" />
            <Line />
            <Step icon={<CheckCircle2 className="h-4 w-4" />} label="Done" />
          </div>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="pill text-[--color-text]">
            <ShieldCheck className="h-4 w-4 text-[--color-success]" />
            Secure checkout
          </span>
          <span className="pill text-[--color-text]">
            <Truck className="h-4 w-4 text-[--color-info]" />
            Fast delivery
          </span>
          {savings > 0 && (
            <span className="pill bg-[--color-secondary] text-[--color-text] border border-[--color-success]/20">
              <Tag className="h-4 w-4 text-[--color-success]" />
              You save {money(savings)}
            </span>
          )}
        </div>

        {/* Empty */}
        {cart.length === 0 ? (
          <div className="rounded-3xl soft-border border glass shadow-[0_14px_40px_rgba(0,0,0,0.08)] p-10 text-center">
            <div className="mx-auto h-14 w-14 rounded-3xl soft-border border bg-white flex items-center justify-center">
              <ShoppingCart className="h-7 w-7 text-[--color-text-muted]" />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-[--color-text]">
              Your cart is empty
            </h2>
            <p className="mt-1 text-sm text-[--color-text-muted]">
              Add products to see them here.
            </p>
            <div className="mt-6 mx-auto max-w-sm">
              <button className="btn-primary">Browse Products</button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Items */}
            <div className="lg:col-span-8 space-y-4">
              {cart.map((item) => {
                const hasDiscount = toNum(item.labeledPrice) > toNum(item.price);
                const off = percentOff(item.labeledPrice, item.price);

                return (
                  <div
                    key={item.product_id}
                    className={[
                      "rounded-3xl soft-border border glass",
                      "shadow-[0_14px_45px_rgba(0,0,0,0.10)]",
                      "hover:shadow-[0_18px_60px_rgba(0,0,0,0.14)]",
                      "transition hover:-translate-y-[1px]",
                      "p-4 md:p-5",
                    ].join(" ")}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row">
                      {/* Image */}
                      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl soft-border border bg-gray-50">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 ring-1 ring-black/5 rounded-2xl pointer-events-none" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-base md:text-lg font-semibold text-[--color-text]">
                                {item.name}
                              </h3>

                              {hasDiscount && (
                                <span className="pill bg-[--color-secondary] border border-[--color-success]/20">
                                  <Tag className="h-4 w-4 text-[--color-success]" />
                                  {off}% OFF
                                </span>
                              )}
                            </div>

                            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
                              <span className="font-semibold text-[--color-text]">
                                {money(item.price)}
                              </span>

                              {hasDiscount && (
                                <span className="text-[--color-text-muted] line-through">
                                  {money(item.labeledPrice)}
                                </span>
                              )}

                              <span className="text-[--color-text-muted]">
                                • Qty: {item.quantity}
                              </span>
                            </div>
                          </div>

                          {/* Remove (UI only) */}
                          <button
                            type="button"
                            className="h-10 w-10 rounded-2xl soft-border border bg-white/90 hover:bg-red-50 transition focus:outline-none focus:ring-4 focus:ring-red-500/15"
                            aria-label="Remove"
                          >
                            <Trash2 className="mx-auto h-4 w-4 text-[--color-accent]" />
                          </button>
                        </div>

                        {/* Bottom */}
                        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          {/* Qty (UI only) */}
                          <div className="inline-flex items-center gap-2 rounded-2xl soft-border border bg-white/90 px-2 py-2 w-fit shadow-sm">
                            <button className="h-9 w-9 rounded-xl soft-border border hover:bg-gray-50 transition">
                              <Minus className="mx-auto h-4 w-4" />
                            </button>
                            <span className="min-w-[44px] text-center font-semibold text-[--color-text]">
                              {item.quantity}
                            </span>
                            <button className="h-9 w-9 rounded-xl soft-border border hover:bg-gray-50 transition">
                              <Plus className="mx-auto h-4 w-4" />
                            </button>
                          </div>

                          {/* Total */}
                          <div className="text-right">
                            <p className="text-xs text-[--color-text-muted]">
                              Item total
                            </p>
                            <p className="text-lg font-extrabold text-[--color-text]">
                              {money(toNum(item.price) * toNum(item.quantity))}
                            </p>
                            {hasDiscount && (
                              <p className="text-xs font-semibold text-[--color-success]">
                                You save{" "}
                                {money(
                                  (toNum(item.labeledPrice) - toNum(item.price)) *
                                    toNum(item.quantity)
                                )}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="mt-4 rounded-2xl soft-border border bg-white/70 px-4 py-3 text-xs text-[--color-text-muted]">
                          Tip: Add more items to reduce delivery cost (if applicable).
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="lg:col-span-4">
              <div className="sticky top-6 rounded-3xl soft-border border glass shadow-[0_16px_55px_rgba(0,0,0,0.12)] p-5 md:p-6">
                <h2 className="text-lg font-semibold text-[--color-text]">
                  Order Summary
                </h2>

                <div className="mt-4 space-y-3">
                  <Row label="Items" value={`${cart.length}`} />
                  <Row label="Subtotal" value={money(subtotal)} />
                  {savings > 0 && (
                    <Row label="Savings" value={`- ${money(savings)}`} highlight />
                  )}

                  <div className="my-4 h-px bg-[--color-border]" />

                  <div className="rounded-2xl soft-border border bg-white/80 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[--color-text]">
                        Total
                      </span>
                      <span className="text-2xl font-extrabold text-[--color-text]">
                        {money(subtotal)}
                      </span>
                    </div>
                    {savings > 0 && (
                      <p className="mt-1 text-xs font-semibold text-[--color-success]">
                        You’re saving {money(savings)} today.
                      </p>
                    )}
                  </div>
                </div>

                <button className="btn-primary mt-6">Proceed to Checkout</button>
                <button className="btn-soft mt-3">Continue Shopping</button>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <MiniBadge
                    icon={<ShieldCheck className="h-4 w-4 text-[--color-success]" />}
                    text="Safe Payments"
                  />
                  <MiniBadge
                    icon={<Truck className="h-4 w-4 text-[--color-info]" />}
                    text="Quick Delivery"
                  />
                </div>

                <p className="mt-4 text-xs text-center text-[--color-text-muted]">
                  Prices shown in LKR. Taxes/delivery may apply at checkout.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value, highlight }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-[--color-text-muted]">{label}</span>
      <span
        className={[
          "text-sm font-semibold",
          highlight ? "text-[--color-success]" : "text-[--color-text]",
        ].join(" ")}
      >
        {value}
      </span>
    </div>
  );
}

function MiniBadge({ icon, text }) {
  return (
    <div className="rounded-2xl soft-border border bg-white/70 px-3 py-3 flex items-center gap-2 shadow-sm">
      {icon}
      <span className="text-xs font-medium text-[--color-text]">{text}</span>
    </div>
  );
}

function Step({ active, icon, label }) {
  return (
    <div
      className={[
        "hidden sm:flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold",
        "soft-border border bg-white/75 backdrop-blur shadow-sm",
        active
          ? "border-[--color-primary]/30 text-[--color-primary]"
          : "text-[--color-text-muted]",
      ].join(" ")}
    >
      {icon}
      {label}
    </div>
  );
}

function Line() {
  return <div className="hidden sm:block h-px w-6 bg-[--color-border]" />;
}