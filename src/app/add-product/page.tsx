import FormSubmitButton from "@/components/formSubmitButton";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";


export const metadata = {
  title: "Add product - Nesimaishyk"
}

async function addProduct(formData: FormData) {
  "use server";

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageURL")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price)
    throw Error("Missing required fields!")

  await prisma.product.create({
    data: { name, description, imageUrl, price }
  })

  redirect("/")
}

export default async function AddProductPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }

  return (
    <div>
      <h1 className="text-lg mb-3 font-bold">Add product</h1>
      <form action={addProduct}>
        <input
          required
          name="name"
          placeholder="Name"
          className="mb-3 w-full input input-bordered" />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="mb-3 w-full textarea textarea-bordered" />
        <input
          required
          name="imageURL"
          placeholder="Image URL"
          type='url'
          className="mb-3 w-full input input-bordered" />
        <input
          required
          name="price"
          placeholder="Price"
          type='number'
          className="mb-3 w-full input input-bordered" />
        <FormSubmitButton className="btn-block">Add product</FormSubmitButton>
      </form>
    </div>
  )
}