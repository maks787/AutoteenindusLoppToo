import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
    const [favorites, setFavorites] = useState([]);
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);

        const email = localStorage.getItem("userEmail");
        setUserEmail(email || "Teadmata");
    }, []);

    const removeFromFavorites = (carId) => {
        const updatedFavorites = favorites.filter(car => car.id !== carId);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Minu profiil</h2>

            <div style={styles.profileHeader}>
                <img
                    src="https://www.w3schools.com/howto/img_avatar.png"
                    alt="Avatar"
                    style={styles.avatar}
                />
                <div>
                    <h3>{userEmail}</h3>
                    <p>Tere tulemast!</p>
                </div>
            </div>

            <h2 style={{ marginTop: "30px" }}>Eelistatud autod</h2>
            {favorites.length === 0 ? (
                <p>Teil ei ole veel ühtegi lemmikautot.</p>
            ) : (
                <div style={styles.carGrid}>
                    {favorites.map((car) => (
                        <div key={car.id} style={styles.carCard}>
                            <Link to={`/marketplace/${car.id}`} style={{ textDecoration: "none" }}>
                                {car.photoUrl && car.photoUrl.split(',')[0] && (
                                    <img
                                        src={`http://localhost:5295${car.photoUrl.split(',')[0]}`}
                                        alt={car.carType}
                                        style={styles.carImage}
                                    />
                                )}
                                <div style={styles.carInfo}>
                                    <h3>{car.carType} — {car.price}€</h3>
                                    <p>{car.bodyType}</p>
                                    <p>Kilomeetrite arv: {car.mileage} km</p>
                                </div>
                            </Link>
                            <button
                                onClick={() => removeFromFavorites(car.id)}
                                style={styles.removeButton}
                            >
                                Ebasoodne
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    profileHeader: {
        display: "flex",
        alignItems: "center",
        gap: "20px",
    },
    avatar: {
        width: "80px",
        borderRadius: "50%",
    },
    carGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
        marginTop: "20px",
    },
    carCard: {
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
    carImage: {
        width: "100%",
        height: "150px",
        objectFit: "cover",
        borderRadius: "8px",
    },
    carInfo: {
        marginTop: "10px",
    },
    removeButton: {
        marginTop: "10px",
        padding: "6px 10px",
        border: "none",
        borderRadius: "5px",
        backgroundColor: "#ff5252",
        color: "#fff",
        cursor: "pointer",
        width: "100%",
    },
};

export default Profile;
