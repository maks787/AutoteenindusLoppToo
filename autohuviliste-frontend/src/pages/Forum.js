import React, { useEffect, useState } from "react";

const Forum = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const userEmail = localStorage.getItem("userEmail");

    // Загрузка сообщений
    const fetchMessages = async () => {
        try {
            const response = await fetch("http://localhost:5295/api/Forum");
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error("Veateated laadimisest:", error);
        }
    };

   
    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!newMessage.trim()) return;

        try {
            const response = await fetch("http://localhost:5295/api/Forum", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    authorEmail: userEmail,
                    message: newMessage,
                }),
            });

            if (response.ok) {
                setNewMessage("");
                fetchMessages(); 
            }
        } catch (error) {
            console.error("Viga sõnumi saatmisel:", error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <div className="forum" style={styles.forumContainer}>
            <h2 style={styles.title}>Foorum</h2>

            <form onSubmit={handleSendMessage} style={styles.form}>
                <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Kirjutage sõnum..."
                    rows="4"
                    style={styles.textarea}
                />
                <button type="submit" style={styles.button}>Saada</button>
            </form>

            <div className="messages" style={styles.messagesContainer}>
                {messages.map((msg) => (
                    <div key={msg.id} style={styles.messageCard}>
                        <p style={styles.messageHeader}>
                            <strong>{msg.authorEmail}</strong> ({new Date(msg.createdAt).toLocaleString()}):
                        </p>
                        <p>{msg.message}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    forumContainer: {
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    title: {
        textAlign: "center",
        fontSize: "32px",
        marginBottom: "20px",
        color: "#333",
    },
    form: {
        marginBottom: "30px",
    },
    textarea: {
        width: "100%",
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ddd",
        fontSize: "16px",
        resize: "vertical",
        boxSizing: "border-box",

    },
    button: {
        marginTop: "10px",
        padding: "12px 20px",
        backgroundColor: "#4CAF50",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        width: "100%",
        transition: "background-color 0.3s",
    },
    buttonHover: {
        backgroundColor: "#45a049",
    },
    messagesContainer: {
        marginTop: "20px",
    },
    messageCard: {
        backgroundColor: "black",
        borderRadius: "8px",
        padding: "15px",
        marginBottom: "15px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    },
    messageHeader: {
        fontSize: "14px",
        color: "#888",
        marginBottom: "5px",
    },
};

export default Forum;
