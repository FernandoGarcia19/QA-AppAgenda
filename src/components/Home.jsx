import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Home = () => {

  const { id } = useParams();
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();
  const API_URL = `http://127.0.0.1:5000/usuarios/${id}/contactos`
  const fetchContacts = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Error fetching contacts");
      }
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    }
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="nav-bar">
        <div>
          <h1>Contactos</h1>
        </div>
        <div className="flex items-center space-x-10">
          <img src="/search.svg" className="w-10 h-10" alt="Buscar" />
          <img src="/3-vertical-dots.svg" className="w-10 h-10" alt="Opciones" />
        </div>
      </nav>
      <main className="main-container relative flex flex-1 items-start justify-center">
        {contacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-gray-500 w-full">
            <img
              src="/empty-box.svg"
              className="w-64 h-64 mb-4"
              alt="No hay contactos"
            />
            <p className="text-xl">No hay contactos</p>
          </div>
        ) : (
          <div className="p-4 w-full">
            <ul className="space-y-4">
              {contacts.map((c, i) => (
                <li key={i} className="flex flex-row items-center">
                  <img src="/contact-icon.svg" alt="contact icon" className="w-24 h-24"/>
                  <div className="flex flex-col mx-4 text-left">
                    <h3 className="font-bold text-2xl">{c.nombre}</h3>
                    <p className="text-gray-600 text-xl">{c.telefono}</p>
                  </div>
                  {/* Botón llamar */}
                  <div className="ml-auto flex items-center space-x-4">
                    <img
                      src="/phonecall.svg"
                      alt="call icon button"
                      className="w-12 h-12 cursor-pointer"
                    />

                    {/* Botón editar */}
                    <img
                      src="/edit.png"   // <-- necesitas un icono "edit.svg" en public/
                      alt="edit contact"
                      className="w-12 h-12 cursor-pointer"
                      onClick={() => navigate(`/editContact/${id}/${c.id}`)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        <button
          onClick={() => navigate(`/addConntact/${id}`)}
          className="absolute bottom-6 right-6 bg-blue-500 text-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg hover:bg-blue-600"
        >
          +
        </button>
      </main>
    </div>
  );
};

export default Home;

