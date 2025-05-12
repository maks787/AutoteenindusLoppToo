import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate(); // Для перенаправления

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5295/api/Auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                navigate("/login");  // Перенаправляем на страницу логина
            } else {
                setError(data.message || "Registreerimisviga");
            }
        } catch (err) {
            console.error(err);
            setError("Serveri viga. Proovige hiljem uuesti.");
        }
    };


    return (
        <div>
            <h2>Registreerimine</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>Registreerimine edukas! Ümbersuunamine...</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Parool"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Korrake salasõna"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Registreeru</button>
            </form>
        </div>
    );
};

export default Register;
