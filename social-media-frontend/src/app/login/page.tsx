"use client";
import { useState, useContext } from "react";
import Navbar from "@/components/navbar";
import { AuthContext } from "@/context/AuthContext"; 
import { loginUser } from "@/services/api"; 

export default function Login() {
  const [alias, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useContext(AuthContext);

  if (!auth) throw new Error("AuthContext no encontrado");
  const { login } = auth;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await loginUser(alias, password); 
      console.log("Enviando login:", { alias, password });
      login(data.token, alias);
    } catch (err) {
  if (err instanceof Error) {
    setError(err.message);
  } else {
    setError("Error desconocido");
  }
}
  };

  return (
    <div>
      <Navbar />
      <div className="w-screen flex items-center justify-center h-[70vh]">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-lg shadow-[0_0_20px_rgb(0,0,0,0.2)] max-w-md mx-auto h-[40vh] w-[50vw] flex flex-col justify-center "
        >
          <div className="w-full flex justify-center mb-10">
            <h1 className="text-3xl">Inicia Sesión</h1>
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="mb-4">
            <label htmlFor="alias" className="block text-gray-700 mb-2">
              Correo Electrónico
            </label>
            <input
              type="text"
              id="alias"
              name="alias"
              placeholder="example@email.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={alias}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-gray-300"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
