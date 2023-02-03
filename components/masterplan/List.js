import React, { useState } from "react";
import moment from "moment";
import { Modal, ModalBody } from "reactstrap";

import { list } from "~lib/dummy";

import 'bootstrap/dist/css/bootstrap.css';
import styles from "~styles/components/masterplan/list.module.scss";

import CalendarDetail from "./CalendarDetail";

const List = () => {
    const event = {
        id: 1,
        start: moment().toDate(),
        end: moment().toDate(),
        title: "Start Zinnia",
        description: "King Orange Helium",
        type: "start",
        note: {
            title: "Seed Note",
            text: "King Orange Helium is a classic Zinnia, with large and easy to handle seeds. Start two seeds per cell, and lightly cover with vermiculite before moistening. Zinnias are large seedlings and should sprout up in just a few days."
        },
        detail:{
            title: "Start 450 seeds",
            text: "Light is NOT required for germination.",
            day: 14
        }
    }
    const [modalOpen, setModalOpen] = useState(false);
    const saveSchedule = () => {
        setModalOpen(false);
    }
    const cancelSchedule = () => {
        setModalOpen(false);
    }

    return (
        <div className={styles.container}>
            <div className={styles.tasksContainer}>
                <h2 className={`${styles.tasksContainerTitle} ${styles.overdue}`}>
                    Overdue
                </h2>
                <div className={styles.tasksScrollContainer}>
                    {list.overdue.map((task, i) => (
                        <div className={styles.taskContainer} key={i} onClick={() => setModalOpen(true)}>
                            <div className={styles.taskInfo}>
                                <h2>{task.name}</h2>
                                <h3 className={styles.overdue}>
                                    {moment(task.date).fromNow()}
                                </h3>
                            </div>
                            <div className={`${styles.taskCap} ${styles.overdue}`}></div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.tasksContainer}>
                <h2 className={`${styles.tasksContainerTitle} `}>Today</h2>
                <div className={styles.tasksScrollContainer}>
                    {list.today.map((task, i) => (
                        <div className={styles.taskContainer} key={i} onClick={() => setModalOpen(true)}>
                            <div className={styles.taskInfo}>
                                <h2>{task.name}</h2>
                                <h3>Today</h3>
                            </div>
                            <div className={`${styles.taskCap} ${styles.today}`}></div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.tasksContainer}>
                <h2 className={`${styles.tasksContainerTitle} `}>Tomorrow</h2>
                <div className={styles.tasksScrollContainer}>
                    {list.tomorrow.map((task, i) => (
                        <div className={styles.taskContainer} key={i} onClick={() => setModalOpen(true)}>
                            <div className={styles.taskInfo}>
                                <h2>{task.name}</h2>
                                <h3>Tomorrow</h3>
                            </div>
                            <div className={`${styles.taskCap} ${styles.tomorrow}`}></div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.thisWeekContainer}>
                <h2>This Week</h2>
                <div className={styles.thisWeekScrollContainer}>
                    {list.thisWeek.map((task, i) => (
                        <div className={styles.thisWeekTaskContainer} key={i} onClick={() => setModalOpen(true)}>
                            <h3>{task.name}</h3>
                            <h4>{moment(task.date).format("dddd t\\h\\e Do")}</h4>
                        </div>
                    ))}
                </div>
            </div>
            <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen} centered modalClassName="modifyPlanModal">
                <ModalBody>
                    <CalendarDetail schedule = {event} saveSchedule={saveSchedule} cancelSchedule={cancelSchedule} />
                </ModalBody>
            </Modal>
        </div>
    );
};

export default List;
