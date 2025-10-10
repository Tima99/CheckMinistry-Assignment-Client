import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Welcome - Order Management</h1>

      <ul>
        <li>
          <Link href={"/orders"}>See Orders</Link>
        </li>
        <li>
          <Link href={"/orders/new"}>Create New Order</Link>
        </li>
      </ul>
    </div>
  );
}
