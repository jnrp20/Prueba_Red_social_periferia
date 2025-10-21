// import Navbar from "@/components/navbar";

// export default function Profile() {
//   return (
//     <div className=" w-screen h-screen">

// <Navbar/>
// <div className="w-full -h-full flex flex-col items-center mt-10">
  
//       <h1 className="text-5xl">Mi perfil</h1>
//       </div>
  
// </div>

//   );
// }


'use client'

import { useEffect, useState } from 'react'

interface User {
  id: number
  nombre: string
  apellido:string
  alias: string
  fechaNacimiento: string
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

useEffect(() => {
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setError('No se encontró token. Inicia sesión primero.')
        setLoading(false)
        return
      }

      const response = await fetch('http://localhost:8080/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Error al obtener los datos del usuario')
      }

      const data: User = await response.json()
      setUser(data)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Error desconocido')
      }
    } finally {
      setLoading(false)
    }
  }

  fetchUser()
}, [])
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Cargando perfil...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 text-center">

      <h1 className="text-2xl font-semibold text-gray-800">{user.nombre}</h1>
      <h1 className="text-2xl font-semibold text-gray-800">{user.apellido}</h1>
      <p className="text-gray-500">{user.alias}</p>
      
      <p className="text-gray-500">{user.fechaNacimiento}</p>

      <button
        onClick={() => {
          localStorage.removeItem('token')
          window.location.href = '/login'
        }}
        className="mt-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
      >
        Cerrar sesión
      </button>
    </div>
  )
}
