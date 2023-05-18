import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState('general');
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=acde7d5bdaa049debf38220165043dd3`
      );
      setNews(response.data.articles);
    };
    fetchData(category);

    const intervalId = setInterval(() => {
      fetchData(category);
    }, 60000);

    return () => clearInterval(intervalId);
  }, [category]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const playSummary = (summary) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(summary);
      window.speechSynthesis.speak(speech);
    } else {
      console.log('Text-to-speech is not supported in this browser.');
    }
  };

  const handleShare = async (title, url) => {
    try {
      await navigator.share({
        title,
        url,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery) {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=5f12e3e98a5b4d7ea6c77c29ac9636d0`
        );
        setNews(response.data.articles);
      } catch (error) {
        console.log('Error searching:', error);
      }
    }
  };

  return (
    <div className="container">
      <header className="header">
        <div className="toggle-switch">
          <input
            type="checkbox"
            id="darkModeToggle"
            checked={darkMode}
            onChange={toggleDarkMode}
          />
          <label htmlFor="darkModeToggle" className="toggle-label"></label>
        </div>
        <h1 className="header-title">Latest News</h1>
        <div className="categories">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`category-button ${category === cat.value ? 'active' : ''}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </header>
      <main className="main">
        <div className="news">
          {news.map((article) => (
            <div key={article.title} className="news-item">
              <div className="news-image">
                <img src={article.urlToImage} alt={article.title} />
              </div>
              <div className="news-content">
                <h2 className="news-title">{article.title}</h2>
                <p className="news-description">{article.description}</p>
                <div className="news-share">
                  <button
                    className="news-share-button"
                    onClick={() => handleShare(article.title, article.url)}
                  >
                    Share
                  </button>
                </div>
                <button
                  className="news-summary-button"
                  onClick={() => playSummary(article.description)}
                >
                  Play Summary
                </button>
                <a className="news-read-more" href={article.url}>
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
