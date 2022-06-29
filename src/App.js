import React, { useEffect, useState } from "react";
import Movie from "./components/Movie";

const BASE_URL = "https://api.themoviedb.org/3"
const FEATURED_API = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${process.env.REACT_APP_MOVIE_API_KEY}&page=1`;
const SEARCH_API = `${BASE_URL}/search/movie?&api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query=`;

function App() {
  const [ movies, setMovies ] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(FEATURED_API)
      .then(res => res.json())
      .then((data) => {
        setMovies(data.results);
    });
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      fetch(SEARCH_API + searchTerm)
        .then(res => res.json())
        .then((data) => {
          setMovies(data.results);
        });
      setSearchTerm('');
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <header>
        <span>TheMovieDB</span>
        <nav className="movie-menu">
          <ul>
            <li>Homepage</li>
            <li>Latest Movies</li>
            <li>Upcomming Movies</li>
          </ul>
        </nav>
        <ul className="movie-genres">
          <li>Action</li>
          <li>Drama</li>
          <li>Scifi</li>
        </ul>
        <form onSubmit={handleOnSubmit}>
          <input 
            className="search" 
            type="text" 
            placeholder="Search..." 
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
  </header>
      <div className="movie-container">
        {movies.length > 0 && movies.map((movie) => (
          <Movie key={movie.id} {...movie}/>
        ))}
      </div>
    </>
  );
}

export default App;