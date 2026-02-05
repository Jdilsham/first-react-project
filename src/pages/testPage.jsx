import { Pencil } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold mb-6">My Profile</h1>

      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow p-6 flex items-center gap-6 mb-6">
        <img
          src="https://i.pravatar.cc/150?img=3"
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover"
        />

        <div>
          <h2 className="text-lg font-semibold">Natashia Khaleira</h2>
          <p className="text-sm text-gray-500">Admin</p>
          <p className="text-sm text-gray-400">Leeds, United Kingdom</p>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Personal Information</h3>
          <button className="flex items-center gap-2 text-sm bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
            <Pencil size={16} />
            Edit
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <Info label="First Name" value="Natashia" />
          <Info label="Last Name" value="Khaleira" />
          <Info label="Date of Birth" value="12-10-1990" />

          <Info label="Email Address" value="info@binary-fusion.com" />
          <Info label="Phone Number" value="(+62) 821 2554-5846" />
          <Info label="User Role" value="Admin" />
        </div>
      </div>

      {/* Address */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Address</h3>
          <button className="flex items-center gap-2 text-sm border px-4 py-2 rounded-md hover:bg-gray-100">
            <Pencil size={16} />
            Edit
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <Info label="Country" value="United Kingdom" />
          <Info label="City" value="Leeds, East London" />
          <Info label="Postal Code" value="ERT 1254" />
        </div>
      </div>
    </div>
  );
}

/* Reusable Info Component */
function Info({ label, value }) {
  return (
    <div>
      <p className="text-gray-400 mb-1">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  );
}