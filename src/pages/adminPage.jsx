import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

export default function AdminPage() {
  return (
    <div className="w-full h-screen flex bg-gray-100 p-2 gap-2">

      <div className="w-[250px] h-full bg-primary/90 rounded-2xl p-4">

      </div>


      <div className="flex-1 h-full bg-secondary/70 rounded-2xl p-6">
        <Routes>
          <Route path="/" element={<h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>} />
          <Route path="products" element={<h1 className="text-xl font-semibold text-gray-800">Manage Products</h1>} />
          <Route path="orders" element={<h1 className="text-xl font-semibold text-gray-800">Manage Orders</h1>} />
        </Routes>
      </div>

    </div>
  );
}