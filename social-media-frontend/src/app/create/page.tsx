"use client";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { createPost } from "@/services/api";
import Navbar from "@/components/navbar";

export default function Create() {
  const auth = useContext(AuthContext);
  const router = useRouter();

  if (!auth) throw new Error("AuthContext no encontrado");

  const { user, loading } = auth;

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Protege la ruta
  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    try {
      await createPost(user.alias, mensaje, user.token);
      console.log(createPost)
      setMensaje("");
      setError("");
      setSuccess("Publicación creada exitosamente!");
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      setSuccess("");
    }
  };

  if (loading || !user) return <p>Cargando...</p>;

  return (

    
  <div>
    <Navbar/>
      <div className="max-w-md mx-auto p-6">
        
        <h1 className="text-2xl mb-4">Crear Publicación</h1>
    
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}
    
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <textarea
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="border border-gray-300 rounded p-2 w-full"
            rows={5}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-36"
          >
            Publicar
          </button>
        </form>
      </div>
  </div>
  );
}
