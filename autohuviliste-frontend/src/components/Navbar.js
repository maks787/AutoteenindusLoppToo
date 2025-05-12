import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isAuthenticated, handleLogout, userEmail }) => {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="nav-left">
                    <Link to="/">Avaleht</Link>
                    <Link to="/forum">Foorum</Link>
                    <Link to="/car-reviews">Arvustused</Link>
                    <Link to="/news">Uudised</Link>
                    <Link to="/MarketplaceList">Marketplace</Link>
                </div>

                <div className="nav-center">
                    <h2>Autohuviliste veeb</h2>
                </div>

                <div className="nav-right">
                    {isAuthenticated ? (
                        <>
                            <span onClick={() => navigate("/profile")}>{userEmail}</span>
                            <button onClick={handleLogout}>Väljalogimine</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => navigate("/register")}>Registreerimine</button>
                            <button onClick={() => navigate("/login")}>Sisene</button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
