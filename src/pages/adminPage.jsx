import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { BsBox2Heart } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import AdminProductPage from "./admin/adminProductPage";
import AddProduct from "./admin/adminAddNewProduct";
import UpdateProduct from "./admin/adminUpdateProduct";

export default function AdminPage() {
  return (
    <div className="w-full h-screen flex bg-gray-100 p-3 gap-3">

      {/* Sidebar */}
      <div className="w-[280px] h-full bg-gradient-to-b from-primary to-primary/80 rounded-2xl p-4 flex flex-col text-white shadow-xl">

        {/* Logo */}
        <div className="w-full flex items-center gap-3 mb-5 px-">
          <img
            src="/logo.png"
            alt="logo"
            className="w-25 h-25 object-contain"
          />
          <span className="text-xl font-bold tracking-wide">
            Admin Panel
          </span>
        </div>


        {/* Menu */}
        <div className="flex flex-col gap-2 text-[15px] font-medium">

          <Link
            to="/admin"
            className="flex items-center gap-4 px-6 py-3 rounded-xl transition-all duration-200 hover:bg-white/20"
          >
            <FaChartLine className="text-xl" />
            Dashboard
          </Link>

          <Link
            to="/admin/orders"
            className="flex items-center gap-4 px-6 py-3 rounded-xl transition-all duration-200 hover:bg-white/20"
          >
            <IoCartOutline className="text-xl" />
            Orders
          </Link>

          <Link
            to="/admin/products"
            className="flex items-center gap-4 px-6 py-3 rounded-xl transition-all duration-200 hover:bg-white/20"
          >
            <BsBox2Heart className="text-lg" />
            Products
          </Link>

          <Link
            to="/admin/users"
            className="flex items-center gap-4 px-6 py-3 rounded-xl transition-all duration-200 hover:bg-white/20"
          >
            <FiUsers className="text-lg" />
            Users
          </Link>

        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 h-full bg-secondary/70 rounded-2xl shadow-lg overflow-hidden">

        {/* Header */}
        <div className="px-6 py-4 border-b border-black/10 bg-white/60 backdrop-blur">
          <h1 className="text-2xl font-semibold text-gray-800">
            Admin Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Control and manage your application
          </p>
        </div>

        {/* Page Content */}
        <div className="w-full h-[calc(100%-88px)] overflow-y-auto p-4">
          <Routes>
            <Route
              path="/"
              element={
                <h1 className="text-xl font-semibold text-gray-800">
                  Admin Dashboard
                </h1>
              }
            />
            <Route
              path="products"
              element={
                <AdminProductPage/>
              }
            />
            <Route
              path="orders"
              element={
                <h1 className="text-xl font-semibold text-gray-800">
                  Manage Orders
                </h1>
              }
            />
            <Route
              path="users"
              element={
                <h1 className="text-xl font-semibold text-gray-800">
                  Manage Users
                </h1>
              }
            />
            <Route
              path="/add-product"
              element={
                <AddProduct/>
              }
            />
            <Route
            path="/update-product"
            element={
              <UpdateProduct/>
            }
          />
          </Routes>
        </div>

      </div>
    </div>
  );
}
