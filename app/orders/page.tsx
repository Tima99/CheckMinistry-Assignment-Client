"use client";
import { useEffect, useMemo, useState } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { Order } from "@/types/order";
import { FaPlus } from "react-icons/fa";
import { SearchBar } from "@/components/SearchBar";
import Table from "@/components/Table";
import { Column } from "@/types/table";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      setLoading(true); // start loading
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false); // stop loading
      setSearch("");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Edit order handler
  const handleEdit = (order: Order) => {
    router.push(`/orders/${order.id}`);
  };

  // Delete order handler
  const handleDelete = async (order: Order) => {
    if (confirm("Are you sure you want to delete this order?")) {
      try {
        setLoading(true);
        await api.delete(`/orders/${order.id}`);
        await fetchOrders();
      } catch (err) {
        console.error("Error deleting order:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Filtered orders based on search input
  const filteredOrders = useMemo(() => {
    return search.length > 0
      ? orders.filter(
          (order) =>
            order.id.toString().includes(search.toLowerCase()) ||
            order.orderDescription.toLowerCase().includes(search.toLowerCase())
        )
      : orders;
  }, [orders, search]);

  const columns: Column<Order>[] = [
    { key: "id", label: "Order ID" },
    { key: "orderDescription", label: "Order Description" },
    {
      key: "createdAt",
      label: "Created At",
      render: (value) =>
        new Date(String(value)).toLocaleString("en-IN", {
          dateStyle: "short",
          timeStyle: "short",
        }),
    },
    { key: "count", label: "Count of Products" },
  ];

  return (
    <div className="px-6 py-4">
      <h2 className="pb-4 text-xl font-bold">Orders</h2>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        {/* Search Input */}
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by ID or Description"
          resetHandler={fetchOrders}
        />

        {/* New Order Button */}
        <button
          onClick={() => router.push("/orders/new")}
          className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700"
        >
          <FaPlus /> Book Order
        </button>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-20 text-gray-500">
          Loading orders...
        </div>
      ) : (
        <Table
          columns={columns}
          data={filteredOrders}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
