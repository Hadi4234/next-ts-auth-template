import LogOut from '@/component/LogOut'
import Products from '@/component/products'
import { ModeToggle } from '@/components/navigation/theme-button'
import { db } from '@/drizzle-ORM/db'
import { products } from '@/drizzle-ORM/schema'
import { auth, signOut } from '@/server/auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function Home() {
  const session = await auth()
  if (!session?.user) return redirect("/login")
  const product = await db.select().from(products)

  return (
    <div className=' grid grid-cols-4'>
      {/* https://hackernoon.com/how-to-build-a-shopping-cart-with-nextjs-and-zustand-state-management-with-typescript */}
      {product.map((item) => (
        <Card key={item.id}>
          <CardContent>
            <Image src={`/${item?.image}`} width={200} height={200} alt={`${item.name}`} /> <div>
              {item.name} <br /> {item.price}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button >Buy Now</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

