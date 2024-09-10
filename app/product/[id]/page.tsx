import React from 'react'

export default async function page({ params }: { params: { id: number } }) {
const res = await fetch(`https://dummyjson.com/products/${params.id}`,{cache:'no-store'});
const data = await res.json();


  return (
    <div>{ data.id} <br/> {data.title}</div>
  )
}
