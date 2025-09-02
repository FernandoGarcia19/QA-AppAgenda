import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Profile = () => {
  const { id, idContacto } = useParams();
  const navigate = useNavigate();
  const [contacto, setContacto] = useState(null);
  const API_URL = `http://127.0.0.1:5000/contactos/${idContacto}`;

  // Cargar datos del contacto
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener el contacto");
        const data = await response.json();
        setContacto(data);
      } catch (error) {
        console.error("Error:", error);
        window.alert("No se pudo cargar el contacto");
      }
    };
    fetchContact();
  }, [API_URL]);

  if (!contacto) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <button
          onClick={() => navigate(`/home/${id}`)}
          className="text-xl text-gray-700"
        >
          ←
        </button>
        <h1 className="text-lg font-semibold">Perfil</h1>
        <button
          onClick={() => navigate(`/edit/${id}/${idContacto}`)}
          className="text-blue-500 text-sm"
        >
          Editar
        </button>
      </div>

      {/* Perfil */}
      <div className="flex flex-col items-center p-6">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-3xl font-bold text-gray-600 mb-4">
          {contacto.nombre?.charAt(0)}
          {contacto.apellido?.charAt(0)}
        </div>
        <h2 className="text-xl font-semibold">
          {contacto.nombre} {contacto.apellido}
        </h2>
        <p className="text-gray-500">{contacto.email}</p>
        <p className="text-gray-700 mt-2">{contacto.telefono}</p>
      </div>
    </div>
  );
};

export default Profile;
