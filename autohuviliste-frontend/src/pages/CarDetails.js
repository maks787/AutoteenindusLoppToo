import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";  // ID saamiseks URL-ist

function CarDetails() {
    const { id } = useParams(); 
    const [car, setCar] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5295/api/Marketplace/${id}`)
            .then((response) => {
                // Kontrollime, kas vastus on edukas, vastasel juhul viskame vea
                if (!response.ok) {
                    throw new Error(`HTTP viga: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => setCar(data))
            .catch((error) => {
                console.error("Viga auto andmete laadimisel:", error);
                alert("Auto andmeid ei õnnestunud laadida.");
            });
    }, [id]);  // Laadige andmed uuesti, kui ID muutub

    if (!car) {
        return <p>Laadimine...</p>;
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>{car.carType} — {car.price}€</h2>

            {/* Kõik pildid */}
            {car.photoUrl && car.photoUrl.split(',').map((url, index) => (
                <img
                    key={index}
                    src={`http://localhost:5295${url}`}
                    alt="auto"
                    style={{ width: "500px", height: "300px", objectFit: "cover", marginRight: "10px", marginBottom: "10px" }}
                />
            ))}

            {/* Põhiinfo auto kohta */}
            <p><strong>Kere tüüp:</strong> {car.bodyType}</p>
            <p><strong>Esimene registreerimine:</strong> {car.firstRegistration}</p>
            <p><strong>Mootor:</strong> {car.engine}</p>
            <p><strong>Kütus:</strong> {car.fuel}</p>
            <p><strong>Kilomeetrite arv:</strong> {car.mileage} km</p>
            <p><strong>Vedav mehhanism:</strong> {car.drivetrain}</p>
            <p><strong>Käigukast:</strong> {car.gearbox}</p>
            <p><strong>Värv:</strong> {car.color}</p>
            <p><strong>Reg. number:</strong> {car.regNumber}</p>
            <p><strong>VIN kood:</strong> {car.vinCode}</p>
            <p><strong>Kasutaja:</strong> {car.userEmail}</p>

            {/* Kui KM on hinna sisse arvestatud */}
            <p><strong>KM sisaldub:</strong> {car.isVatIncluded ? "Jah" : "Ei"}</p>
        </div>
    );
}

export default CarDetails;
