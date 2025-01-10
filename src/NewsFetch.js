//Added extra feature navigating to the details of the news title
import React, { Component, useState, useEffect } from "react";
import "./styles.css";

function NewsFetch() {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [url, setURL] = useState(
    `https://hn.algolia.com/api/v1/search?query=${searchQuery}`
  );
  //at first page wouldn't load so let's keep it false
  const [loading, setLoading] = useState(false);

  const fetchNews = () => {
    // set loading true after fetching
    setLoading(true);
    fetch(url)
      .then((result) => result.json())
      .then((data) => (setNews(data.hits), setLoading(false)))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchNews();
  }, [url]);

  const changeHandle = (e) => {
    setSearchQuery(e.target.value);
  };

  const submitHandle = (e) => {
    //to avoid reloading
    e.preventDefault();
    setURL(`https://hn.algolia.com/api/v1/search?query=${searchQuery}`);
  };
  //   console.log(url)

  const showLoading = () => (loading ? <h1>Loading...</h1> : "");

  const searchForm = () => (
    <form onSubmit={submitHandle}>
      <input type="text" value={searchQuery} onChange={changeHandle} />
      <button>Search</button>
    </form>
  );

  const showNews = () => news.map((value, i) => <p key={i}>{value.title}</p>);
  console.log(showNews());

  return (
    <div className="news-app">
      <header className="header">
        <h1>NEWS</h1>
      </header>
      <div className="content">
        <div className="loading">{showLoading}</div>
        <div className="search-form">
          <input
            type="text"
            placeholder="Search for news articles..."
            value={searchQuery}
            onChange={changeHandle}
          />
          <button onClick={submitHandle}>Search</button>
        </div>
        <div className="news-list">
          {news.map((value, i) => (
            <div className="news-flex-container">
                <div className="flex-inner-div">
              <p key={i}>{value.title}</p>
              <a
                href={value.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  backgroundColor: "#f0f0f0",
                  padding: "5px",
                  borderRadius: "8px",
                  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                }}
              >
                Read More
              </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsFetch;
