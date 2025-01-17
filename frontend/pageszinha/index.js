import React, { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);

  console.log("Teste")

  setLoading(true);


  useEffect(() => {
    console.log("fazendo request")
    // fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setData(data);
    //     setLoading(false);
    //   });
  }, []);

//   useEffect(() => {
//     console.log("vai fazer a request")
//     fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}`)
//       .then((response) => {
//         setTestAaaa(response.json())
//         return response.json()
//       })
//       .then((data) => {
//         return setData(data)
//       })
//       .catch((err) => {
//         setTestAaaa("deu algum problema no bixo")
//         console.error(err)
//       });
//   }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Frontend em Next.js</h1>
      <p>Resposta da API: {data ? JSON.stringify(data) : "Carregando..."}</p>
    </div>
  );
}
