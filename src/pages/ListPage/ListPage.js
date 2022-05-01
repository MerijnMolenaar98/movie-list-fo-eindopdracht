import React, {useEffect, useState} from "react";
import "./ListPage.css";
import MovieResult from "../../components/MovieResult/MovieResult";
import {doc, getDoc} from "firebase/firestore";
import {getAverageRating, getFireBaseDatabase} from "../../middleware/firebase";
import {request} from "../../middleware/api";

function ListPage() {
    const myList = "my-list";
    const following = "following";
    const [movies, setMovies] = useState([]);
    const [followChoice, setFollowChoice] = useState(myList);

    useEffect(() => {

        async function fetchData() {
            const username = sessionStorage.getItem("user");

            if (followChoice === myList) {
                const docRef = doc(getFireBaseDatabase(), "lists", username);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    if (docSnap.get("movies").length !== 0) {
                        return await Promise.all(docSnap.get("movies").map(async (movie) => {
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
                        }));
                    }
                }
            } else {
                const docRef = doc(getFireBaseDatabase(), "users", username);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    let followedByUser = docSnap.get("following");
                    return await Promise.all(followedByUser.map(async (person) => {
                        let docRefPerson = doc(getFireBaseDatabase(), "lists", person);
                        let docSnapPerson = await getDoc(docRefPerson);
                        if (docSnapPerson.exists()) {
                            if (docSnapPerson.get("movies").length !== 0) {
                                return await Promise.all(docSnapPerson.get("movies").map(async (movie) => {
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
                                })).then((value) => {
                                    return value[0];
                                });
                            }
                        }
                    }));
                }
            }
        }

        let result = fetchData();
        result.then((values) => {
            values.filter(value => value !== undefined);
            setMovies(values);
        });

    }, [followChoice]);

    const onChange = ((e) => {
        setFollowChoice(e.target.value);
    });

    return (
        <div className="content">
            <div className="page-top">
                <h1>Mijn lijst</h1>
                <select onChange={onChange}>
                    <option value={myList}>Mijn lijst</option>
                    <option value={following}>Volgend</option>
                </select>
            </div>
            <div className="search-results">
                <div className="scroll">
                    {movies && movies.map((movie) => (<MovieResult key={movie.imdbID} movieId={movie.imdbID}
                                                                   name={movie.Title} year={movie.Year}
                                                                   logo={movie.Poster} showLiked={true}
                                                                   rating={getAverageRating(movie.imdbID)}
                                                                   ratingEditable={false}/>))}
                </div>
            </div>
        </div>
    );

}

export default ListPage;