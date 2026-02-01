import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full h-[80px] bg-accent text-white relative">
      
      {/* Logo */}
      <div className="absolute left-10 top-0 h-full flex items-center">
        <img src="/logo.png" alt="Logo" className="h-[120px] w-auto" />
      </div>

      {/* Center Navigation */}
      <nav className="w-full h-full flex items-center justify-center gap-10 text-lg font-semibold">
        
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  );
}
