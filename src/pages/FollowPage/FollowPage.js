import React, {useState, useEffect} from "react";
import "./FollowPage.css";
import Button from "../../components/Button/Button";
import {doc, getDoc} from "firebase/firestore";
import {getFireBaseDatabase} from "../../middleware/firebase";
import UserResult from "../../components/UserResult/UserResult";

function FollowPage() {

    const [following, setFollowing] = useState([]);

    useEffect(() => {

        async function fetchData() {
            const username = sessionStorage.getItem("user");
            const docRef = doc(getFireBaseDatabase(), "users", username);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.get("following");
            } else {
                return [];
            }
        }

        const result = fetchData();
        result.then((values) => {
            setFollowing(values);
        });

    }, []);

    return (
      <div className="content">
        <h1>Volgen</h1>
          <div className="search-results">
              <div className="scroll-follow">
                  {following && following.map((value => (<UserResult key={value} name={value} following={true} />)))}
              </div>
          </div>
          <div className="user-search-button">
              <Button className="user-search=button" text={"Gebruikers zoeken"} target={"/user-search"} primary={true}/>
              <Button className="user-search=button" text={"Terug"} target={"/account"} primary={false}/>
          </div>
      </div>
    );
}

export default FollowPage;