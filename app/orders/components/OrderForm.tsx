"use client";
import { useState, FormEvent } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaSave, FaSyncAlt, FaTimes } from "react-icons/fa";
import ProductCard from "@/components/ProductCard";
import { Order } from "@/types/order";
import { Product } from "@/types/product";
import { AxiosError } from "axios";
import { Textarea } from "@/components/Textarea";

interface OrderFormProps {
  mode?: "create" | "edit";
  id?: string;
  initialData?: Order | null;
  products?: Product[];
}

export default function OrderForm({
  mode = "create",
  id,
  initialData,
  products = [],
}: OrderFormProps) {
  const [orderDescription, setOrderDescription] = useState(
    initialData?.orderDescription || ""
  );
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>(
    initialData?.products?.map((p) => p.productId) || []
  );

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const descriptionMaxLength = 100;

  // Select/unselect Product handler
  const handleSelectProduct = (productId: number) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Form Submission handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate Inputs
    if (!orderDescription) return alert("Description required");
    if (selectedProductIds.length === 0)
      return alert("Please select at least one product");

    try {
      // Set Loading to true
      setLoading(true);

      const payload = {
        orderDescription,
        productIds: selectedProductIds,
      };

      if (mode === "create") {
        await api.post("/orders", payload);
      } else {
        await api.put(`/orders/${id}`, payload);
      }

      router.push("/orders");
    } catch (err) {
      console.error("Error saving order:", err);
      alert(
        (err as AxiosError<{ message: string }>)?.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-2 flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-800"
        >
          <FaArrowLeft />
        </button>

        <h1 className="text-2xl font-semibold">
          {mode === "create" ? "Book New Order" : "Edit Order"}
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Description */}
        <Textarea
          value={orderDescription}
          setValue={setOrderDescription}
          maxLength={descriptionMaxLength}
        />

        {/* Products */}
        <h2 className="mb-2 font-bold">Select Products: </h2>
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isSelected={selectedProductIds.includes(product.id)}
                onSelect={handleSelectProduct}
              />
            ))
          ) : (
            <span>No Products Found</span>
          )}
        </div>

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
            disabled={loading}
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
