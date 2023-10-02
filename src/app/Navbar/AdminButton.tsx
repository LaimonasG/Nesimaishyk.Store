"use client"

import { Session } from "next-auth"
import Image from "next/image"
import setting from "@/assets/setting.png"
import { signIn, signOut } from "next-auth/react"
import { User } from "@prisma/client"


interface AdminButtonProps {
  user: User | null
}

export default function AdminButton({ user }: AdminButtonProps) {

  if (user && user.isAdmin == "1") {
    return (
      <div >
        <label tabIndex={0} className="btn btn-ghost btn-circle">
          <Image
            src={setting}
            alt="Admin"
            width={40}
            height={40}
            className="w-10 rounded-full"
          />
          <link href="/admin"></link>
        </label>
      </div>
    )
  } else {
    return (<div>{user?.name} aaaaaaa</div>);
  }
}