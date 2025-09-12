import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AddContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [errors, setErrors] = useState({});
  const API_URL = `http://127.0.0.1:5000/usuarios/${id}/contactos`

  const validate = () => {
    const newErrors = {};
    if (!name.trim() || !/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(name)) {
      newErrors.name = "Nombre solo debe contener letras y espacios";
    }
    if (!lastName.trim() || !/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(lastName)) {
      newErrors.last_name = "Apellido solo debe contener letras y espacios";
    }
    if (email.trim() && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Email no es válido";
    }
    if (!telefono.trim() || !/^\d+$/.test(telefono)) {
      newErrors.telefono = "Teléfono solo debe contener números";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          last_name: lastName,
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
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="apellido" className="block text-gray-700 text-sm mb-2">Apellido</label>
          <input
            id="apellido"
            type="text"
            placeholder="Introducir apellido"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>}
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
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="telefono" className="block text-gray-700 text-sm mb-2">Numero de Telefono</label>
          <input
            id="telefono"
            type="tel"
            placeholder="_ _ _ _ _ _ _ _"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
        </div>
      </div>
    </div>
  );
};

export default AddContact;
