import { prisma } from "@/lib/prisma"
import { notFound, redirect } from "next/navigation"
import Image from "next/image"
import { Metadata } from "next"
import { useSession } from "next-auth/react"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import CartTable from "./cartTable"
import { setCartState } from "../cart/actions"


export default async function AdminPage() {
  "use server";

  const carts = await prisma.cart.findMany({
    orderBy: { orderState: "desc" },
    include: { items: { include: { product: true } } }
  })

  const users = await prisma.user.findMany();

  try {
    const session = await getServerSession(authOptions);

    if (session) {

      const user = await prisma.user.findFirst({ where: { id: session?.user.id } });
      if (user && user.isAdmin == "1") {
        return (
          <div className="flex flex-col w-full border-opacity-50">
            <div className="divider mb-10">
              <h1 className="text-3xl font-bold" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>
                Carts
              </h1>
            </div>
            <div className="bg-neutral rounded-lg shadow-md p-4">
              <CartTable carts={carts} users={users} setCartState={setCartState} />
            </div>
          </div>

        );
      }
    }
    return (
      <a href="/" className="link link-hover">
        Unauthorized access, back to home
      </a>
    )
  } catch (error) {
    console.error('Error:', error);
    return <div>An error occurred</div>;
  }



}