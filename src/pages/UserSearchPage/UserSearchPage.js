import React, {useState} from "react";
import "./UserSearchPage.css";
import Button from "../../components/Button/Button";
import {doc, getDoc} from "firebase/firestore";
import {getFireBaseDatabase} from "../../middleware/firebase";
import UserResult from "../../components/UserResult/UserResult";

function UserSearchPage() {
    const username = sessionStorage.getItem("user");
    const [searchResults, setSearchResults] = useState([]);

    const onKeyDown = (async (e) => {
        if (e.key === "Enter") {
            let name = e.target.value;
            let currentlyFollowing = getDoc(doc(getFireBaseDatabase(), "users", username)).then((value) => {
               if (value.exists()) {
                   return value.get("following");
               } else {
                   return [];
               }
            });
            await getDoc(doc(getFireBaseDatabase(), "users", name)).then((value) => {
               if (username !== name && value.exists()) {
                   currentlyFollowing.then((value) => {
                      if (!value.includes(name)) {
                          setSearchResults([name]);
                      }
                   })
               }
            });
        }
    });

    return (
        <div className="content">
            <h1>Gebruikers zoeken</h1>
            <div className="search-area">
                <label htmlFor="search">Druk op enter om te zoeken:
                    <input id="search" onKeyDown={onKeyDown} placeholder="Zoeken" />
                </label>
            </div>
            <div className="search-results">
                <div className="scroll-user-search">
                    {searchResults && searchResults.map((value) => (<UserResult key={value} name={value} following={false}/>))}
                </div>
            </div>
            <div className="user-search-button">
                <Button className="user-search=button" text={"Terug"} target={"/follow"} primary={false}/>
            </div>
        </div>
    );
}

export default UserSearchPage;