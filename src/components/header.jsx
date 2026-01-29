export default function Header() {
  return (
    <header className="w-full h-[80px] bg-accent text-white relative">
      
      {/* Logo */}
      <div className="absolute left-10 top-0 h-full flex items-center">
        <img src="/logo.png" alt="Logo" className="h-[120px] w-auto" />
      </div>

      {/* Center Navigation */}
      <nav className="w-full h-full flex items-center justify-center gap-10 text-lg font-semibold">
        <a href="/" className="hover:underline">Home</a>
        <a href="/products" className="hover:underline">Products</a>
        <a href="/admin" className="hover:underline">Admin</a>
        <a href="/about" className="hover:underline">About</a>
        <a href="/contact" className="hover:underline">Contact</a>
      </nav>
    </header>
  );
}
