import React, {useState} from "react";
import "./LikeButton.css";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {arrayUnion, arrayRemove, doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {getFireBaseDatabase} from "../../middleware/firebase";

async function isLiked(username, movieId) {

    const docRef = doc(getFireBaseDatabase(), "lists", username);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const movies = docSnap.get("movies");
        if (movies.includes(movieId)) {
            return true;
        }
    } else {
        await setDoc(doc(getFireBaseDatabase(), "lists", username),
            {
                movies: []
            });
    }

    return false;
}

function LikeButton({movieId, username}) {

    const [liked, toggleLiked] = useState(false);

    const likeValue = isLiked(username, movieId);
    likeValue.then((value) => {
        toggleLiked(value);
    }).catch((e) => {
        console.error(e);
    });

    const dislike = (async () => {
        const ref = doc(getFireBaseDatabase(), "lists", username);
        const snap = await getDoc(ref)

        if (await snap.exists()) {
            await updateDoc(ref, {
                movies: arrayRemove(movieId)
            });
        }

        toggleLiked(false);

    });

    const like = (async () => {
        const ref = doc(getFireBaseDatabase(), "lists", username);
        const snap = await getDoc(ref)

        if (snap.exists()) {
            await updateDoc(ref, {
                movies: arrayUnion(movieId)
            });
        }

        toggleLiked(true);
    });

    if (liked) {
        return (<AiFillHeart color="#FF0000" size="30px" onClick={dislike}/>)
    } else {
        return (<AiOutlineHeart color="#FF0000" size="30px" onClick={like}/>)
    }
}

export default LikeButton;