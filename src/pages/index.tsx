import { useEffect, useState } from "react";

async function getDate() {
  const res = await fetch(" https://books-api.nomadcoders.workers.dev/lists");
  if (!res.ok) {
    throw Error("Failed to fetch data");
  }
  return res.json();
}
// const data = getDate();
// console.log(data);
export default async function Home() {
  const [value, setValue] = useState([]);
  const data = await getDate();
  return <main>Hello</main>;
}
