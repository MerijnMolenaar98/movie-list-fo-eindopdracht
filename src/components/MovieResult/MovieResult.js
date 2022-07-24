import React from "react";
import "./MovieResult.css";
import LikeButton from "../LikeButton/LikeButton";
import Rating from "../Rating/Rating";
import {useHistory} from "react-router-dom";

function MovieResult({movieId, name, year, logo, showLiked, rating, ratingEditable}) {
    const username = sessionStorage.getItem("user");
    const history = useHistory();

    const onClick = (() => {
       history.push( "/movie/" + movieId);
    });

    return (
        <article>
            <img onClick={onClick} src={logo} alt="movie-poster" className="logo"/>
            <div onClick={onClick} className="movie-info-text">
                <div>{name}</div>
                <div>{year}</div>
            </div>
            <div className="rating-interest">
                {showLiked ? (<LikeButton movieId={movieId} username={username} />) : ('')}
                <Rating rating={rating} editable={ratingEditable} movieId={movieId}/>
            </div>
        </article>
    );
}

export default MovieResult;