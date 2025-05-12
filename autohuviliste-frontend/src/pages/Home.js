import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
    const [cars, setCars] = useState([]);
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5295/api/Marketplace")
            .then((response) => response.json())
            .then((data) => setCars(data))
            .catch((error) => console.error("Autode laadimise viga:", error));
    }, []);

    useEffect(() => {
        axios.get("http://localhost:5000/rss-news")
            .then((response) => {
                setNews(response.data);
            })
            .catch((error) => {
                console.error("Uudiste laadimise viga:", error);
            });
    }, []);

    const carSliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    };

    const imageSliderSettings = {
        dots: false,
        infinite: true,
        speed: 1200,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        fade: true,
    };

    const sliderImages = [
        "/img/audi.jpg",
        "/img/bmw.jpg",
        "/img/merc.jpg",
    ];

    return (
        <div>
            {/* Hero sektsioon */}
            <div style={styles.heroSection}>
                <h1 style={styles.heroText}>Leia oma täiuslik auto juba täna!</h1>
            </div>

            {/* Piltide slaider */}
            <Slider {...imageSliderSettings} style={{ marginBottom: "40px" }}>
                {sliderImages.map((image, index) => (
                    <div key={index}>
                        <img src={image} alt={`slide-${index}`} style={styles.sliderImage} />
                    </div>
                ))}
            </Slider>

            {/* Marketplace sektsioon */}
            <div style={{ padding: "30px 20px" }}>
                <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    🚗 Autode galerii
                </motion.h2>

                <Slider {...carSliderSettings}>
                    {cars.length === 0 ? (
                        <p>Ei ole saadaval autosid kuvamiseks.</p>
                    ) : (
                        cars.map((car) => (
                            <motion.div key={car.id} style={styles.carCard} whileHover={{ scale: 1.03 }}>
                                <Link to={`/marketplace/${car.id}`} style={{ textDecoration: "none" }}>
                                    {car.photoUrl && car.photoUrl.split(",")[0] && (
                                        <img
                                            src={`http://localhost:5295${car.photoUrl.split(",")[0]}`}
                                            alt={car.carType}
                                            style={styles.carImage}
                                        />
                                    )}
                                    <div style={styles.carInfo}>
                                        <h3>{car.carType} — {car.price}€</h3>
                                        <p>{car.bodyType}</p>
                                        <p>Läbisõit: {car.mileage} km</p>
                                        <p>Värv: {car.color}</p>
                                    </div>
                                </Link>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
                                        const updatedFavorites = [...storedFavorites, car];
                                        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
                                        alert("Lisatud lemmikutesse!");
                                    }}
                                    style={styles.favoriteButton}
                                >
                                    ♥ Lemmikutesse
                                </button>
                            </motion.div>
                        ))
                    )}
                </Slider>
            </div>

            {/* Miks meie? */}
            <div style={styles.whyUsSection}>
                <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
                    Miks just meie?
                </motion.h2>
                <div style={styles.advantages}>
                    <motion.div style={styles.advCard} whileHover={{ scale: 1.05 }}>
                        <h3>🔥 Parimad hinnad</h3>
                        <p>Pakume kõige soodsamaid pakkumisi usaldusväärsetelt müüjatelt.</p>
                    </motion.div>
                    <motion.div style={styles.advCard} whileHover={{ scale: 1.05 }}>
                        <h3>💼 Usaldusväärsed autod</h3>
                        <p>Iga auto läbib põhjaliku tehnilise ülevaatuse ja täieliku kirjelduse.</p>
                    </motion.div>
                    <motion.div style={styles.advCard} whileHover={{ scale: 1.05 }}>
                        <h3>🚀 Kiire otsing</h3>
                        <p>Lihtne filtrite ja kategooriate järgi otsing ilma registreerimiseta.</p>
                    </motion.div>
                </div>
            </div>

            {/* Uudiste sektsioon */}
            <div style={{ padding: "30px 20px" }}>
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    📰 Viimased uudised
                </motion.h2>
                <div style={styles.newsList}>
                    {news.length === 0 ? (
                        <p>Ei ole uudiseid kuvamiseks.</p>
                    ) : (
                        news.map((item, idx) => (
                            <motion.div key={idx} style={styles.newsCard} whileHover={{ scale: 1.02 }}>
                                <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </a>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    heroSection: {
        backgroundColor: "#111",
        padding: "60px 20px",
        textAlign: "center",
    },
    heroText: {
        color: "#fff",
        fontSize: "42px",
        fontWeight: "bold",
        margin: "0 auto",
        maxWidth: "800px",
    },
    sliderImage: {
        width: "100%",
        height: "500px",
        objectFit: "cover",
    },
    carCard: {
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "12px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.12)",
        backgroundColor: "#fff",
        transition: "transform 0.3s ease",
        position: "relative",
    },
    carImage: {
        width: "100%",
        height: "180px",
        objectFit: "cover",
        borderRadius: "8px",
    },
    carInfo: {
        marginTop: "10px",
        color: "#333",
    },
    favoriteButton: {
        marginTop: "10px",
        padding: "8px 12px",
        border: "none",
        borderRadius: "5px",
        backgroundColor: "#e53935",
        color: "#fff",
        cursor: "pointer",
        width: "100%",
    },
    whyUsSection: {
        padding: "60px 20px",
        backgroundColor: "#f4f4f4",
        textAlign: "center",
        color: "black",
    },
    advantages: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        marginTop: "30px",
    },
    advCard: {
        backgroundColor: "#fff",
        padding: "20px",
        margin: "10px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        flex: "0 0 300px",
        textAlign: "center",
    },
    newsList: {
        marginTop: "30px",
    },
    newsCard: {
        backgroundColor: "#f9f9f9",
        padding: "15px",
        marginBottom: "15px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    },
};

export default Home;
