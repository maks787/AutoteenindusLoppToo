const express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());

const getImageFromDescription = (description) => {
    const match = description.match(/<img[^>]+src="([^">]+)"/);
    return match ? match[1] : null;
};

app.get('/rss-news', async (req, res) => {
    const rssUrl = 'https://www.motor1.com/rss/category/aftermaket-tuning/';

    try {
        const response = await axios.get(rssUrl);
        const parsedData = await xml2js.parseStringPromise(response.data, { mergeAttrs: true });
        const items = parsedData.rss.channel[0].item;

        const newsItems = items.map(item => {
            const description = item.description ? item.description[0] : '';
            const imageUrl = getImageFromDescription(description);

            return {
                title: item.title[0],
                link: item.link[0],
                description: description,
                pubDate: item.pubDate ? item.pubDate[0] : '',
                imageUrl: imageUrl,
            };
        });

        res.json(newsItems);
    } catch (error) {
        console.error('Error fetching RSS feed:', error);
        res.status(500).json({ error: 'Failed to fetch RSS feed' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
