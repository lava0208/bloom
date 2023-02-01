/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useRouter } from "next/router";

import styles from "~styles/pages/register/account.module.scss";

const Farm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const router = useRouter();
  
  const register = () => {
    if(name !== "" && email !== "" && password !== ""){
      router.push("/register/plan")
    }else{
      setError(true);
    }
  }

  return (
    <div className={styles.screen}>
      <img className={styles.logo} src={"/assets/logo.png"} alt="logo" />
      <div className={styles.formContainer}>
        <h2>Setup your account.</h2>

        <div className={styles.formDetailsContainer}>
          <div className={styles.detailsInputsContainer}>
            <input
              type="text"
              className={styles.input}
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className={styles.input}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.detailsProfilePictureContainer}></div>
        </div>

        <input
          type="password"
          className={styles.input}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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

export default Farm;
