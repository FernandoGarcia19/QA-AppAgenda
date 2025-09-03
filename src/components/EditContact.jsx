import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditContact = () => {
  const { id, idContacto } = useParams();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [numeroTelefono, setNumeroTelefono] = useState("");
  const API_URL = `http://127.0.0.1:5000/contactos/${idContacto}`;

  // Cargar datos del contacto
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener el contacto");
        const data = await response.json();

        // Mapear los campos del backend a las variables del frontend
        setNombre(data.nombre || "");
        setApellido(data.apellido || "");
        setEmail(data.email || "");
        setNumeroTelefono(data.telefono || "");
      } catch (error) {
        console.error("Error:", error);
        window.alert("No se pudo cargar el contacto");
      }
    };
    fetchContact();
  }, [API_URL]);

  // Actualizar contacto
  const handleUpdate = async () => {
    if (!nombre || !apellido || !email || !numeroTelefono) {
      window.alert("Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nombre,          // El backend espera 'name'
          last_name: apellido,   // El backend espera 'last_name'
          email: email,
          telefono: numeroTelefono,
        }),
      });

      if (response.ok) {
        window.alert("Contacto actualizado exitosamente");
        navigate(`/home/${id}`);
      } else {
        const errorData = await response.json();
        window.alert(errorData.error || "Error al actualizar el contacto");
      }
    } catch (error) {
      window.alert("Error al actualizar el contacto");
      console.error("Failed to update contact:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <button onClick={() => navigate(`/home/${id}`)} className="text-xl text-gray-700">←</button>
        <h1>Edit Contact</h1>
        <button onClick={handleUpdate} className="text-xl text-blue-500">✓</button>
      </div>

      {/* Form */}
      <div className="flex flex-col p-4 space-y-6">
        <div>
          <label htmlFor="nombre" className="block text-gray-700 text-sm mb-2">Nombre</label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border border-gray-300 rounded w-full py-2 px-3"
          />
        </div>
        <div>
          <label htmlFor="apellido" className="block text-gray-700 text-sm mb-2">Apellido</label>
          <input
            id="apellido"
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            className="border border-gray-300 rounded w-full py-2 px-3"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 text-sm mb-2">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded w-full py-2 px-3"
          />
        </div>
        <div>
          <label htmlFor="telefono" className="block text-gray-700 text-sm mb-2">Número de Teléfono</label>
          <input
            id="telefono"
            type="tel"
            value={numeroTelefono}
            onChange={(e) => setNumeroTelefono(e.target.value)}
            className="border border-gray-300 rounded w-full py-2 px-3"
          />
        </div>
      </div>
    </div>
  );
};

export default EditContact;