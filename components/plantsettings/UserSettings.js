import React, { useState, useEffect } from "react";
import { userService, planService } from "services";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GoogleMap, LoadScript } from '@react-google-maps/api';

import styles from "~styles/components/plantsettings/userSettings.module.scss";

const containerStyle = {
    width: '100%',
    height: '100%'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

const UserSettings = (props) => {
    const [userSettings, setUserSettings] = useState({
        name: "",
        last_frost: new Date(),
        first_frost: new Date(),
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

    const dateFormat = (date) =>{
        return moment(date).format("YYYY/MM/DD")
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
                        <DatePicker
                            placeholder="Last Frost"
                            value={dateFormat(userSettings.last_frost)}
                            selected={new Date(userSettings.last_frost)}
                            format='YYYY/MM/DD'
                            onChange={(e) => {
                                setUserSettings({
                                    ...userSettings,
                                    last_frost: e,
                                });
                            }}
                        />
                    </div>
                    <div className={styles.userSettingsInputRow}>
                        <DatePicker
                            placeholder="First Frost"
                            value={dateFormat(userSettings.first_frost)}
                            selected={new Date(userSettings.first_frost)}
                            format='YYYY/MM/DD'
                            onChange={(e) => {
                                setUserSettings({
                                    ...userSettings,
                                    first_frost: e,
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
                            {/* {userSettings.location ? userSettings.location.country + " " + userSettings.location.city : ""} */}
                            <LoadScript
                                googleMapsApiKey={process.env.GOOGLE_MAP_KEY}
                            >
                                <GoogleMap
                                    mapContainerStyle={containerStyle}
                                    center={center}
                                    zoom={10}
                                >
                                    { /* Child components, such as markers, info windows, etc. */}
                                    <></>
                                </GoogleMap>
                            </LoadScript>
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
