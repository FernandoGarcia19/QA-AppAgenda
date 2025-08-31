

import React, { useState } from "react";

const Login = () => {
	const [usuario, setUsuario] = useState("");
	const [contrasena, setContrasena] = useState("");

	return (
		<div className="min-h-screen flex flex-col bg-background">

			<div className="flex items-center justify-center p-4 border-b border-gray-200 bg-white">
				<h1 className="text-lg font-semibold">Iniciar Sesión</h1>
			</div>

			<form className="flex flex-col p-4 space-y-6 max-w-md mx-auto w-full">
				<div>
					<label htmlFor="usuario" className="block text-gray-700 text-sm mb-2">Usuario</label>
					<input
						type="text"
						id="usuario"
						value={usuario}
						onChange={e => setUsuario(e.target.value)}
						className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
						placeholder="Ingresa tu usuario"
						autoComplete="username"
					/>
				</div>
				<div>
					<label htmlFor="contrasena" className="block text-gray-700 text-sm mb-2">Contraseña</label>
					<input
						type="password"
						id="contrasena"
						value={contrasena}
						onChange={e => setContrasena(e.target.value)}
						className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
						placeholder="Ingresa tu contraseña"
						autoComplete="current-password"
					/>
				</div>
				<button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors" disabled>
					Ingresar
				</button>
			</form>
		</div>
	);
};

export default Login;
