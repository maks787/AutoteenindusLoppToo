import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MarketplaceList() {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [brandFilter, setBrandFilter] = useState("");
    const [engineFilter, setEngineFilter] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sortOrder, setSortOrder] = useState(null); // null, "asc" (kasvavalt), "desc" (kahanevalt)

    useEffect(() => {
        fetch("http://localhost:5295/api/Marketplace")
            .then((response) => response.json())
            .then((data) => {
                setCars(data);
                setFilteredCars(data);
            })
            .catch((error) => console.error("Viga kuulutuste laadimisel:", error));
    }, []);

    useEffect(() => {
        let filteredData = cars;

        if (brandFilter) {
            filteredData = filteredData.filter(car =>
                car.carType.toLowerCase().includes(brandFilter.toLowerCase())
            );
        }

        if (engineFilter) {
            filteredData = filteredData.filter(car =>
                car.engine.toLowerCase().includes(engineFilter.toLowerCase())
            );
        }

        if (minPrice) {
            filteredData = filteredData.filter(car => car.price >= minPrice);
        }

        if (maxPrice) {
            filteredData = filteredData.filter(car => car.price <= maxPrice);
        }

        if (sortOrder === "asc") {
            filteredData = filteredData.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "desc") {
            filteredData = filteredData.sort((a, b) => b.price - a.price);
        }

        setFilteredCars(filteredData);
    }, [brandFilter, engineFilter, minPrice, maxPrice, sortOrder, cars]);

    const clearFilters = () => {
        setBrandFilter("");
        setEngineFilter("");
        setMinPrice("");
        setMaxPrice("");
        setSortOrder(null);
        setFilteredCars(cars);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Kõik kuulutused</h2>

            <div style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Filtreeri margi järgi"
                    value={brandFilter}
                    onChange={(e) => setBrandFilter(e.target.value)}
                    style={{ padding: "10px", marginRight: "10px" }}
                />
                <input
                    type="text"
                    placeholder="Filtreeri mootori järgi"
                    value={engineFilter}
                    onChange={(e) => setEngineFilter(e.target.value)}
                    style={{ padding: "10px", marginRight: "10px" }}
                />
                <input
                    type="number"
                    placeholder="Minimaalne hind"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    style={{ padding: "10px", marginRight: "10px" }}
                />
                <input
                    type="number"
                    placeholder="Maksimaalne hind"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    style={{ padding: "10px", marginRight: "10px" }}
                />
            </div>

            <div style={{ marginBottom: "20px" }}>
                <button
                    onClick={() => setSortOrder("asc")}
                    style={{ padding: "10px 20px", marginRight: "10px", backgroundColor: "#2196F3", color: "white", border: "none", borderRadius: "5px" }}
                >
                    Sorteeri hinna järgi (kasvavalt)
                </button>
                <button
                    onClick={() => setSortOrder("desc")}
                    style={{ padding: "10px 20px", marginRight: "10px", backgroundColor: "#FF5722", color: "white", border: "none", borderRadius: "5px" }}
                >
                    Sorteeri hinna järgi (kahanevalt)
                </button>
            </div>

            <button
                onClick={clearFilters}
                style={{ padding: "10px 20px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginBottom: "20px" }}
            >
                Tühjenda filtrid
            </button>

            <Link to="/marketplace">
                <button style={{ padding: "10px 20px", marginBottom: "20px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                    Lisa kuulutus
                </button>
            </Link>

            {filteredCars.length === 0 ? (
                <p>Filtritele vastavaid kuulutusi ei leitud.</p>
            ) : (
                <div>
                    {filteredCars.map((car) => (
                        <Link to={`/marketplace/${car.id}`} key={car.id} style={{ textDecoration: "none" }}>
                            <div style={{ border: "1px solid #ccc", padding: "20px", marginBottom: "20px", borderRadius: "10px", cursor: "pointer" }}>
                                <h3>{car.carType} — {car.price}€</h3>

                                {car.photoUrl && car.photoUrl.split(',').map((url, index) => (
                                    <img
                                        key={index}
                                        src={`http://localhost:5295${url}`}
                                        alt="auto"
                                        style={{ width: "300px", height: "200px", objectFit: "cover", marginRight: "10px", marginBottom: "10px" }}
                                    />
                                ))}

                                <p><strong>Kere:</strong> {car.bodyType}</p>
                                <p><strong>Esma registreerimine:</strong> {car.firstRegistration}</p>
                                <p><strong>Mootor:</strong> {car.engine}</p>
                                <p><strong>Kütus:</strong> {car.fuel}</p>
                                <p><strong>Läbisõit:</strong> {car.mileage} km</p>
                                <p><strong>Veoskeem:</strong> {car.drivetrain}</p>
                                <p><strong>Käigukast:</strong> {car.gearbox}</p>
                                <p><strong>Värv:</strong> {car.color}</p>
                                <p><strong>Reg. number:</strong> {car.regNumber}</p>
                                <p><strong>VIN-kood:</strong> {car.vinCode}</p>
                                <p><strong>Kasutaja:</strong> {car.userEmail}</p>
                                <p><strong>Käibemaks sisaldub:</strong> {car.isVatIncluded ? "Jah" : "Ei"}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MarketplaceList;
