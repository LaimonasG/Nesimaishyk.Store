"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Session } from 'next-auth';
import Image from 'next/image';
import setting from '@/assets/setting.png';
import { signIn, signOut } from 'next-auth/react';
import { User } from '@prisma/client';
import secureLocalStorage from 'react-secure-storage';

interface CheckoutButtonProps {
  serializedCart: string;
}

export default function CheckoutButton({ serializedCart }: CheckoutButtonProps) {
  const router = useRouter();

  function handleButtonClick(cart: string) {
    secureLocalStorage.setItem('cartInfo', cart);
    console.log('Cart info set:', cart);
    router.push('/cart/payment');
  }

  return (
    <div>
      <button onClick={() => handleButtonClick(serializedCart)} className="btn btn-primary sm:w-[200px]">
        Redirect to Payment Page
      </button>
    </div>
  );
}