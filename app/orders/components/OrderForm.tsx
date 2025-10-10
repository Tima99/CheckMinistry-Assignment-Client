"use client";
import { useState, useEffect, FormEvent } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { FaSave, FaSyncAlt, FaTimes } from "react-icons/fa";

export default function OrderForm({
  mode = "create",
  id,
  initialData,
}: {
  mode?: "create" | "edit";
  id?: string;
  initialData?: string;
}) {
  const [orderDescription, setOrderDescription] = useState(initialData || "");
  const [loading, setLoading] = useState(false); // loading state for submit

  const router = useRouter();

  // Handle form submission for create/update
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!orderDescription.trim()) return alert("Description required");

    try {
      setLoading(true);

      if (mode === "create") {
        await api.post("/orders", { orderDescription });
      } else {
        await api.put(`/orders/${id}`, { orderDescription });
      }

      router.push("/orders");
    } catch (err) {
      console.error("Error saving order:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
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
            disabled={loading} // disable button while loading
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              loading
                ? "bg-violet-400 cursor-not-allowed"
                : "bg-violet-600 hover:bg-violet-700"
            } text-white`}
          >
            {loading ? (
              <>
                <FaSyncAlt className="animate-spin" />{" "}
                {mode === "create" ? "Booking..." : "Updating..."}
              </>
            ) : (
              <>
                <FaSave /> {mode === "create" ? "Book Order" : "Update Order"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
