import { useSelector } from "react-redux";
import ShoppingProductTile from "@/components/shopping-view/product-tile";

function Favorites() {
  const { favorites } = useSelector((state) => state.favorites);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">My Favorites ❤️</h1>

      {favorites?.length === 0 ? (
        <p className="text-gray-500">No favorite products yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <ShoppingProductTile
              key={product._id}
              product={product}
              handleGetProductDetails={() => {}}
              handleAddtoCart={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
