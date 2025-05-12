import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CarReviewsPage from "./pages/CarReviewsPage";
import Forum from "./pages/Forum";
import Reviews from "./pages/Reviews";
import Marketplace from "./pages/Marketplace";
import MarketplaceList from "./pages/MarketplaceList";
import CarDetails from "./pages/CarDetails";
import CarNewsPage from "./pages/CarNewsPage";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userEmail, setUserEmail] = useState("");  // ����� ��� �������� email

    useEffect(() => {
        const userToken = localStorage.getItem("userToken");
        const email = localStorage.getItem("userEmail");  // �������� email �� localStorage
        if (userToken && email) {
            setIsAuthenticated(true);
            setUserEmail(email);  // ��������� email � ������
        }
    }, []);

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUserEmail("");  // ������� email ��� ������
        localStorage.removeItem("userToken");
        localStorage.removeItem("userEmail");
    };

    return (
        <Router>
            <Navbar
                isAuthenticated={isAuthenticated}
                handleLogout={handleLogout}
                userEmail={userEmail}  // �������� email � Navbar
            />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login setIsAuthenticated={setIsAuthenticated} setUserEmail={setUserEmail} />} />
                <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/car-reviews" element={<CarReviewsPage />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/marketplaceList" element={<MarketplaceList />} />
                <Route path="/news" element={<CarNewsPage />} />
                <Route path="/marketplace/:id" element={<CarDetails />} />  {/* �������� � �������� ���������� */}
            </Routes>
        </Router>
    );
}

export default App;
