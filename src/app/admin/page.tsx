import { prisma } from "@/lib/prisma"
import { notFound, redirect } from "next/navigation"
import Image from "next/image"
import { Metadata } from "next"
import { useSession } from "next-auth/react"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"

interface AdminPageProps {
  params: {
    id: string
  }
}

export default async function AdminPage({ params: { id } }: AdminPageProps) {
  "use server";

  try {
    const session = await getServerSession(authOptions);

    if (session) {

      const user = await prisma.user.findFirst({ where: { id: session?.user.id } });
      if (user && user.isAdmin == "1") {
        return (
          <div>
            paejogggggggggggg
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