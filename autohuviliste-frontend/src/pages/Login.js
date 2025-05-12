import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated, setUserEmail }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5295/api/Auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("userToken", data.token);
                localStorage.setItem("userEmail", data.email || email); 

                setIsAuthenticated(true);
                setUserEmail(data.email || email); 

                alert("Olete edukalt sisse loginud!");
                navigate("/"); 
            } else {
                setError(data.message || "Autoriseerimisviga");
            }
        } catch (err) {
            setError("Serveri viga. Proovige hiljem uuesti.");
        }
    };

    return (
        <div>
            <h2>Sisselogimine</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="e-mail"
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
                <button type="submit">Logi sisse</button>
            </form>
        </div>
    );
};

export default Login;
