import React, { useState, useEffect } from "react";

import styles from "~styles/components/plantsettings/userSettings.module.scss";

const UserSettings = (props) => {
    const [userSettings, setUserSettings] = useState({
        name: "",
        last_frost: "",
        first_frost: "",
        location: ""
    });

    useEffect(() => {
        getUserPlan();
    }, [])

    const getUserPlan = async () => {
        const response = await fetch("/api/plans?userid=" + window.userid, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const result = await response.json();
        if(result.data !== null){
            setUserSettings(result.data);
        }
    }

    const saveSetting = async () => {
        await fetch("/api/plans?userid=" + window.userid, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userSettings),
        })
    }

    return (
        <div className={styles.userSettingsContainer}>
            <div className={styles.userSettingsPaper}>
                <div className={styles.userSettingsOptionsContainer}>
                    <h2>{userSettings && userSettings.name ? userSettings.name : "2023 Plan Settings"}</h2>
                    <div className={styles.userSettingsInputRow}>
                        <input
                            type="text"
                            placeholder="Last Frost"
                            value={userSettings.last_frost}
                            onChange={(e) => {
                                setUserSettings({
                                    ...userSettings,
                                    last_frost: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className={styles.userSettingsInputRow}>
                        <input
                            type="text"
                            placeholder="First Frost"
                            value={userSettings.first_frost}
                            onChange={(e) => {
                                setUserSettings({
                                    ...userSettings,
                                    first_frost: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className={styles.userSettingsInputRow}>
                        <input
                            type="text"
                            placeholder="Location"
                            value="Location"
                            readOnly
                        />
                    </div>
                    <div className={styles.userSettingsInputRow}>
                        <div className={styles.map}>
                            {userSettings.location ? userSettings.location.country + " " + userSettings.location.city : ""}
                        </div>
                    </div>
                </div>
                <button className={styles.settingsButton} onClick = {() => { saveSetting(), props.closePlanSettingsModal() }}>Save Changes</button>
                <button className={styles.settingsButton} onClick = {props.cancelSetting}>Cancel</button>
            </div>
        </div>
    );
};

export default UserSettings;
