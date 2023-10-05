"use client"
import { CartWithProducts, ShoppingCart } from "@/lib/db/cart"
import { Cart, User } from "@prisma/client"
import { startTransition, useTransition } from "react"

interface CartTableProps {
  carts: CartWithProducts[],
  users: User[]
  setCartState: (cartId: string, newState: string) => Promise<void>
}

export default function CartTable({ carts, users, setCartState }: CartTableProps) {
  const stateValues = ["created", "paid", "paid confirmed", "delivered", "canceled"];

  const stateOptions = stateValues.map((state, index) => (
    <option value={state} key={index}>
      {state}
    </option>
  ));

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full mb-3 text-white">
        <thead>
          <tr>
            <th className="px-4 py-2">No.</th>
            <th className="px-4 py-2">Order No.</th>
            <th className="px-4 py-2">User</th>
            <th className="px-4 py-2">Cart Items</th>
            <th className="px-4 py-2">Total</th>
            <th className="px-4 py-2">Order state</th>
          </tr>
        </thead>
        <tbody>
          {carts.map((item, index) => (
            <tr key={item.id}>
              <td className="px-4 py-2 text-center align-middle">
                {index + 1}
              </td>
              <td className="px-4 py-2 text-center align-middle">
                {item.id}
              </td>
              <td className="px-4 py-2 text-center">
                {users.find((user) => user.id === item.userId)?.name}
              </td>
              <td className="px-4 py-2">
                <div className="relative flex justify-center items-center">
                  <details className="dropdown">
                    <summary className={`pl-5 btn btn-active btn-ghost ${item.items.length === 0 ? 'disabled' : ''}`}>
                      Item count: {item.items.reduce((acc, item) => acc + item.quantity, 0)}
                    </summary>
                    {item.items.length > 0 && (
                      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                        {item.items.map((cartItem, cartIndex) => (
                          <li key={cartItem.id}>
                            {cartItem.product.name} - ({cartItem.quantity})
                          </li>
                        ))}
                      </ul>
                    )}
                  </details>
                </div>
              </td>
              <td className="px-4 py-2 text-center">
                {item.items.reduce(
                  (acc, cartItem) =>
                    acc + cartItem.quantity * cartItem.product.price,
                  0
                )} €
              </td>
              <td className="px-4 py-2 text-center text-black">
                <div className="relative flex justify-center items-center">
                  <select
                    className="select select-bordered w-full max-w-[120px]"
                    defaultValue={item.orderState}
                    onChange={async (e) => {
                      await setCartState(item.id, e.currentTarget.value);
                    }}>
                    {stateOptions}
                  </select>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

}