import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import "../style.css";

const NewsComponent = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [searchInput, setSearchInput] = useState('');

  const articlePerPage = 20;
  const query = searchParams.get('q') || 'India';
  let pgno = parseInt(searchParams.get('pgno')) || 1;
  if (isNaN(pgno) || pgno < 1) pgno = 1;

  useEffect(() => {
    setSearchInput(query); // Keep input in sync with query
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=${query}&language=en&apiKey=ea16c3261f734d2481f1f6aece178fb7&pageSize=${articlePerPage}&page=${pgno}`
        );
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setArticles(data.articles);
        setTotalResults(data.totalResults);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchNews();
  }, [query, pgno]);

  const totalPages = Math.ceil(totalResults / articlePerPage);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`?q=${searchInput.trim()}&pgno=1`);
    }
  };

  return (
    <div className="container">
      <h4 className="text-center m-3">
        {query} - Latest-News ({totalResults})
      </h4>

      
      <form className="d-flex justify-content-center mb-4" onSubmit={handleSearch}>
        <input
          className="form-control w-50 me-2"
          type="search"
          placeholder="Search news..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="btn btn-theme" type="submit">
          Search
        </button>
      </form>

  
      <div className="d-flex flex-wrap justify-content-center">
      {articles.length === 0 ? (
  Array.from({ length: 8 }).map((_, i) => (
    <div className="card m-3" style={{ width: '18rem' }} key={i}>
      <div className="placeholder-glow">
        <div className="card-img-top placeholder" style={{ height: '190px' }}></div>
        <div className="card-body d-flex flex-column">
          <span className="placeholder col-6 mb-2"></span>
          <h5 className="card-title placeholder-glow">
            <span className="placeholder col-8"></span>
          </h5>
          <p className="placeholder-glow mb-2">
            <span className="placeholder col-7"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-6"></span>
            <span className="placeholder col-5"></span>
          </p>
          <a className="btn btn-primary mt-auto disabled placeholder col-6"></a>
        </div>
      </div>
    </div>
  ))
) : (
  articles.map((item, idx) => (
    <div key={idx} className="card m-3 news-card">
      <img src={item.urlToImage} className="card-img-top" alt="news" />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{item.title}</h5>
        <p className="card-text">
          {item.description
            ? item.description.slice(0, 120) + '...'
            : 'No description available.'}
        </p>
        <a
          href={item.url}
          className="btn btn-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read More
        </a>
      </div>
    </div>
  ))
)}

      </div>

    
      <div className="d-flex justify-content-center my-4">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className={`page-item ${pgno === 1 ? 'disabled' : ''}`}>
              <a className="page-link" href={`?q=${query}&pgno=${pgno - 1}`}>
                Previous
              </a>
            </li>
            <li className={`page-item ${pgno === totalPages ? 'disabled' : ''}`}>
              <a className="page-link" href={`?q=${query}&pgno=${pgno + 1}`}>
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NewsComponent;
