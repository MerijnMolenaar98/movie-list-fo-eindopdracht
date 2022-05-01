import React from "react";
import "./MovieResult.css";
import LikeButton from "../LikeButton/LikeButton";
import Rating from "../Rating/Rating";

function MovieResult({movieId, name, year, logo, showLiked, rating, ratingEditable}) {
    const username = sessionStorage.getItem("user");

    const onClick = (() => {
        window.location.pathname = "/movie/" + movieId;
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