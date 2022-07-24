import React, {useState} from "react";
import "./LoginPage.css";
import Button from "../../components/Button/Button";
import {useForm} from 'react-hook-form';
import {Redirect, useHistory} from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";
import {getFireBaseDatabase} from "../../middleware/firebase";
import {AuthContext} from "../../context/AuthContextProvider";

async function validLogin(username, password) {
    const docRef = doc(getFireBaseDatabase(), "users", username);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
        if (docSnap.get("password") === password) {
            return true;
        }
    }
    return false;
}

function LoginPage() {
    const {register, formState: {errors}, handleSubmit} = useForm();
    const [customError, setCustomError] = useState('');
    const history = useHistory();
    const login = ((data) => {
        const result = validLogin(data.username, data.password)
        result.then((value) => {
            if (value) {
                sessionStorage.clear();
                sessionStorage.setItem('user', data.username);
                history.push("/search");
            } else {
                setCustomError("Inloggegevens zijn onjuist.");
            }
        }).catch((e) => {
            console.error(e);
        })
    });
    const user = sessionStorage.getItem('user');
    return (
        <AuthContext.Provider value={user}>
            {user !== null ? <Redirect to="/search" /> :
                <div className="content-login">
                    <h1>Inloggen</h1>
                    <div className="login">
                        <form onSubmit={handleSubmit(login)}>
                            <label htmlFor="username">Gebruikersnaam
                                <input
                                    type="text"
                                    id="username"
                                    {...register("username", {
                                        required: {
                                            value: true,
                                            message: "Dit veld mag niet leeg zijn!"
                                        }
                                    })}
                                /></label>
                            {errors.username && <p>{errors.username.message}</p>}
                            <label htmlFor="password">Wachtwoord
                                <input
                                    type="password"
                                    id="password"
                                    {...register("password", {
                                        required: {value: true, message: "Dit veld mag niet leeg zijn!"},
                                    })}
                                />
                            </label>
                            <p>{customError}</p>
                            <Button primary="primary" text="Inloggen"/>
                            <Button target="/register" text="Registeren"/>
                        </form>
                    </div>
                </div>
            }
        </AuthContext.Provider>
    );
}

export default LoginPage;