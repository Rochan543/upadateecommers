import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { API_URL } from "@/config/apiConfig";


function AdminUserOrders() {
  const { userId } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await axios.get(
          `${API_URL}/api/admin/users/${userId}/orders`,
          { withCredentials: true }
        );
        setOrders(res.data.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [userId]);

  if (loading) {
    return <Skeleton className="w-full h-[300px]" />;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">User Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="border rounded-lg p-4 mb-4"
        >
          <div className="flex justify-between mb-2">
            <span>
              <b>Order ID:</b> {order._id}
            </span>
            <span>
              <b>Status:</b> {order.orderStatus}
            </span>
          </div>

          <p>
            <b>Payment:</b> {order.paymentStatus}
          </p>
          <p>
            <b>Total:</b> ₹{order.totalAmount}
          </p>

          <div className="mt-4 space-y-3">
            {order.cartItems.map((item) => (
              <div
                key={item.productId}
                className="flex gap-4 items-center"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-16 w-16 object-cover rounded"
                />
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {orders.length === 0 && (
        <p className="text-gray-500">No orders found for this user</p>
      )}
    </div>
  );
}

export default AdminUserOrders;
