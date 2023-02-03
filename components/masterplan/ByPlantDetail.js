import React, { useState } from "react";
import moment from "moment";

import styles from "~styles/components/masterplan/byplantdetail.module.scss";

import { byPlant } from "~lib/dummy";

const ByPlantDetail = (props) => {
    const [customTask, setCustomTask] = useState({
        title: "",
        date: "",
        duration: "",
        note: ""
    });
    const saveCustomTask = () => {
        console.log(customTask)
    }
    return (
        <div className={styles.container}>
            <div className={styles.plantTitle}>
                <h3>{props.activePlant.name}</h3>
                <h5>Planting ID #{props.activePlant.id}</h5>
            </div>
            <div className={styles.plantInfoContainer}>
                <div className={styles.detailContainer}>
                    <div className={styles.detailImage}></div>
                    <div className={styles.detailInfo}>
                        <h3>Cosmos</h3>
                        <h5>{props.activePlant.name}</h5>
                        <h6>{props.activePlant.description}</h6>
                    </div>
                </div>
                <div className={styles.taskContainer}>
                    <h3>Add Custom Task</h3>
                    <input
                        type="text"
                        placeholder="Title"
                        value={customTask.title}
                        onChange={(e) => {
                            setCustomTask({
                                ...customTask,
                                title: e.target.value,
                            });
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Date"
                        value={customTask.date}
                        onChange={(e) => {
                            setCustomTask({
                                ...customTask,
                                date: e.target.value,
                            });
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Duration"
                        value={customTask.duration}
                        onChange={(e) => {
                            setCustomTask({
                                ...customTask,
                                duration: e.target.value,
                            });
                        }}
                    />
                    <textarea
                        placeholder="Note"
                        value={customTask.note}
                        rows="3"
                        onChange={(e) => {
                            setCustomTask({
                                ...customTask,
                                note: e.target.value,
                            });
                        }}
                    />
                    <button onClick={() => saveCustomTask()}>Add</button>
                </div>
            </div>
            <div className={styles.plantOptionsContainer}>
                {byPlant.plantOptions.map((option, i) => (
                    <div className={styles.plantOptionRow} key={i}>
                        <div className={styles.plantOptionsHeader}>
                            <div className={styles.plantOptionName}>
                                <h3>{option.name}</h3>
                                <div>
                                    <input placeholder="" />
                                    <span>{option.day}</span> days
                                </div>
                            </div>
                            <button>{moment(option.date).format("MMMM Do, YYYY")}</button>
                        </div>
                        <div className={styles.plantOptionsFooter}>
                            <select>
                                <option value="complete">Complete</option>
                                <option value="incomplete">InComplete</option>
                                <option value="overdue">Overdue</option>
                                <option value="notdue">Not Overdue</option>
                            </select>
                            <div className={styles.buttons}>
                                <button>Duplicate</button>
                                <button>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.buttonsContainer}>
                <button onClick={props.savePlant}>Save</button>
                <button onClick={props.cancelPlant}>Cancel</button>
            </div>
        </div>
    );
};

export default ByPlantDetail;