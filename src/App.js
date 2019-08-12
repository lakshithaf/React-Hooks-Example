import React , { useState, useEffect  } from "react";
import "./App.css";
import Header from "./components/Header";
import Movie from "./components/Movie";
import Search from "./components/Search";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
      fetchData();    
  }, []);


  const fetchData = async ()  =>{
    const response = await fetch(MOVIE_API_URL);
    const data = await response.json();
    setMovies(data.Search);
    setLoading(false);
  }

  const search = async searchValue => {
    setLoading(true);
    setErrorMessage(null);
    const response = await fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`);
    const data = await response.json();
    if (data.Response === "True") {
      setMovies(data.Search);
      setLoading(false);
    } else {
      setErrorMessage(data.Error);
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Header text="LTS TORRENTS" /> 
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
