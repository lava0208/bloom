/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { userService } from "services";

import styles from "~styles/components/sidebar.module.scss";

const Sidebar = () => {
    const [name, setName] = useState("");

    useEffect(() => {
        getUserPlan();
    }, [])

    const getUserPlan = async () => {
        const user = await userService.getById(userService.getId());
        if(user.data !== null){
            setName(user.data.name)
        }
    }

    const router = useRouter();

    const logout = () => {
        if (confirm('Are you sure you want to logout?')) {
            userService.removeUser();
            router.push("/account/login")
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <img src={"/assets/logo.png"} alt="logo" />
                <div
                    className={`${styles.link} ${router.pathname === "/masterplan" ? styles.active : styles.deactive
                        }`}
                    onClick={() => router.push("/masterplan")}
                >
                    <h3>2023 Plan</h3>
                </div>
            </div>
            <div className={styles.bottom}>
                <div
                    className={`${styles.link} ${router.pathname === "/" ? styles.active : null
                        }`}
                    onClick={() => router.push("/")}
                >
                    <h3>Dashboard</h3>
                </div>
                <div
                    className={`${styles.link} ${router.pathname === "/modifyplan" ? styles.active : null
                        }`}
                    onClick={() => router.push("/modifyplan")}
                >
                    <h3>Modify Plan</h3>
                </div>
                <div
                    className={`${styles.link} ${router.pathname === "/plantsettings" ? styles.active : null
                        }`}
                    onClick={() => router.push("/plantsettings")}
                >
                    <h3>Plant Settings</h3>
                </div>
                <div className={styles.accountContainer}>
                    <div className={styles.profilePicture} onClick={() => router.push("/profile")}></div>
                    <div className={styles.accountInfoContainer}>
                        <h4 onClick={() => router.push("/profile")}>{name}</h4>
                        <h5 onClick={() => logout()}>Log Out</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
