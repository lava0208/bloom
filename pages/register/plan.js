/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useRouter } from "next/router";

import styles from "~styles/pages/register/account.module.scss";

const Plan = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [size, setSize] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [firstDate, setFirstDate] = useState("");
  const [error, setError] = useState(false);

  const router = useRouter();
  
  const register = () => {
    if(name !== "" && location !== "" && size !== ""){
      router.push("/register/payment")
    }else{
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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className={styles.formDetailsContainer}>
          <div className={styles.detailsInputsContainer}>
            <input
              type="text"
              className={styles.input}
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <input
              type="text"
              className={styles.input}
              placeholder="Size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </div>
          <div className={styles.detailsLocationContainer}></div>
        </div>

        <input
          type="text"
          className={styles.input}
          placeholder="Last Frost date"
          value={lastDate}
          onChange={(e) => setLastDate(e.target.value)}
        />
        
        <input
          type="text"
          className={styles.input}
          placeholder="First Frost date"
          value={firstDate}
          onChange={(e) => setFirstDate(e.target.value)}
        />
        {
          error && (
            <p className={styles.errorText}>Please fill all fields.</p>
          )
        }
        
      </div>

      <div
        className={styles.nextButtonContainer}
        onClick={ () => register() }
      >
        <h5>Next</h5>
      </div>
    </div>
  );
};

export default Plan;
