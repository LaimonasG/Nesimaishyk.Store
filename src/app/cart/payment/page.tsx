"use client"
import { useEffect, useState } from "react";
import TerminalSelection from "./terminalSelection";
import secureLocalStorage from "react-secure-storage";
import { ShoppingCart } from "@/lib/db/cart";



export default function PaymentPage() {
  const [parsedCart, setParsedCart] = useState<ShoppingCart | null>(null);
  const [shippingCost, setShippingCost] = useState<number>();

  function onCalculateAmount(amount: number) {
    setShippingCost(amount);
  }

  useEffect(() => {
    const cartSerialized = secureLocalStorage.getItem("cartInfo");
    if (cartSerialized) {
      const parsedCartData = JSON.parse(cartSerialized.toString()) as ShoppingCart;
      console.log('Cart info get:', parsedCartData);
      setParsedCart(parsedCartData);
    }
  }, []);

  return (
    <div className="flex flex-col w-full border-opacity-50">
      <div className="divider mb-10">
        <h1 className="text-3xl font-bold" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>
          Mokėjimas
        </h1>
      </div>
      {parsedCart ? (
        <>
          <TerminalSelection onCalculateAmount={onCalculateAmount} />
          <div className="rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4">Cart Details:</h2>
            <div>
              <h3 className="text-lg font-semibold">Items:</h3>
              <ul>
                {parsedCart.items.map((item) => (
                  <li key={item.id}>
                    <div>Name: {item.product.name}</div>
                    <div>Price: ${item.product.price.toFixed(2)}</div>
                    <div>Amount: {item.quantity}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Subtotal: ${parsedCart.subtotal.toFixed(2)}</h3>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Shipping cost: ${shippingCost}</h3>
            </div>
          </div>
        </>
      ) : (
        <p>Loading cart information...</p>
      )}
    </div>
  );
}