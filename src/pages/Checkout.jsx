import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadCheckoutItems, clearCheckoutItems } from "../../utils/checkout";
import { loadCart } from "../../utils/cart";
import toast from "react-hot-toast";
import { CreditCard, ShieldCheck, Truck, CheckCircle2 } from "lucide-react";

const money = (v) => `Rs. ${Number(v || 0).toLocaleString("en-LK")}`;
const toNum = (v) => (Number.isFinite(Number(v)) ? Number(v) : 0);

export default function Checkout() {
  const navigate = useNavigate();

  const [items] = useState(loadCheckoutItems());

  const subtotal = useMemo(() => {
    return items.reduce((sum, it) => sum + toNum(it.price) * toNum(it.quantity), 0);
  }, [items]);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    note: "",
    paymentMethod: "COD",
  });

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const placeOrder = () => {
    if (items.length === 0) {
      toast.error("No items to checkout");
      return;
    }
    if (!form.fullName || !form.phone || !form.address) {
      toast.error("Please fill name, phone, and address");
      return;
    }

    // TODO: call backend API here
    // await api.post("/orders", { items, ...form })

    clearCheckoutItems();
    toast.success("Order placed successfully!");
    navigate("/order-success"); // create simple page or navigate home
  };

  return (
    <div className="min-h-[calc(100vh-80px)] page-bg px-4 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl soft-border border glass shadow-sm flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-[--color-primary]" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-[--color-text]">
                Checkout
              </h1>
              <p className="text-sm text-[--color-text-muted]">
                Confirm delivery details and place your order
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold soft-border border bg-white/75 backdrop-blur shadow-sm text-[--color-text-muted]">
              Cart
            </div>
            <div className="hidden sm:block h-px w-6 bg-[--color-border]" />
            <div className="hidden sm:flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold soft-border border bg-white/75 backdrop-blur shadow-sm border-[--color-primary]/30 text-[--color-primary]">
              Checkout
            </div>
            <div className="hidden sm:block h-px w-6 bg-[--color-border]" />
            <div className="hidden sm:flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold soft-border border bg-white/75 backdrop-blur shadow-sm text-[--color-text-muted]">
              Done
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="pill text-[--color-text]">
            <ShieldCheck className="h-4 w-4 text-[--color-success]" />
            Secure checkout
          </span>
          <span className="pill text-[--color-text]">
            <Truck className="h-4 w-4 text-[--color-info]" />
            Fast delivery
          </span>
        </div>

        {items.length === 0 ? (
          <div className="rounded-3xl soft-border border glass shadow-[0_14px_40px_rgba(0,0,0,0.08)] p-10 text-center">
            <h2 className="text-lg font-semibold text-[--color-text]">
              No items for checkout
            </h2>
            <p className="mt-1 text-sm text-[--color-text-muted]">
              Go back and add products.
            </p>
            <div className="mt-6 mx-auto max-w-sm">
              <button className="btn-primary" onClick={() => navigate("/products")}>
                Browse Products
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Left: form */}
            <div className="lg:col-span-7 space-y-4">
              <div className="rounded-3xl soft-border border glass p-5 md:p-6 shadow-[0_14px_45px_rgba(0,0,0,0.10)]">
                <h2 className="text-lg font-semibold text-[--color-text]">Delivery Details</h2>

                <div className="mt-4 grid grid-cols-1 gap-4">
                  <div>
                    <label className="label">Full Name</label>
                    <input className="input" name="fullName" value={form.fullName} onChange={onChange} />
                  </div>

                  <div>
                    <label className="label">Phone Number</label>
                    <input className="input" name="phone" value={form.phone} onChange={onChange} />
                  </div>

                  <div>
                    <label className="label">Delivery Address</label>
                    <textarea className="input" rows={3} name="address" value={form.address} onChange={onChange} />
                  </div>

                  <div>
                    <label className="label">Order Note (optional)</label>
                    <input className="input" name="note" value={form.note} onChange={onChange} />
                  </div>

                  <div>
                    <label className="label">Payment Method</label>
                    <select className="input" name="paymentMethod" value={form.paymentMethod} onChange={onChange}>
                      <option value="COD">Cash on Delivery</option>
                      <option value="CARD">Card Payment</option>
                    </select>
                  </div>
                </div>
              </div>

              <button className="btn-soft" onClick={() => navigate("/cart")}>
                Back to Cart
              </button>
            </div>

            {/* Right: summary */}
            <div className="lg:col-span-5">
              <div className="sticky top-6 rounded-3xl soft-border border glass shadow-[0_16px_55px_rgba(0,0,0,0.12)] p-5 md:p-6">
                <h2 className="text-lg font-semibold text-[--color-text]">Order Summary</h2>

                <div className="mt-4 space-y-3">
                  {items.map((it) => (
                    <div key={it.product_id} className="flex items-center gap-3 rounded-2xl soft-border border bg-white/70 p-3">
                      <div className="h-12 w-12 rounded-xl overflow-hidden soft-border border bg-gray-50 shrink-0">
                        <img src={it.image} alt={it.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[--color-text]">{it.name}</p>
                        <p className="text-xs text-[--color-text-muted]">
                          {money(it.price)} • Qty {it.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-extrabold text-[--color-text]">
                        {money(toNum(it.price) * toNum(it.quantity))}
                      </p>
                    </div>
                  ))}

                  <div className="my-4 h-px bg-[--color-border]" />

                  <div className="rounded-2xl soft-border border bg-white/80 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[--color-text]">Total</span>
                      <span className="text-2xl font-extrabold text-[--color-text]">{money(subtotal)}</span>
                    </div>
                    <p className="mt-1 text-xs text-[--color-text-muted]">
                      Taxes/delivery may apply at confirmation.
                    </p>
                  </div>
                </div>

                <button className="btn-primary mt-6" onClick={placeOrder}>
                  Place Order
                </button>

                <div className="mt-5 rounded-2xl soft-border border bg-white/70 px-3 py-3 flex items-center gap-2 shadow-sm">
                  <CheckCircle2 className="h-4 w-4 text-[--color-success]" />
                  <span className="text-xs font-medium text-[--color-text]">
                    Your details are protected
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}