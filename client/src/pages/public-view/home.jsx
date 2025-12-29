import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts } from "@/store/shop/products-slice";
import { getFeatureImages } from "@/store/common-slice";
import { useNavigate } from "react-router-dom";
import SubscribeSection from "@/components/common/SubscribeSection";
import AnnouncementPopup from "@/components/common/AnnouncementPopup";

function PublicHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ SAFE DEFAULT (prevents undefined.map crash)
  const { productList = [] } = useSelector(
    (state) => state.shopProducts || {}
  );

  const { featureImageList } = useSelector(
    (state) => state.commonFeature || {}
  );

  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  // ✅ AUTO SLIDE LOGIC (unchanged)
  useEffect(() => {
    if (!featureImageList || featureImageList.length === 0) return;

    const interval = setInterval(() => {
      setCurrentBanner((prev) =>
        prev === featureImageList.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [featureImageList]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* ✅ ADMIN BANNER CAROUSEL */}
      {featureImageList && featureImageList.length > 0 && (
        <div className="mb-12 rounded-xl overflow-hidden relative">
          <img
            src={featureImageList[currentBanner].image}
            alt="Banner"
            className="w-full h-[260px] md:h-[420px] object-cover transition-all duration-700"
          />
        </div>
      )}

      <h1 className="text-4xl font-bold mb-8">
        Welcome to Mr.Prefect Fashion Club
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Array.isArray(productList) &&
          productList.map((product) => (
            <div
              key={product._id}
              className="border p-3 cursor-pointer"
              onClick={() => navigate("/auth/login")}
            >
              <img
                src={product.image}
                className="h-48 w-full object-cover"
                alt={product.title}
              />
              <h3 className="mt-2 font-semibold">{product.title}</h3>
              <p>₹{product.price}</p>
              <p className="text-sm text-blue-600 mt-2">
                Login to Buy →
              </p>
            </div>
          ))}
      </div>

      <SubscribeSection />
      <AnnouncementPopup />
    </div>
  );
}

export default PublicHome;
