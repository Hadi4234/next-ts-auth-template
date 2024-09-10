interface todos{
  id:number,
  title:string,
  price:string,
}
async function loadData() {
const res = await fetch('https://dummyjson.com/products',{cache:'no-store'});
  const data:todos[] = (await res.json()).products;

  return data;
}

export default async function Products() {
  const data = await loadData();
 
  return <div>{data.map((item)=>(
    <div key={item.id}>{item.title} <br/> {item.price}</div>
  ))}</div>;
}
