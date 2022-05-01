import React, {useState} from "react";
import "./AccountPage.css";
import Button from "../../components/Button/Button";
import {doc, getDoc, deleteDoc, updateDoc, setDoc} from "firebase/firestore";
import {getFireBaseDatabase} from "../../middleware/firebase";

async function getRegisterDate() {
    let username = sessionStorage.getItem('user');
    const docRef = doc(getFireBaseDatabase(), "users", username);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap;
    } else {
        return null;
    }
}

function AccountPage() {
    const [registerDate, setRegisterDate] = useState('');
    const username = sessionStorage.getItem("user");
    let dateResult = getRegisterDate();
    dateResult.then((result) => {
        const timestamp = result.get("created");
        const date = timestamp.toDate();
        const readableDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        setRegisterDate(readableDate);
    })

    async function usernameExists(username) {
        const docRef = doc(getFireBaseDatabase(), "users", username);
        const docSnap = await getDoc(docRef);
        return docSnap.exists();
    }

    const changeUsername = (async () => {
        let newAccountName = prompt("Voer je nieuwe gebruikersnaam in.");
        let repeat = prompt("Voer je nieuwe gebruikersnaam opnieuw in.")
        if (newAccountName === repeat) {
            if (!await usernameExists(newAccountName)) {
                let previousUserInformation = getDoc(doc(getFireBaseDatabase(), "users", username));
                let created = (await previousUserInformation).get("created");
                let following = (await previousUserInformation).get("following");
                let password = (await previousUserInformation).get("password");
                let previousRatingInformation = getDoc(doc(getFireBaseDatabase(), "ratings", username));
                let ratingMovies  = (await previousRatingInformation).get("movies");
                let previousListsInformation = getDoc(doc(getFireBaseDatabase(), "lists", username));
                let listsMovies = (await previousListsInformation).get("movies");
                await setDoc(doc(getFireBaseDatabase(), "users", newAccountName), {
                    created: created,
                    following: following,
                    password: password
                }).then(async () => {
                    await setDoc(doc(getFireBaseDatabase(), "lists", newAccountName), {
                        movies: listsMovies
                    }).then(() => {
                        setDoc(doc(getFireBaseDatabase(), "ratings", newAccountName), {
                            movies: ratingMovies
                        }).then(() => {
                            deleteAccount(username).then(() => {
                                sessionStorage.setItem("user", newAccountName);
                            });
                        });
                    });
                });
            } else {
                alert("Gebruikersnaam bestaat al.")
            }
        }
    });

    const changePassword = (() => {
        let newPassword = prompt("Voer nieuw wachtwoord in.");
        let repeat = prompt("Herhaal het nieuwe wachtwoord.");
        if (newPassword.length < 8) {
            alert("Wachtwoord moet minstens 8 tekens lang zijn.")
        } else if (newPassword !== repeat) {
            alert("Voer 2 keer hetzelfde wachtwoord in.");
        } else {
            updateDoc(doc(getFireBaseDatabase(), "users", sessionStorage.getItem("user")), {
                password: newPassword
            }).then(() => {
                sessionStorage.clear();
                window.location.pathname = "/";
            });
        }
    });

    const resetAccount = (async () => {
        let accountName = prompt("Voer je gebruikersnaam in om te bevestigen.");
        if (accountName === username) {
            const docRatingRef = doc(getFireBaseDatabase(), "ratings", username);
            await updateDoc(docRatingRef, {
                movies: {}
            }).then(async () => {
                const docListsRef = doc(getFireBaseDatabase(), "lists", username);
                await updateDoc(docListsRef, {
                    movies: []
                }).then(() => {
                    window.location.pathname = "/account";
                });
            });
        }
    });

    const removeAccount = (async () => {
        let accountName = prompt("Voer je gebruikersnaam in om te bevestigen.");
        if (accountName === username) {
            await deleteAccount(username).then(() => {
                sessionStorage.clear();
                window.location.pathname = "/";
            });
        }
    });

    async function deleteAccount(username) {
        await deleteDoc(doc(getFireBaseDatabase(), "ratings", username)).then(async () => {
            await deleteDoc(doc(getFireBaseDatabase(), "lists", username)).then(async () => {
                await deleteDoc(doc(getFireBaseDatabase(), "users", username));
            });
        });
    }

    return (
        <div className="content">
            <h1>Account</h1>
            <div className="options">
                <div className="option-group">
                    <Button text="Volgend" primary="primary" target="/follow"/>
                    <Button text="Verander gebruikersnaam" primary="primary" onClick={changeUsername}/>
                    <Button text="Verander wachtwoord" primary="primary" onClick={changePassword}/>
                </div>
                <div className="option-group">
                    <p className="creation-text">Account gemaakt op: {registerDate}</p>
                    <Button text="Reset account" primary="primary" onClick={resetAccount}/>
                    <Button text="Verwijder account" primary="primary" onClick={removeAccount}/>
                </div>

            </div>
        </div>
    );
}

export default AccountPage;