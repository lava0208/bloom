/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import moment from "moment";
import { Modal, ModalBody } from "reactstrap";

import { taskService } from "services";

import 'bootstrap/dist/css/bootstrap.css';
import styles from "~styles/components/masterplan/list.module.scss";

import CalendarDetail from "./CalendarDetail";

const List = () => {
    const [event, setEvent] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const completeTask = async (id) => {
        var _result = await taskService.updateByStatus(id);
        swal({
            title: "Success!",
            text: _result.message,
            icon: "success",
        });
        setModalOpen(false);
        getAllTasks();
    }
    const cancelSchedule = () => {
        setModalOpen(false);
    }
    const [taskId, setTaskId] = useState("");
    const openSchedule = (event) => {
        setModalOpen(true)
        setEvent(event)
        setTaskId(event._id);
    }

    const [todayTasks, setTodayTasks] = useState([]);
    const [weekTasks, setWeekTasks] = useState([]);
    const [overdueTasks, setOverdueTasks] = useState([]);
    const [allTasks, setAllTasks] = useState([]);

    useEffect(() => {
        getAllTasks();
    }, [])

    const getAllTasks = async () => {
        var _result = await taskService.getAllByDate();
        setTodayTasks(_result.data.today);
        setWeekTasks(_result.data.week);
        setOverdueTasks(_result.data.overdue);
        setAllTasks(_result.data.all);
    }

    return (
        <div className={styles.container}>
            <div className={styles.tasksContainer}>
                <h2 className={`${styles.tasksContainerTitle} ${styles.overdue}`}>
                    Overdue
                </h2>
                <div className={styles.tasksScrollContainer}>
                    {overdueTasks.map((task, i) => (
                        <div className={styles.taskContainer} key={i} onClick={() => openSchedule(task)}>
                            <div className={styles.taskInfo}>
                                <h2>{task.title}</h2>
                                <h3 className={styles.overdue}>
                                    {moment(task.scheduled_at).fromNow()}
                                </h3>
                            </div>
                            <div className={`${styles.taskCap} ${styles.overdue}`}>
                                {
                                    task.type === "complete" && (
                                        <img src="/assets/checkbox.png" alt="checkbox" />
                                    )
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.tasksContainer}>
                <h2 className={`${styles.tasksContainerTitle} `}>Today</h2>
                <div className={styles.tasksScrollContainer}>
                    {todayTasks.map((task, i) => (
                        <div className={styles.taskContainer} key={i} onClick={() => openSchedule(task)}>
                            <div className={styles.taskInfo}>
                                <h2>{task.title}</h2>
                                <h3>Today</h3>
                            </div>
                            <div className={`${styles.taskCap} ${styles.today}`}>
                                {
                                    task.type === "complete" && (
                                        <img src="/assets/checkbox.png" alt="checkbox" />
                                    )
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.tasksContainer}>
                <h2 className={`${styles.tasksContainerTitle} `}>This week</h2>
                <div className={styles.tasksScrollContainer}>
                    {weekTasks.map((task, i) => (
                        <div className={styles.taskContainer} key={i} onClick={() => openSchedule(task)}>
                            <div className={styles.taskInfo}>
                                <h2>{task.title}</h2>
                                <h3>{task.note }</h3>
                            </div>
                            <div className={`${styles.taskCap} ${styles.tomorrow}`}>
                                {
                                    task.type === "complete" && (
                                        <img src="/assets/checkbox.png" alt="checkbox" />
                                    )
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.thisWeekContainer}>
                <h2>All Tasks</h2>
                <div className={styles.thisWeekScrollContainer}>
                    {allTasks.map((task, i) => (
                        <div className={styles.allTaskContainer} key={i}>
                            <div className={styles.thisWeekTaskContainer}>
                                <div className="text-center">
                                    <h3>{task.title}</h3>
                                    <h4>{moment(task.scheduled_at).format("dddd t\\h\\e Do")}</h4>
                                </div>
                                <div className={`${styles.taskCap} ${styles.all}`}>
                                    {
                                        task.type === "incomplete" && (
                                            <img src="/assets/checkbox.png" alt="checkbox" />
                                        )
                                    }
                                </div>
                            </div>
                            
                        </div>
                    ))}
                </div>
            </div>
            <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen} centered modalClassName="modifyPlanModal">
                <ModalBody>
                    <CalendarDetail taskId={taskId} schedule = {event} completeTask={completeTask} cancelSchedule={cancelSchedule} />
                </ModalBody>
            </Modal>
        </div>
    );
};

export default List;
