import React, {useState} from "react";
import "./RegisterPage.css";
import Button from "../../components/Button/Button";
import {useForm} from "react-hook-form";
import { doc, setDoc, getDoc, Timestamp} from "firebase/firestore";
import {getFireBaseDatabase} from "../../middleware/firebase";

const db = getFireBaseDatabase();

async function usernameExists(username) {
    const docRef = doc(db, "users", username);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
}

function RegisterPage() {
    const [customError, setCustomError] = useState('');
    const {register, formState: { errors }, handleSubmit, getValues} = useForm();
    const signUp = (async (data) => {
        if (!await usernameExists(data.username)) {

            await setDoc(doc(db, "lists", data.username), {
                movies: []
            }).catch((e) => {
                console.error(e);
            });

            await setDoc(doc(db, "ratings", data.username), {
                movies: {}
            }).catch((e) => {
                console.error(e);
            });

            await setDoc(doc(db, "users", data.username), {
                created: Timestamp.fromDate(new Date()),
                following: [],
                password: data.password
            }).then(() => {
                window.location.pathname = "/";
            }).catch((e) => {
                console.error(e);
            });

        } else {
            setCustomError("Gebruikersnaam is al in gebruik.");
        }
    });
    return (
        <div className="content-register">
            <h1>Registeren</h1>
            <div className="register">
                <form onSubmit={handleSubmit(signUp)}>
                    <label htmlFor="username">Gebruikersnaam
                        <input
                            type="text"
                            id="username"
                            {...register("username", {
                                required: {
                                    value: true,
                                    message: "Dit veld mag niet leeg zijn!"
                                },
                            })}
                        /></label>
                    <p>{customError}</p>
                    {errors.username && <p>{errors.username.message}</p>}
                    <label htmlFor="password">Wachtwoord
                        <input
                            type="password"
                            id="password"
                            {...register("password", {
                                required: {value: true, message: "Dit veld mag niet leeg zijn!"},
                                minLength: {value: 8, message: "Wachtwoord moet minstens 8 characters bevatten."}
                            })}
                        />
                    </label>
                    {errors.password && <p>{errors.password.message}</p>}
                    <label htmlFor="repeat">Wachtwoord herhalen
                        <input
                            type="password"
                            id="repeat"
                            {...register("repeat", {
                                required: {value: true, message: "Dit veld mag niet leeg zijn!"},
                                minLength: {value: 8, message: "Wachtwoord moet minstens 8 characters bevatten."},
                                validate: (value) => value === getValues().password || "Wachtwoord moet hetzelfde zijn."
                            })}
                        />
                    </label>
                    {errors.repeat && <p>{errors.repeat.message}</p>}
                    <Button text="Registeren" primary="primary"/>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;