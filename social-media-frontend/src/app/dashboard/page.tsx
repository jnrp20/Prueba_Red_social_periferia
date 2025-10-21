"use client";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { getContents } from "@/services/api";
import ContentCard from "@/components/ContentCard";
import Navbar from "@/components/navbar";
import Link from "next/link";


interface Content {
  id: number;
  mensaje: string;
  user?: { alias: string };
  fechaPublicacion: string; 
  likes: number
}

export default function DashboardPage() {
  const auth = useContext(AuthContext);
  const router = useRouter();

  const [contents, setContents] = useState<Content[]>([]);

  const [error, setError] = useState("");

  // ⚡ Protección de la ruta
  useEffect(() => {
    if (!auth?.user) {
      router.push("/login"); // redirige si no hay token
    }
  }, [auth, router]);

  // ⚡ Fetch de contenidos
  useEffect(() => {
    if (!auth?.user) return;

    getContents(auth.user.token)
      .then(setContents)
      .catch((err) => {
        if (err instanceof Error) setError(err.message);
        else setError("Error desconocido");
      });
  }, [auth]);

  if (!auth?.user) return <p>Cargando...</p>; // mientras verifica el token


  
  return (
    <div className="flex flex-col items-center ">
      <Navbar/>
      
      <div className="w-full flex justify-between px-10 my-10">
        <button
          className="mb-6 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
          onClick={() => auth.logout()}
        >
          Cerrar sesión
        </button>

     <div className="flex w-70 justify-between">
         <Link
           className="mb-6 bg-green-500 text-white py-3 px-4 rounded hover:bg-green-700"
           href={"/create"}
         >
           Crear publicacion
         </Link>
      
         <Link
           className="mb-6 bg-green-500 text-white py-3 px-4 rounded hover:bg-green-700"
           href={"/profile"}
         >
           Mi perfil
         </Link>
     </div>


      </div>

      <h1 className="text-3xl mb-6">Publicaciones recientes</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       {contents.map((c) => (
  <ContentCard key={c.id} content={c} />
))}
      </div>
    </div>
  );
}
