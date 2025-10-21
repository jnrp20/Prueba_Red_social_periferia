const API_URL = "http://localhost:8080"; // direccion raiz de backend

interface LoginResponse {
  token: string;
}

interface Content {
  id: number;
  mensaje: string;
  user?: { alias: string };
   fechaPublicacion: string; 
   likes: number;
}

interface NewPost {
  title: string;
  description: string;
}



export const loginUser = async (alias: string, password: string): Promise<LoginResponse> => {
  const res = await fetch('http://localhost:8080/auth/login', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ alias, password }),
  });
  if (!res.ok) throw new Error("Correo o contraseña incorrectos");
  return res.json();
};

export const getContents = async (token: string): Promise<Content[]> => {
  const res = await fetch('http://localhost:8080/posts', {
    headers: { "Authorization": `Bearer ${token}` ,'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',},
  });
  if (!res.ok) throw new Error("Error al obtener contenidos");
  return res.json();

};

export const createPost = async (alias: string, mensaje: string, token: string) => {
  const res = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
    body: JSON.stringify({ alias, mensaje }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Error al crear post");
  }

  return res.json();
};


export const likePost = async (postId: number, alias: string, token: string) => {
  const response = await fetch(`${API_URL}/likes/${postId}?alias=${alias}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error al dar like");
  }

  return await response.json(); // devuelve el nuevo total de likes
};


