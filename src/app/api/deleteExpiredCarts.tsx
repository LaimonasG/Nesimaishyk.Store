import { prisma } from "@/lib/prisma";


const handler = async () => {

  const expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); //7 days after current time

  await prisma.cart.deleteMany({ where: { updatedAt: { gte: expiryDate } } })

}

export default handler;