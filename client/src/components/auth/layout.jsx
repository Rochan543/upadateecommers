import { Outlet } from "react-router-dom";

const brands = [
  "/brands/brand1.jpg",
  "/brands/brand2.png",
  "/brands/brand3.jpg",
  "/brands/brand4.png",
];

function BrandTrain() {
  return (
    <div className="relative w-full overflow-hidden mt-14">
      <div className="flex w-max gap-16 animate-brand-train">
        {[...brands, ...brands].map((brand, index) => (
          <img
            key={index}
            src={brand}
            alt="Brand"
            className="h-14 opacity-80 hover:opacity-100 transition"
          />
        ))}
      </div>
    </div>
  );
}

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-[#0b0b0b] via-[#151515] to-[#050505]">

      {/* LEFT SECTION */}
      <div className="hidden lg:flex flex-col items-center justify-center w-1/2 px-12 text-white">

        {/* 🔥 DJ GLOW BOX */}
        <div className="relative p-[3px] rounded-2xl glow-rotate">
          <div className="relative z-10 rounded-2xl bg-black/90 px-12 py-14 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight">
              Welcome to
            </h1>
            <h2 className="text-5xl font-extrabold mt-3 text-[#e6c98f]">
              Mr.Prefect Fashion Club
            </h2>
            <p className="mt-5 text-gray-300">
              Premium men’s fashion. Quality you can trust.
            </p>
          </div>
        </div>

        {/* 🚆 BRAND TRAIN */}
        <BrandTrain />
      </div>

      {/* RIGHT SECTION */}
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
