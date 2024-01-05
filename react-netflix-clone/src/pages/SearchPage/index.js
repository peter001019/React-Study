import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../api/axios";
import "./SearchPage.css"

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);

  const useQuery = () => {
    //URL에서 parameter가져오기
    console.log(useLocation());
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  console.log(query);
  const searchTerm = query.get("q");

  useEffect(() => {
    if (searchTerm) {
      fetchSearchMovie(searchTerm);
    }
  }, [searchTerm]);

  const fetchSearchMovie = async (searchTerm) => {
    try {
      const requests = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      );
      setSearchResults(requests.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
        <section className="search-container">
          {searchResults.map((movie) => {
            if (movie.backdrop_path !== null && movie.media_type !== "person") {
              const movieImageUrl =
                "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
              return (
                <div className="movie">
                  <div className="movie__column-poster">
                    <img src={movieImageUrl} alt="" className="movie__poster" />
                  </div>
                </div>
              );
            }
          })}
        </section>
      ) : (
        <section className="no-results">
          <div className="no-results__text">
            <p>Your search for "{searchTerm}" did not have any matches.</p>
            <p>Suggestions:</p>
            <ul>
              <li>Try different keywords</li>
            </ul>
          </div>
        </section>
      )
  };

  return renderSearchResults();
}
