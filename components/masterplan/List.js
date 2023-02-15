/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import moment from "moment";
import { Modal, ModalBody } from "reactstrap";

import { list } from "~lib/dummy";

import 'bootstrap/dist/css/bootstrap.css';
import styles from "~styles/components/masterplan/list.module.scss";

import CalendarDetail from "./CalendarDetail";

const List = () => {
    const [event, setEvent] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [activeEvent, setActiveEvent] = useState(-1);
    const saveSchedule = (e) => {
        setModalOpen(false);
        setActiveEvent(e.schedule.id)
    }
    const cancelSchedule = () => {
        setModalOpen(false);
    }
    const openSchedule = (event) => {
        setModalOpen(true)
        setEvent(event)
    }

    return (
        <div className={styles.container}>
            <div className={styles.tasksContainer}>
                <h2 className={`${styles.tasksContainerTitle} ${styles.overdue}`}>
                    Overdue
                </h2>
                <div className={styles.tasksScrollContainer}>
                    {list.overdue.map((task, i) => (
                        <div className={styles.taskContainer} key={i}>
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
                        <div className={styles.taskContainer} key={i} onClick={() => openSchedule(task)}>
                            <div className={styles.taskInfo}>
                                <h2>{task.title}</h2>
                                <h3>Today</h3>
                            </div>
                            <div className={`${styles.taskCap} ${styles.today}`}>
                                {
                                    activeEvent === i + 1 && (
                                        <img src="/assets/checkbox.png" alt="checkbox" />
                                    )
                                }                                
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.tasksContainer}>
                <h2 className={`${styles.tasksContainerTitle} `}>Tomorrow</h2>
                <div className={styles.tasksScrollContainer}>
                    {list.tomorrow.map((task, i) => (
                        <div className={styles.taskContainer} key={i}>
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
                        <div className={styles.thisWeekTaskContainer} key={i}>
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
