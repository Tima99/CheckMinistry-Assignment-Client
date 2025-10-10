import OrderForm from "../components/OrderForm";

export default async function NewOrderPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_V1_BASE_URL}/products`,
    {
      cache: "force-cache", // ✅ caches the response indefinitely (or until revalidation)
      next: { revalidate: 360 },
    }
  );

  const products = await res.json();

  return <OrderForm mode="create" products={products} />;
}
