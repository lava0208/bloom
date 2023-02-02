import React, { useState } from "react";

import styles from "~styles/components/plantsettings/userSettings.module.scss";

const UserSettings = (props) => {
    const [userSettings, setUserSettings] = useState({
        lastFrost: "",
        firstFrost: "",
        location: ""
    });

    return (
        <div className={styles.userSettingsContainer}>
            <div className={styles.userSettingsPaper}>
                <div className={styles.userSettingsOptionsContainer}>
                    <h2>2023 Plan Settings</h2>
                    <div className={styles.userSettingsInputRow}>
                        <input
                            type="text"
                            placeholder="Last Frost"
                            value={userSettings.lastFrost}
                            onChange={(e) => {
                                setUserSettings({
                                    ...userSettings,
                                    lastFrost: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className={styles.userSettingsInputRow}>
                        <input
                            type="text"
                            placeholder="First Frost"
                            value={userSettings.firstFrost}
                            onChange={(e) => {
                                setUserSettings({
                                    ...userSettings,
                                    firstFrost: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className={styles.userSettingsInputRow}>
                        <input
                            type="text"
                            placeholder="Location"
                            value={userSettings.location}
                            onChange={(e) => {
                                setUserSettings({
                                    ...userSettings,
                                    location: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className={styles.userSettingsInputRow}>
                        <div className={styles.map}></div>
                    </div>
                </div>
                <button className={styles.settingsButton} onClick = {props.saveSetting}>Save Changes</button>
                <button className={styles.settingsButton} onClick = {props.cancelSetting}>Cancel</button>
            </div>
        </div>
    );
};

export default UserSettings;
