import { use, useState } from "react";
import AddContact from "./AddContact";  
import { useParams } from "react-router-dom";

const Home = () => {
  const { id } = useParams();
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState("Home");

  const handleAddContact = (contact) => {
    setContacts([...contacts, contact]);
    setPage("Home");
  };

  if (page === "AddContact") {
    return (
      <AddContact
        onAddContact={handleAddContact}
        onCancel={() => setPage("Home")}
      />
    );
  }

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
      <main className="main-container relative flex flex-1 items-center justify-center">
        {contacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-gray-500">
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
                <li key={i} className="p-4 bg-white shadow rounded">
                  <p className="font-bold">{c.name}</p>
                  <p>{c.phone}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        <button
          onClick={() => setPage("AddContact")}
          className="absolute bottom-6 right-6 bg-blue-500 text-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg hover:bg-blue-600"
        >
          +
        </button>
      </main>
    </div>
  );
};

export default Home;
