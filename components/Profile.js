/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useRouter } from "next/router";

import styles from "~styles/pages/profile.module.scss";

const Profile = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [preference, setPreference] = useState({
        emailNewsletter: false,
        shareCustomVarieties: false
    })
    const [isPro, setIsPro] = useState(false);
    return (
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
                        type="text"
                        placeholder="Password"
                        value={user.password}
                        onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                        }
                    />
                    <button className={styles.button1}>Save Changes</button>
                </div>
                <div className={styles.preferenceContainer}>
                    <h3>Preferences</h3>
                    <div className={styles.flexContainers}>
                        <div className={styles.flexContainer}>
                            <input
                                type="checkbox"
                                id="emailNewsletter"
                                value={preference.emailNewsletter}
                                onChange={(e) =>
                                    setPreference({ ...preference, emailNewsletter: e.target.value })
                                }
                            />
                            <label htmlFor="emailNewsletter">Email Newsletter</label>                        
                        </div>
                        <div className={styles.flexContainer}>
                            <input
                                type="checkbox"
                                id="shareCustomVarieties"
                                value={preference.shareCustomVarieties}
                                onChange={(e) =>
                                    setPreference({ ...preference, shareCustomVarieties: e.target.value })
                                }
                            />
                            <label htmlFor="shareCustomVarieties">Share Custom Varieties</label>                        
                        </div>
                        <button className={styles.button1}>Save Changes</button>
                    </div>
                </div>
                <button className={styles.button2} onClick={() => router.push("/account/login")}>Close Account</button>
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
    );
};

export default Profile;
