"use client";
import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { FaSave, FaTimes } from "react-icons/fa";

export default function OrderForm({
  mode = "create",
  id,
}: {
  mode?: "create" | "edit";
  id?: string;
}) {
  const [orderDescription, setOrderDescription] = useState("");
  const router = useRouter();

  // Fetch existing order if in edit mode
  useEffect(() => {
    if (mode === "edit" && id) {
      api.get(`/orders/${id}`).then((res) => {
        setOrderDescription(res.data.orderDescription);
      });
    }
  }, [mode, id]);

  // Handle form submission for create/update
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!orderDescription.trim()) return alert("Description required");

    if (mode === "create") {
      await api.post("/orders", { orderDescription });
    } else {
      await api.put(`/orders/${id}`, { orderDescription });
    }

    router.push("/orders");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">
        {mode === "create" ? "Book New Order" : "Edit Order"}
      </h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows={3}
          className="border w-full rounded p-2 mb-4 focus:ring-2 focus:ring-violet-400 outline-none"
          placeholder="Enter order description..."
          value={orderDescription}
          onChange={(e) => setOrderDescription(e.target.value)}
        />
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push("/orders")}
            className="border px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-100"
          >
            <FaTimes /> Cancel
          </button>
          <button
            type="submit"
            className="bg-violet-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-violet-700"
          >
            <FaSave /> {mode === "create" ? "Book Order" : "Update Order"}
          </button>
        </div>
      </form>
    </div>
  );
}
