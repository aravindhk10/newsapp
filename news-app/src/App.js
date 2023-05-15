import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://newsapi.org/v2/top-headlines?country=in&apiKey=acde7d5bdaa049debf38220165043dd3');
      setNews(response.data.articles);
    };
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <h1>Latest News</h1>
      <div className="container">
        {news.map(article => (
          <div className="article" key={article.title}>
            <img src={article.urlToImage} alt={article.title} />
            <div className="content">
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <a href={article.url}>Read more</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
