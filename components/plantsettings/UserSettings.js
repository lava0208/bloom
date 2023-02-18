import React, { useState, useEffect } from "react";
import { userService, planService } from "services";

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
        const result = await planService.getByUserId(userService.getId());
        if(result.data !== null){
            setUserSettings(result.data);
        }
    }

    const saveSetting = async () => {
        if (confirm('Do you want to update your plan?')) {
            const result = await planService.update(userService.getId(), userSettings);
            if(result.status === true){
                props.closePlanSettingsModal();
            }
        }
    }

    return (
        <div className={styles.userSettingsContainer}>
            <div className={styles.userSettingsPaper}>
                <div className={styles.userSettingsOptionsContainer}>
                    <h2 className="text-center">{userSettings && userSettings.name ? userSettings.name : "2023 Plan Settings"}</h2>
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
                <button className={styles.settingsButton} onClick = {() => { saveSetting() }}>Save Changes</button>
                <button className={styles.settingsButton} onClick = {props.cancelSetting}>Cancel</button>
            </div>
        </div>
    );
};

export default UserSettings;
