import { Link } from "react-router-dom";

function PublicHeader() {
  return (
    <header className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <img
              src="/logo.png"
              alt="Mr.Prefect Logo"
              className="h-8"
            />

          <span className="font-bold text-xl">Mr.Prefect</span>
        </div>

        {/* CENTER */}
        <nav className="hidden md:flex gap-6">
          <Link to="/">Home</Link>
          {/* <Link to="/products">Products</Link>
          <Link to="/products?category=men">Men</Link>
          <Link to="/products?category=kids">Kids</Link>
          <Link to="/search">Search</Link> */}
          <Link to="/auth/login">Products</Link>
          <Link to="/auth/login">Men</Link>
          <Link to="/auth/login">Kids</Link>
          <Link to="/auth/login">Search</Link>

        </nav>

        {/* RIGHT */}
        <div className="flex gap-3">
          {/* SIGN IN */}
          <Link
            to="/auth/login"
            className="border border-black px-4 py-2 rounded font-medium hover:bg-black hover:text-white transition"
          >
            Sign In
          </Link>

          {/* SIGN UP */}
          <Link
            to="/auth/register"
            className="border border-black px-4 py-2 rounded font-medium hover:bg-black hover:text-white transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}

export default PublicHeader;
