import React, {useState} from "react";
import "./SearchPage.css";
import MovieResult from "../../components/MovieResult/MovieResult";
import {request} from "../../middleware/api";
import {getRatingForUser} from "../../middleware/firebase";

function SearchPage() {
    const [searchResults, setSearchResults] = useState({});
    const username = sessionStorage.getItem("user");

    const onKeyDown = ((e) => {
        if (e.key === "Enter") {
            let parameters = {
                s: e.target.value
            };
            let result = request(parameters);
            result.then((result) => {
                setSearchResults(result.Search);
            });

        }
    });

    let movieResults;
    if (searchResults.length === undefined) {
        movieResults = <p>Geen resultaten gevonden</p>
    } else {
        movieResults = searchResults.map((movie) => (<MovieResult key={movie.imdbID} movieId={movie.imdbID} name={movie.Title}
                                                                  year={movie.Year} logo={movie.Poster} showLiked={true}
                                                                  rating={getRatingForUser(username, movie.imdbID)}
                                                                  ratingEditable={true} />));
    }

    return (
        <div className="content">
            <h1>Zoeken</h1>
            <div className="search-area">
                <label htmlFor="search">Druk op enter om te zoeken:
                    <input id="search" onKeyDown={onKeyDown} placeholder="Zoeken" />
                </label>
            </div>
            <div className="search-results">
                <div className="scroll-search">
                    {movieResults}
                </div>
            </div>
        </div>
    );
}

export default SearchPage;