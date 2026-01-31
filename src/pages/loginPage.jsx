import axios from "axios";
import { Lock, User } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {
        const response = await axios.post("https://localhost:5000/users/login", {
            email: email,
            password: password
        });
        console.log("Login response:", response.data);
    }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[url('/src/assets/login-bg.jpg')] bg-cover bg-center px-24">

        <div className="flex-1 max-w-[600px] hidden md:flex flex-col justify-center text-white">
            <h1 className="text-5xl font-bold mb-4">Welcome Back 👋</h1>
            <p className="text-lg text-white/80">
            Login to continue managing your services with FixMate.
            </p>
        </div>

        <div className="flex-1 max-w-[480px] flex justify-start">
            <div
            className="
                w-full p-10
                bg-white/20 backdrop-blur-xl
                rounded-3xl border border-white/30
                shadow-2xl
                animate-fade-in
            "
            >
          <h2 className="text-3xl font-bold text-white text-center mb-2">
            Login
          </h2>
          <p className="text-white/70 text-center mb-8">
            Enter your credentials to continue
          </p>

          <div className="relative mb-6">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Username"
                onChange={
                    (e) => setEmail(e.target.value)}
              className="
                w-full h-[50px] pl-12 pr-4
                bg-white/90
                rounded-xl
                outline-none
                focus:ring-2 focus:ring-cyan-400
                transition
              "
            />
          </div>

          <div className="relative mb-8">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="password"
              placeholder="Password"
                onChange={
                    (e) => setPassword(e.target.value)}
              className="
                w-full h-[50px] pl-12 pr-4
                bg-white/90
                rounded-xl
                outline-none
                focus:ring-2 focus:ring-cyan-400
                transition
              "
            />
          </div>

          <button
            onClick={handleLogin}
            className="
              w-full h-[50px]
              bg-gradient-to-r from-cyan-500 to-blue-600
              text-white font-semibold
              rounded-xl
              shadow-lg
              hover:scale-[1.02]
              hover:shadow-cyan-500/50
              transition-all duration-300
            "
          >
            Login
          </button>

          <p className="text-white/70 text-sm text-center mt-6">
            Forgot your password?
            <span className="ml-1 text-cyan-300 cursor-pointer hover:underline">
              Reset
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
