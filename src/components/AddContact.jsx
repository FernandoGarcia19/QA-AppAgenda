import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AddContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [numeroTelefono, setNumeroTelefono] = useState("");
  const API_URL = `http://127.0.0.1:5000/usuarios/${id}/contactos`

  const handleSave = async () => {
    if (!nombre || !email || !numeroTelefono) return;
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: nombre,
          email: email,
          telefono: numeroTelefono,
          usuario_id: id
        }),
      });
      if (response.ok) {
        window.alert("Contacto agregado exitosamente");
        navigate(`/home/${id}`);
      } else {
        window.alert("Error al agregar el contacto");
      }
    } catch (error) {
      window.alert("Error al agregar el contacto");
      console.error("Failed to add contact:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <button onClick={() => navigate(`/home/${id}`)} className="text-xl text-gray-700">←</button>
        <h1 className="text-lg font-semibold">Add</h1>
        <button onClick={handleSave} className="text-xl text-blue-500">✔</button>
      </div>

      {/* Form */}
      <div className="flex flex-col p-4 space-y-6">
        <div>
          <label htmlFor="nombre" className="block text-gray-700 text-sm mb-2">Nombre</label>
          <input
            id="nombre"
            type="text"
            placeholder="Introducir nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700 text-sm mb-2">Email</label>
          <input
            id="email"
            type="text"
            placeholder="Introducir email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="telefono" className="block text-gray-700 text-sm mb-2">Numero de Telefono</label>
          <input
            id="telefono"
            type="tel"
            placeholder="+591 _ _ _ _ _ _ _ _ _"
            value={numeroTelefono}
            onChange={(e) => setNumeroTelefono(e.target.value)}
            className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default AddContact;
