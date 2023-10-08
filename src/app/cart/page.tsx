
import { ShoppingCart, getCart } from "@/lib/db/cart"
import CartEntry from "./CartEntry";
import { setProductQuantity } from "./actions";
import { formatPrice } from "@/lib/format";
import TerminalSelection from "./payment/terminalSelection";
import PaymentPage from "./payment/page";
import Link from "next/link";
import secureLocalStorage from "react-secure-storage";
import CheckoutButton from "./checkoutButton";

export const metadata = {
  title: "Your cart - Nesimaishyk"
}

export default async function CartPage() {
  const cart = await getCart();
  const serializedCart = JSON.stringify(cart)

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Shopping cart
      </h1>
      {cart?.items.map(item => (
        <CartEntry cartItem={item} key={item.productId} setProductQuantity={setProductQuantity} />
      ))}
      {!cart?.items.length && <p> Your cart is empty. </p>}
      <div className="flex flex-col items-end sm:items-center">
        <p className="mb-3 font-bold">
          Total: {formatPrice(cart?.subtotal || 0)}
        </p>
        {/* <button onClick={handleButtonClick} className="btn btn-primary sm:w-[200px]">
          Checkout
        </button> */}
        <CheckoutButton serializedCart={serializedCart} />
      </div>
    </div>
  )
}