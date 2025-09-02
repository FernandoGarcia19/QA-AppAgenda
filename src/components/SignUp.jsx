
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
	const [nombre, setNombre] = useState("");
	const [apellido, setApellido] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		if (!nombre || !apellido || !email || !password) {
			setError("Todos los campos son obligatorios");
			return;
		}
		try {
			const response = await fetch("http://127.0.0.1:5000/usuarios", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ nombre,apellido, email, password }),
			});
			if (response.ok) {
				window.alert("Usuario registrado exitosamente");
				navigate("/");
			} else {
				setError("Error al registrar usuario");
			}
		} catch (err) {
			setError("Error al registrar usuario");
		}
	};

	return (
		<div className="min-h-screen flex flex-col bg-white">
			<div className="flex items-center justify-center p-4 border-b border-gray-200 bg-white">
				<h1 className="text-lg font-semibold">Registrarse</h1>
			</div>
			<form className="flex flex-col p-4 space-y-6 max-w-md mx-auto w-full" onSubmit={handleSubmit}>
				<div>
					<label htmlFor="nombre" className="block text-gray-700 text-sm mb-2">Nombre</label>
					<input
						id="nombre"
						type="text"
						value={nombre}
						onChange={e => setNombre(e.target.value)}
						className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
						placeholder="Ingresa tu nombre"
						autoComplete="name"
					/>
				</div>
				<div>
					<label htmlFor="apellido" className="block text-gray-700 text-sm mb-2">Apellido</label>
					<input
						id="apellido"
						type="text"
						value={apellido}
						onChange={e => setApellido(e.target.value)}
						className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
						placeholder="Ingresa tu apellido"
						autoComplete="Last name"
					/>
				</div>
				<div>
					<label htmlFor="email" className="block text-gray-700 text-sm mb-2">Email</label>
					<input
						id="email"
						type="email"
						value={email}
						onChange={e => setEmail(e.target.value)}
						className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
						placeholder="Ingresa tu email"
						autoComplete="email"
					/>
				</div>
				<div>
					<label htmlFor="password" className="block text-gray-700 text-sm mb-2">Contraseña</label>
					<input
						id="password"
						type="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
						className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
						placeholder="Ingresa tu contraseña"
						autoComplete="new-password"
					/>
				</div>
				{error && (
					<div className="text-red-500 text-sm">{error}</div>
				)}
				<button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
					Registrarse
				</button>
			</form>
			<p>Ya tienes una cuenta? <Link to={"/"} className="text-blue-700 underline">Inicia Sesión</Link></p>
		</div>
	);
};

export default SignUp;
