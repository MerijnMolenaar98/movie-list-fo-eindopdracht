import React, {useState} from "react";
import "./UserResult.css";
import {arrayRemove, arrayUnion, doc, updateDoc} from "firebase/firestore";
import {getFireBaseDatabase} from "../../middleware/firebase";

function UserResult({name, following}) {
    const username = sessionStorage.getItem("user");
    const [followStatus, toggleFollowStatus] = useState(following);
    const searchUser = name;

    const follow = (async () => {
        await updateDoc(doc(getFireBaseDatabase(), "users", username), {
            following: arrayUnion(searchUser)
        });
        toggleFollowStatus(true);
    });

    const unFollow = (async () => {
        await updateDoc(doc(getFireBaseDatabase(), "users", username), {
            following: arrayRemove(searchUser)
        });

        toggleFollowStatus(false);
    });

    if (followStatus) {
        return (
            <div className="user-result">
                <span className="name">{name}</span>
                <button className="button" onClick={unFollow}>Ontvolgen</button>
            </div>
        );
    } else {
        return (
            <div className="user-result">
                <span className="name">{name}</span>
                <button className="button" onClick={follow}>Volgen</button>
            </div>
        );
    }
}

export default UserResult;