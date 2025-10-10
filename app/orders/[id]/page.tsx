import OrderForm from "../components/OrderForm";

export default function EditOrderPage({ params }: { params: { id: string } }) {
  return <OrderForm mode="edit" id={params.id} />;
}
