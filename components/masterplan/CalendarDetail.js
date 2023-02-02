import React, { useState } from "react";

import styles from "~styles/components/masterplan/calendardetail.module.scss";

const CalendarDetail = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.calendarTitle}>
                <h3>{props.schedule.title}</h3>
                <h5>{props.schedule.description}</h5>
            </div>
            <div className={styles.eventContainer}>
                <div className={styles.noteContainer}>
                    <div className={styles.noteImage}></div>
                    <div className={styles.noteInfo}>
                        <h5>{props.schedule.note.title}</h5>
                        <h6>{props.schedule.note.text}</h6>
                    </div>
                </div>
                <div className={styles.taskContainer}>
                    <div className={styles.detailContainer}>
                        <h3>{props.schedule.detail.title}</h3>
                        <h5>{props.schedule.detail.text}</h5>
                    </div>
                    <div className={styles.nextContainer}>
                        <h4>Next Task:</h4>
                        <h5>{props.schedule.type} {props.schedule.title} in {props.schedule.detail.day} days</h5>
                    </div>
                </div>
            </div>
            <div className={styles.buttonsContainer}>
                <button onClick={props.saveSchedule}>Mark Complete</button>
                <button onClick={props.cancelSchedule}>Cancel</button>
            </div>
        </div>
    );
};

export default CalendarDetail;