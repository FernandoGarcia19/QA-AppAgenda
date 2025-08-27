
const Home = () => {
    return (
        <>
            <nav className="nav-bar">
                <div>
                    <h1>Contactos</h1>
                </div>
                <div className="flex items-center space-x-10">
                    <img src="./search.svg" className="w-10 h-10" alt="Buscar" />
                    <img src="./3-vertical-dots.svg" className="w-10 h-10" alt="Opciones" />
                </div>
            </nav>
            <main className="main-container">
                <button
                className="fixed bottom-6 right-6 bg-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-600"
                >
                    +
                </button>
            </main>

        </>
    )
}

export default Home;