"use client"

import { Session } from "next-auth"
import Image from "next/image"
import setting from "@/assets/setting.png"
import { signIn, signOut } from "next-auth/react"
import { User } from "@prisma/client"
import { useRouter } from "next/navigation"


interface AdminButtonProps {
  user: User | null
}


export default function AdminButton({ user }: AdminButtonProps) {
  const router = useRouter();

  if (user && user.isAdmin == "1") {
    const handleButtonCLick = () => {
      router.push("/admin")
    }

    return (
      <div >
        <label tabIndex={0} className="btn btn-ghost btn-circle" onClick={handleButtonCLick}>
          <Image
            src={setting}
            alt="Admin"
            width={20}
            height={20}
            className="w-5 h-5 rounded-full"
          />
        </label>
      </div>
    )
  } else {
    return (<div>{user?.name} aaaaaaa</div>);
  }
}