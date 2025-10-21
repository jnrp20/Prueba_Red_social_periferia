"use client";
import { useState } from "react";
import { likePost } from "@/services/api";
import { useAuth } from "@/context/AuthContext";

interface Content {
  id: number;
  mensaje: string;
  user?: { alias: string };
  fechaPublicacion: string;
  likes: number;
}

export default function ContentCard({ content }: { content: Content }) {
  const { user } = useAuth();
  const [likes, setLikes] = useState(content.likes || 0);
  const [error, setError] = useState("");

  const handleLike = async () => {
    if (!user) {
      alert("Debes iniciar sesión para dar like.");
      return;
    }

    try {
      const updatedLikes = await likePost(content.id, user.alias, user.token);
      setLikes(updatedLikes);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Ya diste like a esta publicación o ocurrió un error.");
    }
  };

  const fecha = new Date(content.fechaPublicacion).toLocaleString("es-CO", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="border rounded p-4 shadow bg-white">
      <h2 className="font-bold text-green-600">{content.user?.alias}</h2>
      <p className="text-gray-800">{content.mensaje}</p>
      <p className="text-gray-500 text-sm mt-2">{fecha}</p>
{/* 
      <button
        onClick={handleLike}
        className="mt-3 bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded"
      >
        ❤️ Like ({likes})
      </button> */}

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
