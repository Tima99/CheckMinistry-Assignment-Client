import { Order } from "@/types/order";
import OrderForm from "../components/OrderForm";
import api from "@/lib/axios";

export default async function EditOrderPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  // Due to async nature of ssr we need to await params we access its properties
  const { id } = await params;

  // Fetch existing order server-side
  let orderData: Order | null = null;
  try {
    orderData = (await api.get(`/orders/${id}`)).data as Order;
  } catch (err) {
    console.error("Error fetching order:", err);
  }

  // Fetch products with Next fetch as for caching
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_V1_BASE_URL}/products`,
    {
      cache: "force-cache", // ✅ caches the response indefinitely (or until revalidation)
      next: { revalidate: 360 },
    }
  );

  const products = await res.json();

  return (
    <OrderForm
      mode="edit"
      initialData={orderData}
      id={id}
      products={products}
    />
  );
}
