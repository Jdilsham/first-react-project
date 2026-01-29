import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

export default function AdminPage() {
    return(
      <div className="w-full h-full bg-emerald-400 flex p-2">
        <div className="w-[250px] h-full bg-emerald-400">

        </div>

        <div className="w-[calc(100%-250px)] h-full bg-yellow-200 rounded-2xl">
          <Routes path="/">
            <Route path="/" element={<h1>Admin Dashboard</h1>} />
            <Route path="products" element={<h1>Manage Products</h1>} />
            <Route path="orders" element={<h1>Manage Orders</h1>} />
          </Routes>
        </div>
        
      </div>  
    );

}