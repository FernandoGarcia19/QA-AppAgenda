import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Home = () => {

  const { id } = useParams();
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const API_URL = `http://127.0.0.1:5000/usuarios/${id}/contactos`;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
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


  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const handleExport = async (formato) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/usuarios/${id}/contactos/export?formato=${formato}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Error al exportar");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = formato === "csv" ? "contactos.csv" : "contactos.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      setMenuOpen(false);
    } catch (err) {
      console.log(err);
      window.alert("No se pudo exportar el archivo");
    }
  };

  const sortedContacts = [...contacts].sort((a, b) => {
    const nameA = ((a.nombre || "") + " " + (a.apellido || "")).toLowerCase();
    const nameB = ((b.nombre || "") + " " + (b.apellido || "")).toLowerCase();
    return nameA.localeCompare(nameB);
  });
  const filteredContacts = sortedContacts.filter(c => {
    const nombre = c.nombre ? c.nombre.toLowerCase() : "";
    const apellido = c.apellido ? c.apellido.toLowerCase() : "";
    const term = search.toLowerCase();
    return nombre.includes(term) || apellido.includes(term);
  });

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="nav-bar flex flex-row items-center justify-between px-4 py-2">
        <div>
          <h1>Contactos</h1>
        </div>
        <div className="flex items-center space-x-6 relative">
          <div className="flex items-center bg-gray-100 rounded px-2 py-1">
            <img src="/search.svg" className="w-6 h-6 mr-2" alt="Buscar" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar..."
              className="bg-gray-100 outline-none px-2 py-1 rounded"
            />
          </div>
          <div className="relative" ref={menuRef}>
            <img
              src="/3-vertical-dots.svg"
              className="w-10 h-10 cursor-pointer"
              alt="Opciones"
              onClick={() => setMenuOpen((open) => !open)}
            />
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-10">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleExport("csv")}
                >
                  Exportar a CSV
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleExport("pdf")}
                >
                  Exportar a PDF
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <main className="main-container relative flex flex-1 items-start justify-center">
        {filteredContacts.length === 0 ? (
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
              {filteredContacts.map((c, i) => (
                <li
                  key={i}
                  className="flex flex-row items-center"
                  onClick={() => navigate(`/Profile/${id}/${c.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <img src="/contact-icon.svg" alt="contact icon" className="w-24 h-24"/>
                  <div className="flex flex-col mx-4 text-left">
                    <h3 className="font-bold text-2xl">{c.nombre + " " + c.apellido}</h3>
                    <p className="text-gray-600 text-xl">{c.telefono}</p>
                  </div>
                  <div className="ml-auto">
                    <img src="/phonecall.svg" alt="call icon button" className="w-16 h-16"/>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        <button
          onClick={() => navigate(`/addConntact/${id}`)}
          className="text-3xl absolute bottom-6 right-6 bg-blue-500 text-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg hover:bg-blue-600"
        >
          +
        </button>
      </main>
    </div>
  );
};

export default Home;

