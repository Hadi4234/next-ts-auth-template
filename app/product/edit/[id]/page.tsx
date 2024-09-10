"use client";
import { useEffect, useState } from "react";
import { Field, FieldValue, useForm } from "react-hook-form";

interface FormValues {
  title: string;
}
export default function Edit({ params }: { params: { id: number } }){
  const { register, handleSubmit } = useForm<FormValues>();
  const [product, setProduct] = useState({title: ""})
  useEffect(() => {
    fetch(`https://dummyjson.com/products/${params.id}`)
    .then(res => res.json())
    .then(data => setProduct(data))
  },[params.id])
  const handleSubmitData = (data: FormValues) => {
  fetch(`https://dummyjson.com/products/${params.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
})
.then(res => res.json())
.then(console.log);
}
  return (
    <form onSubmit={handleSubmit(handleSubmitData)}>
      <input {...register("title")} placeholder="Product title" defaultValue={product.title} />
      
      <input type="submit" />
    </form>
  );
}
