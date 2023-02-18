/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { userService } from "services";
import bcrypt from "bcryptjs";

import styles from "~styles/pages/profile.module.scss";

const Profile = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        email_newsletter: false,
        share_custom_varieties: false
    });
    const [isPro, setIsPro] = useState(false);

    const [originPassword, setOriginPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        const user = await userService.getById(userService.getId());
        if(user.data !== null){
            setOriginPassword(user.data.password);
            setUser(user.data);
        }
    }
    
    const saveUser = () => {
        bcrypt.compare(user.password, originPassword, async function (err, isMatch) {
            if (err, user.password === "") {
                setErrMsg("Fill all fields");
            } else if (!isMatch) {
                setErrMsg("Use correct password.");
            } else {
                setErrMsg(" ");
                const result = await userService.update(userService.getId(), user);
                if(result.status === true){
                    alert(result.message)
                }else{
                    setErrorText(result.message)
                }
            }
        });
    }

    const deleteUser = async () => {
        if (confirm('Are you sure you want to close this account?')) {
            await userService.delete(userService.getId());
            localStorage.removeItem("user");
            localStorage.removeItem("userid");
            router.push("/account/register");
        }
    }

    return (<>
        <h2 className={styles.subHeader}>Hello, {user.name}</h2>
        <div className={styles.profilesContainer}>
            <div className={styles.profileContainer}>
                <div className={styles.profileImage}></div>
                <h3>Change Photo</h3>
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={user.name}
                        onChange={(e) =>
                            setUser({ ...user, name: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        value={user.email}
                        onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                        }
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                        }
                    />
                    { 
                        errMsg && (
                            <p className={styles.errorText}>{errMsg}</p>
                        )
                    }
                    <button className={styles.button1} onClick={() => saveUser()}>Save Changes</button>
                </div>
                <div className={styles.preferenceContainer}>
                    <h3>Preferences</h3>
                    <div className={styles.flexContainers}>
                        <div className={styles.flexContainer}>
                            <input
                                type="checkbox"
                                id="emailNewsletter"
                                checked={user.email_newsletter}
                                onChange={(e) =>
                                    setUser({ ...user, email_newsletter: e.target.checked })
                                }
                            />
                            <label htmlFor="emailNewsletter">Email Newsletter</label>                        
                        </div>
                        <div className={styles.flexContainer}>
                            <input
                                type="checkbox"
                                id="shareCustomVarieties"
                                checked={user.share_custom_varieties}
                                onChange={(e) =>
                                    setUser({ ...user, share_custom_varieties: e.target.checked })
                                }
                            />
                            <label htmlFor="shareCustomVarieties">Share Custom Varieties</label>                        
                        </div>
                        <button className={styles.button1} onClick={() => saveUser()}>Save Changes</button>
                    </div>
                </div>
                <button className={styles.button2} onClick={() => deleteUser()}>Close Account</button>
            </div>
            <div className={styles.profileContainer}>
                {
                    !isPro && (
                        <>
                            <h2>Upgrade to PRO</h2>
                            <h1>$5</h1>
                            <h5>per month</h5>
                        </>
                    )
                }                
                <div className={styles.proContainer}>
                    <img src={"/assets/payment-pro.png"} alt="core" />
                    <h3>PRO Benefits</h3>
                    <div className={styles.benefitContainer}>
                        <h4>UNLIMITED Custom Varieties</h4>
                        <h4>PRIORITY Support</h4>
                        <h4>ACCESS to Variety Presets</h4>
                        <h4>UNLIMITED Season Plans</h4>
                    </div>
                </div>
                {
                    isPro ? (
                        <button className={styles.button3 + " " + styles.button4}>Access Priority Support</button>                        
                    ) : (
                        <button className={styles.button3} onClick={() => setIsPro(true)}>Upgrade Now</button>
                    )
                }                
                <button className={styles.button2} onClick={() => setIsPro(false)}>Cancel PRO</button>
            </div>
        </div>
        </>
    );
};

export default Profile;
