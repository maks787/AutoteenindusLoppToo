import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Reviews = () => {
    const [form, setForm] = useState({
        Year: "",
        BodyType: "",
        Transmission: "",
        DriveType: "",
        Generation: "",
        Engine: "",
        HighwayConsumption: "",
        CityConsumption: "",
        PurchaseYear: "",
        Mileage: "",
        Comment: "",
        CarId: "",
        Photo: null
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setForm({ ...form, [name]: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userEmail = localStorage.getItem("userEmail");

        const formData = new FormData();
        for (let key in form) {
            formData.append(key, form[key]);
        }
        formData.append("UserEmail", userEmail);

        await fetch("http://localhost:5295/api/CarReviews", {
            method: "POST",
            body: formData,
        });

        alert("Arvustus lisatud!");
        navigate("/reviews");
    };

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-lg mt-12">
            <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Lisa oma auto arvustus</h2>
            <form onSubmit={handleSubmit}>
                <table className="w-full border border-gray-300">
                    <tbody>
                        {[
                            { label: "Auto mark ja mudel", name: "CarId", type: "text" },
                            { label: "Väljalaskeaasta", name: "Year", type: "number" },
                            { label: "Keretüüp", name: "BodyType", type: "text" },
                            { label: "Käigukast", name: "Transmission", type: "text" },
                            { label: "Veoskeem", name: "DriveType", type: "text" },
                            { label: "Põlvkond", name: "Generation", type: "text" },
                            { label: "Mootor", name: "Engine", type: "text" },
                            { label: "Kütusekulu maanteel (l/100km)", name: "HighwayConsumption", type: "number", step: "0.1" },
                            { label: "Kütusekulu linnas (l/100km)", name: "CityConsumption", type: "number", step: "0.1" },
                            { label: "Ostuaasta", name: "PurchaseYear", type: "number" },
                            { label: "Läbisõit (km)", name: "Mileage", type: "number" },
                        ].map(({ label, name, type, step }) => (
                            <tr key={name} className="border-t border-gray-300">
                                <td className="p-3 font-medium bg-gray-50">{label}</td>
                                <td className="p-3">
                                    <input
                                        type={type}
                                        name={name}
                                        step={step}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-300 p-2 rounded"
                                    />
                                </td>
                            </tr>
                        ))}

                        <tr className="border-t border-gray-300">
                            <td className="p-3 font-medium bg-gray-50">Foto</td>
                            <td className="p-3">
                                <input
                                    type="file"
                                    name="Photo"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="w-full"
                                />
                            </td>
                        </tr>

                        <tr className="border-t border-gray-300">
                            <td className="p-3 font-medium bg-gray-50">Kommentaar</td>
                            <td className="p-3">
                                <textarea
                                    name="Comment"
                                    onChange={handleChange}
                                    placeholder="Kirjelda oma kogemust selle autoga..."
                                    className="w-full border border-gray-300 p-2 rounded h-36 resize-none"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <button
                    type="submit"
                    className="w-full mt-6 bg-blue-500 text-white p-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300"
                >
                    Lisa arvustus
                </button>
            </form>
        </div>
    );
};

export default Reviews;
