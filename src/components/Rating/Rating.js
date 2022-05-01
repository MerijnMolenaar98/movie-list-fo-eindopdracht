import React, {useState, useEffect} from "react";
import "./Rating.css";
import {AiFillStar, AiOutlineStar} from "react-icons/ai";
import {doc,updateDoc} from "firebase/firestore";
import {getFireBaseDatabase} from "../../middleware/firebase";

function Rating({movieId, rating, editable}) {
    const maxScore = 5;
    const username = sessionStorage.getItem("user");
    const [emptyStars, setEmptyStars] = useState(maxScore);
    const [currentRating, setNewRating] = useState(1);

    useEffect(() => {
        rating.then((value) => {
            setNewRating(value)
            setEmptyStars(maxScore - value);
        });
    }, [rating]);

    const click = (async (movieId, rating) => {
        const docRef = doc(getFireBaseDatabase(), "ratings", username);
        const key = "movies." + movieId;
        await updateDoc(docRef, {
            [key]: rating
        }).then(() => {
            setNewRating(rating);
            setEmptyStars(maxScore - rating);
        });

    });

    if (editable) {
        return (
            <div className="rating">
                {Array(currentRating).fill(1).map((el, i) =>
                    <AiFillStar key={i} id={i.toString()} color="#a6a60c" size="30px" onClick={() => {
                        click(movieId, i + 1);
                    }}/>
                )}
                {Array(emptyStars).fill(1).map((el, i) =>
                <AiOutlineStar key={i + currentRating} id={(i + currentRating).toString()} color="#a6a60c" size="30px" onClick={() => {
                        click(movieId, i + currentRating + 1);
                    }}/>
                )}
            </div>
        )
    } else {
        return (
          <div className="rating">
              {Array(currentRating).fill(1).map((el, i) =>
                  <AiFillStar key={i} id={i.toString()} color="#a6a60c" size="30px"/>
              )}
              {Array(emptyStars).fill(1).map((el, i) =>
                  <AiOutlineStar key={i + currentRating} id={(i + currentRating).toString()} color="#a6a60c" size="30px"/>
              )}
          </div>
        );
    }
}

export default Rating;