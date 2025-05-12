import React, { useState, useEffect } from "react";

function LisaAuto() {
    const [formData, setFormData] = useState({
        carType: "",
        bodyType: "",
        firstRegistration: "",
        engine: "",
        fuel: "",
        mileage: "",
        drivetrain: "",
        gearbox: "",
        color: "",
        regNumber: "",
        vinCode: "",
        price: "",
        isVatIncluded: false,
        userEmail: "",
        userId: null,
    });

    const [files, setFiles] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:5295/api/user");
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                } else {
                    console.error("Kasutajate laadimine ebaõnnestus");
                }
            } catch (error) {
                console.error("Viga kasutajate laadimisel:", error);
            }
        };
        fetchUsers();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        for (let i = 0; i < files.length; i++) {
            data.append("files", files[i]);
        }

        try {
            const response = await fetch("http://localhost:5295/api/marketplace", {
                method: "POST",
                body: data,
            });

            if (response.ok) {
                alert("Auto lisati edukalt!");
            } else {
                const error = await response.json();
                console.error(error);
                alert("Viga: " + JSON.stringify(error));
            }
        } catch (err) {
            console.error("Viga päringu saatmisel:", err);
            alert("Viga päringu saatmisel");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-lg mt-12">
            <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Lisa auto kuulutus</h2>
            <form onSubmit={handleSubmit}>
                <table className="w-full border border-gray-300">
                    <tbody>
                        {[
                            { label: "Auto tüüp", name: "carType" },
                            { label: "Keretüüp", name: "bodyType" },
                            { label: "Esmaselt registreeritud (aasta)", name: "firstRegistration", type: "number" },
                            { label: "Mootor", name: "engine" },
                            { label: "Kütus", name: "fuel" },
                            { label: "Läbisõit (km)", name: "mileage", type: "number" },
                            { label: "Veoskeem", name: "drivetrain" },
                            { label: "Käigukast", name: "gearbox" },
                            { label: "Värv", name: "color" },
                            { label: "Registreerimisnumber", name: "regNumber" },
                            { label: "VIN kood", name: "vinCode" },
                            { label: "Hind (€)", name: "price", type: "number" },
                        ].map(({ label, name, type }) => (
                            <tr key={name} className="border-t border-gray-300">
                                <td className="p-3 font-medium bg-gray-50">{label}</td>
                                <td className="p-3">
                                    <input
                                        type={type || "text"}
                                        name={name}
                                        value={formData[name]}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-300 p-2 rounded"
                                    />
                                </td>
                            </tr>
                        ))}

                        <tr className="border-t border-gray-300">
                            <td className="p-3 font-medium bg-gray-50">Sisaldab KM</td>
                            <td className="p-3">
                                <input
                                    name="isVatIncluded"
                                    type="checkbox"
                                    checked={formData.isVatIncluded}
                                    onChange={handleChange}
                                    className="mr-3"
                                />
                            </td>
                        </tr>

                        <tr className="border-t border-gray-300">
                            <td className="p-3 font-medium bg-gray-50">Kuulutaja (email)</td>
                            <td className="p-3">
                                <select
                                    name="userEmail"
                                    value={formData.userEmail}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 p-2 rounded"
                                >
                                    <option value="">Vali kasutaja</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.email}>
                                            {user.email}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>

                        <tr className="border-t border-gray-300">
                            <td className="p-3 font-medium bg-gray-50">Pildid</td>
                            <td className="p-3">
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleFileChange}
                                    className="w-full"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <button
                    type="submit"
                    className="w-full mt-6 bg-blue-500 text-white p-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300"
                >
                    Lisa auto
                </button>
            </form>

        </div>
    );
}

export default LisaAuto;
