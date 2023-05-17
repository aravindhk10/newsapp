import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState('general');

  const categories = [
    { name: 'General', value: 'general' },
    { name: 'Business', value: 'business' },
    { name: 'Entertainment', value: 'entertainment' },
    { name: 'Health', value: 'health' },
    { name: 'Science', value: 'science' },
    { name: 'Sports', value: 'sports' },
    { name: 'Technology', value: 'technology' },
  ];

  useEffect(() => {
    const fetchData = async (category) => {
      const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=5f12e3e98a5b4d7ea6c77c29ac9636d0`);
      setNews(response.data.articles);
    };
    fetchData(category);

    const intervalId = setInterval(() => {
      fetchData(category);
    }, 60000);

    return () => clearInterval(intervalId);
  }, [category]);

  return (
    <div className="app">
      <header className="header sticky">
        <h1>Latest News</h1>
        <div className="categories">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={category === cat.value ? 'active' : ''}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </header>
      <main className="main">
        <ul className="news">
          {news.map((article) => (
            <li key={article.title} className="news-item">
              <div className="news-image">
                <img src={article.urlToImage} alt={article.title} />
              </div>
              <div className="news-content">
                <h2 className="news-title">{article.title}</h2>
                <p className="news-description">{article.description}</p>
                <a className="news-read-more" href={article.url}>
                  Read more
                </a>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
