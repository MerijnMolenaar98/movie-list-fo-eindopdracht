import React, {useEffect, useState} from "react";
import "./RatingPage.css";
import MovieResult from "../../components/MovieResult/MovieResult";
import {getFireBaseDatabase, getRatingForUser} from "../../middleware/firebase";
import {doc, getDoc} from "firebase/firestore";
import {request} from "../../middleware/api";

function RatingPage() {
    const [movies, setMovies] = useState([]);
    const username = sessionStorage.getItem("user");

    useEffect(() => {

        async function fetchData() {
            let movieArray = [];
            const username = sessionStorage.getItem("user");
            const docRef = doc(getFireBaseDatabase(), "ratings", username);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                if (docSnap.get("movies") !== {}) {
                    return await Promise.all(Object.keys(docSnap.get("movies")).map(async (movie) => {
                        let movieObject = request({
                            i: movie
                        });
                        try {
                            movieObject.then((movie) => {
                                if (movie !== undefined) {
                                    return movie;
                                }
                            });
                        } catch (e) {
                            console.error(e);
                        }
                        return movieObject;
                    })).finally(() => {
                        return movieArray;
                    });
                }
            }
        }

        const result = fetchData();
        result.then((values) => {
            setMovies(values);
        });

    }, []);

    return (
        <div className="content">
            <h1>Rating</h1>
            <div className="search-results">
                <div className="scroll">
                    {movies.map((movie) => (<MovieResult key={movie.imdbID} movieId={movie.imdbID}
                                                         name={movie.Title} year={movie.Year} logo={movie.Poster} showLiked={false} rating={getRatingForUser(username, movie.imdbID)}
                                                         ratingEditable={true}/>))}
                </div>
            </div>
        </div>
    );
}

export default RatingPage;