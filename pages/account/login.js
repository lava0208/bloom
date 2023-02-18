/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useRouter } from "next/router";
import { userService } from "services";

import styles from "~styles/pages/account/register.module.scss";

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState("");

    const router = useRouter();
    const emailValidation = () => {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (regex.test(user.email) === false) {
            setError(true);
            setErrorText("Email is not valid");
            return false;
        }
        return true;
    }

    const login = async () => {
        if (user.email !== "" && user.password !== "") {
            if (emailValidation()) {
                const result = await userService.login(user);
                if(result.status === true){
                    await userService.setId(result.data[0]._id);
                    router.push("/")
                }else{
                    setError(true);
                    setErrorText(result.message)
                }
            }
        } else {
            setError(true);
            setErrorText("Please fill all fields.");
        }
    }

    return (
        <div className={styles.screen}>
            <img className={styles.logo} src={"/assets/logo.png"} alt="logo" />
            <div className={styles.formContainer}>
                <h2>Login with your account.</h2>

                <div className={styles.formDetailsContainer}>
                    <div className={styles.detailsInputsContainer}>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Email"
                            value={user.email}
                            onChange={(e) => {
                                setUser({
                                    ...user,
                                    email: e.target.value,
                                });
                            }}
                        />
                    </div>
                </div>

                <input
                    type="password"
                    className={styles.input}
                    placeholder="Password"
                    value={user.password}
                    onChange={(e) => {
                        setUser({
                            ...user,
                            password: e.target.value,
                        });
                    }}
                />
                {
                    error && (
                        <p className={styles.errorText}>{errorText}</p>
                    )
                }
                <h4><a onClick={() => router.push('/account/register')}>Click here </a> to register a new account.</h4>
            </div>

            <div
                className={styles.nextButtonContainer}
                onClick={() => login()}
            >
                <h5>Next</h5>
            </div>
        </div>
    );
};

export default Login;
