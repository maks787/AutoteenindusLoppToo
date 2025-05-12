import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CarReviewsPage = () => {
    const [reviews, setReviews] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");  // Otsingu seisund
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5295/api/CarReviews") // Asenda õige API-ga
            .then((res) => res.json())
            .then((data) => setReviews(data))
            .catch((err) => console.error(err));
    }, []);

    // Filtreerimise funktsioon auto nime järgi
    const filteredReviews = reviews.filter((review) =>
        review.carId.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <h2>Autode arvustused</h2>

            {/* Otsingu vorm */}
            <input
                type="text"
                placeholder="Otsi auto nime järgi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ marginBottom: "20px", padding: "8px", width: "300px" }}
            />

            <button onClick={() => navigate("/reviews")}>
                Lisa arvustus
            </button>

            {filteredReviews.length === 0 ? (
                <p>Arvustusi pole veel.</p>
            ) : (
                <div>
                    {filteredReviews.map((review) => (
                        <div key={review.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
                            <p><strong>Auto:</strong> {review.carId}</p>
                            <p><strong>Kasutaja:</strong> {review.userEmail}</p>
                            <p><strong>Valmistamise aasta:</strong> {review.year}</p>
                            <p><strong>Kere tüüp:</strong> {review.bodyType}</p>
                            <p><strong>Mootor:</strong> {review.engine}</p>
                            <p><strong>Ülekanne:</strong> {review.transmission}</p>
                            <p><strong>Vedav mehhanism:</strong> {review.driveType}</p>
                            <p><strong>Põlvkond:</strong> {review.genertion}</p>
                            <p><strong>Kütusekulu maanteel:</strong> {review.highwayConsumption}</p>
                            <p><strong>Ühikukulu linnas:</strong> {review.cityConsumption}</p>
                            <p><strong>Ostu aasta:</strong> {review.purchaseYear}</p>
                            <p><strong>Läbisõit:</strong> {review.mileage}</p>
                            <p><strong>Mootor:</strong> {review.engine}</p>
                            <p><strong>Kommentaar:</strong> {review.comment}</p>
                            {review.photoUrl && (
                                <img
                                    src={`http://localhost:5295/${review.photoUrl}`}
                                    alt="Auto foto"
                                    className="mt-3 rounded-lg w-full h-20 object-cover"ы
                                    style={{
                                        width: "200px",
                                        height: "150px",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                        marginTop: "10px"
                                    }}
                                />
                            )}
                            <p><small>Arvustuse kuupäev: {new Date(review.createdAt).toLocaleDateString()}</small></p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CarReviewsPage;
