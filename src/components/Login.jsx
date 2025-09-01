

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const login = async (e) => {
		e.preventDefault();
		setError("");
		try {
			const response = await fetch("http://127.0.0.1:5000/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});
			if (!response.ok) {
				throw new Error("Credenciales incorrectas");
			}
			const data = await response.json();
			if (data && data.id) {
				navigate(`/home/${data.id}`);
			} else {
				setError("Respuesta inválida del servidor");
			}
		} catch (err) {
			setError(err.message);
		}
	};

		return (
			<div className="min-h-screen flex flex-col bg-background">
				<div className="flex items-center justify-center p-4 border-b border-gray-200 bg-white">
					<h1 className="text-lg font-semibold">Iniciar Sesión</h1>
				</div>
				<form className="flex flex-col p-4 space-y-6 max-w-md mx-auto w-full" onSubmit={login}>
					<div>
						<label htmlFor="email" className="block text-gray-700 text-sm mb-2">Email</label>
						<input
							type="text"
							id="email"
							value={email}
							onChange={e => setEmail(e.target.value)}
							className="border border-gray-300 bg-white rounded w-full py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
							placeholder="Ingresa tu email"
							autoComplete="username"
						/>
					</div>
					<div>
						<label htmlFor="password" className="block text-gray-700 text-sm mb-2">Contraseña</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							className="border border-gray-300 bg-white rounded w-full py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
							placeholder="Ingresa tu contraseña"
							autoComplete="current-password"
						/>
					</div>
					{error && (
						<div className="text-red-500 text-sm">{error}</div>
					)}
					<button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
						Ingresar
					</button>
				</form>
			</div>
		);
};

export default Login;
