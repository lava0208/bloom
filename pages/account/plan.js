/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useRouter } from "next/router";

import styles from "~styles/pages/account/register.module.scss";

const Plan = () => {
    const [plan, setPlan] = useState({
        userid: window.userid,
        name: "",
        location: "",
        size: "",
        last_frost: "",
        first_frost: ""
    });
    const [error, setError] = useState(false);

    const router = useRouter();

    const register = async () => {
        if (plan.name !== "" && plan.location !== "" && plan.size !== "") {
            const response = await fetch("/api/plans", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(plan),
            })
            const result = await response.json();
            if(result.status === true){
                router.push("/account/payment")
            }else{
                setError(true);
            }      
        } else {
            setError(true);
        }
    }

    return (
        <div className={styles.screen}>
            <img className={styles.logo} src={"/assets/logo.png"} alt="logo" />
            <div className={styles.formContainer}>
                <h2>Tell us about your plan.</h2>

                <input
                    type="text"
                    className={styles.input}
                    placeholder="Name"
                    value={plan.name}
                    onChange={(e) => {
                        setPlan({
                            ...plan,
                            name: e.target.value,
                        });
                    }}
                />

                <div className={styles.formDetailsContainer}>
                    <div className={styles.detailsInputsContainer}>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Location"
                            value={plan.location}
                            onChange={(e) => {
                                setPlan({
                                    ...plan,
                                    location: e.target.value,
                                });
                            }}
                        />
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Size"
                            value={plan.size}
                            onChange={(e) => {
                                setPlan({
                                    ...plan,
                                    size: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className={styles.detailsLocationContainer}></div>
                </div>

                <input
                    type="text"
                    className={styles.input}
                    placeholder="Last Frost date"
                    value={plan.last_frost}
                    onChange={(e) => {
                        setPlan({
                            ...plan,
                            last_frost: e.target.value,
                        });
                    }}
                />

                <input
                    type="text"
                    className={styles.input}
                    placeholder="First Frost date"
                    value={plan.first_frost}
                    onChange={(e) => {
                        setPlan({
                            ...plan,
                            first_frost: e.target.value,
                        });
                    }}
                />
                {
                    error && (
                        <p className={styles.errorText}>Please fill all fields.</p>
                    )
                }

            </div>

            <div
                className={styles.nextButtonContainer}
                onClick={() => register()}
            >
                <h5>Next</h5>
            </div>
        </div>
    );
};

export default Plan;
