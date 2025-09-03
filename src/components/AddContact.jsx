import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AddContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setNombre] = useState("");
  const [last_name, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setNumeroTelefono] = useState("");
  const API_URL = `http://127.0.0.1:5000/usuarios/${id}/contactos`

  const handleSave = async () => {
    if (!name || !last_name|| !telefono) return;
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          last_name: last_name,
          email: email,
          telefono: telefono,
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
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <button onClick={() => navigate(`/home/${id}`)} className="text-4xl text-gray-700">←</button>
        <h1>Add</h1>
        <button onClick={handleSave} className="text-4xl text-blue-500">✔</button>
      </div>

      <div className="main-container flex flex-col p-4 space-y-6">
        <div>
          <label htmlFor="nombre" className="block text-gray-700 text-sm mb-2">Nombre</label>
          <input
            id="nombre"
            type="text"
            placeholder="Introducir nombre"
            value={name}
            onChange={(e) => setNombre(e.target.value)}
            className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="apellido" className="block text-gray-700 text-sm mb-2">Apellido</label>
          <input
            id="apellido"
            type="text"
            placeholder="Introducir apellido"
            value={last_name}
            onChange={(e) => setApellido(e.target.value)}
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
            placeholder="_ _ _ _ _ _ _ _"
            value={telefono}
            onChange={(e) => setNumeroTelefono(e.target.value)}
            className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default AddContact;
