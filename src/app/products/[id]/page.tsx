import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Metadata } from "next"
import PriceTag from "../../../components/priceTag"
import { cache } from "react"
import AddToCartButton from "./addToCartButton"
import { incrementProductQuantity } from "./actions"

interface ProductPageProps {
  params: {
    id: string
  }
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } })
  if (!product)
    notFound();
  return product;
})

export async function generateMetadata({ params: { id } }: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);

  return {
    title: product.name + '- nesimaishyk',
    description: product.description,
    openGraph: {
      images: [{ url: product.imageUrls[0] }]
    }
  }
}

export default async function ProductPage({ params: { id } }: ProductPageProps) {
  const product = await getProduct(id);

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
      <div className="flex flex-col">
        <div className="carousel w-[300px]">
          {product.imageUrls.map((url, index) => (
            <div key={`image-${index}`} id={`item${index}`} className="carousel-item w-full">
              <Image
                src={url}
                alt={product.name}
                width={400}
                height={400}
                className="rounded-box"
                priority
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          {product.imageUrls.map((url, index) => (
            <div key={`button-${index}`} className="flex pl-2 pt-2">
              <a href={`#item${index}`} className="btn btn-xs btn-accent">{index + 1}</a>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <PriceTag price={product.price} className="mt-4" />
        <p className="py-6">{product.description}</p>
        <AddToCartButton
          productId={product.id}
          incrementProductQuantity={incrementProductQuantity} />
      </div>

    </div>
  )
}