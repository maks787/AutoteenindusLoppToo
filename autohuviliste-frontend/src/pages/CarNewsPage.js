import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewsFeed = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/rss-news')
            .then(response => {
                setNews(response.data);
            })
            .catch(error => {
                console.error('Viga uudiste laadimisel:', error);
            });
    }, []);

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {news.map((item, index) => (
                <div key={index} style={{ width: '300px', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
                    {item.imageUrl && (
                        <img src={item.imageUrl} alt="news" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                    )}
                    <div style={{ padding: '10px' }}>
                        <h3 style={{ fontSize: '18px' }}>{item.title}</h3>
                        <p style={{ fontSize: '14px', color: '#777' }}>{item.pubDate}</p>
                        <a href={item.link} target="_blank" rel="noopener noreferrer">Loe edasi</a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NewsFeed;
