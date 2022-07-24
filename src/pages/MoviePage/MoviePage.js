import React, {useEffect, useState} from "react";
import "./MoviePage.css";
import {useParams} from "react-router-dom";
import {request} from "../../middleware/api";
import Button from "../../components/Button/Button";

function MoviePage() {
    const { id } = useParams();
    const [movieObject, setMovieObject] = useState({});

    useEffect(() => {

        async function fetchData() {
            return request({
                i: id
            });

        }

        const result = fetchData();
        result.then((values) => {
            setMovieObject(values);
        });

    }, [id]);


    return (
        <div className="content">
            <h2>{movieObject.Title}</h2>
            <hr />
            <div className="content-movie">
                <div className="information">
                    <span><span className="title">Jaar van uitgave:</span> {movieObject.Year}</span>
                    <span><span className="title">Regisseur:</span> {movieObject.Director}</span>
                    <span><span className="title">Acteurs:</span> {movieObject.Actors}</span>
                    <span><span className="title">Schrijver:</span> {movieObject.Writer}</span>
                    <span><span className="title">Genre:</span> {movieObject.Genre}</span>
                    <span><span className="title">Duur:</span> {movieObject.Runtime}</span>
                    <span><span className="title">Uitgebracht:</span> {movieObject.Released}</span>
                    <span><span className="title">Advies:</span> {movieObject.Rated}</span>
                    <span><span className="title">Taal:</span> {movieObject.Language}</span>
                    <span><span className="title">Land:</span> {movieObject.Country}</span>
                    <span><span className="title">Prijzen:</span> {movieObject.Awards}</span>
                    <span><span className="title">Plot:</span> {movieObject.Plot}</span>
                </div>
                <div className="information">
                    <img className="movie-poster" src={movieObject.Poster} alt="poster" />
                </div>
            </div>
            <Button primary={true} target="/search" text="Terug" />
        </div>
    );
}

export default MoviePage;