"use client";
import { useState } from "react";
import { Field, FieldValue, useForm } from "react-hook-form";

interface FormValues {
  title: string;
}
export default function Create(){
  const { register, handleSubmit } = useForm<FormValues>();
const handleSubmitData = (data: FormValues) => {
  fetch('https://dummyjson.com/products/add', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
.then(res => res.json())
.then(console.log);
}
  return (
    <form onSubmit={handleSubmit(handleSubmitData)}>
      <input {...register("title")} placeholder="Product title" />
      
      <input type="submit" />
    </form>
  );
}
