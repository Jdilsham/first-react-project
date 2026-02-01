import axios from "axios";
import { Lock, User } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try{
      const response = await axios.post(
            import.meta.env.VITE_API_URL + "/api/auth/login",
            {
              email: email,
              password: password,
            }
          );
          const user = response.data.user;
          if (user.role === "ADMIN") {
            window.location.href = "/admin";
          }else{
            window.location.href = "/";
          }
    }catch(error){
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[url('/src/assets/login-bg.jpg')] bg-cover bg-center px-6 md:px-24">
      {/* LEFT SIDE */}
      <div className="flex-1 max-w-[620px] hidden md:flex flex-col justify-center text-white pr-10">
        <h1 className="text-5xl font-extrabold leading-tight mb-6">
          Welcome Back
        </h1>
        <p className="text-lg text-white/80 max-w-md">
          Login to continue managing your services with{" "}
          <span className="font-semibold text-cyan-300">FixMate</span>.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 max-w-[460px] w-full">
        <div
          className="
            w-full p-10
            bg-white/15 backdrop-blur-2xl
            rounded-[28px]
            border border-white/30
            shadow-[0_20px_50px_rgba(0,0,0,0.4)]
          "
        >
          <h2 className="text-3xl font-bold text-white text-center mb-2">
            Login
          </h2>
          <p className="text-white/70 text-center mb-10">
            Enter your credentials to continue
          </p>

          {/* EMAIL */}
          <div className="relative mb-6">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full h-[52px] pl-12 pr-4
                bg-white/90
                rounded-xl
                outline-none
                text-gray-800
                placeholder-gray-400
                focus:ring-2 focus:ring-cyan-400
                focus:bg-white
                transition-all
              "
            />
          </div>

          {/* PASSWORD */}
          <div className="relative mb-4">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full h-[52px] pl-12 pr-4
                bg-white/90
                rounded-xl
                outline-none
                text-gray-800
                placeholder-gray-400
                focus:ring-2 focus:ring-cyan-400
                focus:bg-white
                transition-all
              "
            />
          </div>

          {/* FORGOT PASSWORD */}
          <p className="text-white/70 text-sm text-right mb-8">
            Forgot your password?
            <span className="ml-1 text-cyan-300 cursor-pointer hover:underline">
              Reset
            </span>
          </p>

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            className="
              w-full h-[52px]
              bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600
              text-white font-semibold text-lg
              rounded-xl
              shadow-xl
              hover:shadow-cyan-500/40
              hover:scale-[1.02]
              active:scale-[0.98]
              transition-all duration-300
            "
          >
            Login
          </button>

          {/* CREATE ACCOUNT */}
          <p className="text-white/70 text-sm text-center mt-6">
            Don’t have an account?
            <span className="ml-1 text-cyan-300 cursor-pointer hover:underline">
              Create
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
