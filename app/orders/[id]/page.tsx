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
  let orderData = null;
  try {
    orderData = (await api.get(`/orders/${id}`)).data as Order;
  } catch (err) {
    console.error("Error fetching order:", err);
  }

  return (
    <OrderForm mode="edit" initialData={orderData?.orderDescription} id={id} />
  );
}
