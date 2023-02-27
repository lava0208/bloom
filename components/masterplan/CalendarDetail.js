/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { taskService, plantingService, plantService } from "services";

import styles from "~styles/components/masterplan/calendardetail.module.scss";

const CalendarDetail = (props) => {
    const [task, setTask] = useState({});
    const [nextTask, setNextTask] = useState({});
    const [noNextTask, setNoNextTask] = useState("");
    const [plant, setPlant] = useState({});
    
    useEffect(() => {
        getTask();
        getPlant();
    }, [])

    const getTask = async () => {
        const _task = await taskService.getById(props.taskId);
        setTask(_task.data);

        const _tasks = await taskService.getByPlantingId(_task.data.planting_id);
        const tmpIndex = _tasks.data.findIndex(x => x._id === props.taskId);
        // if(tmpIndex >= 0 && tmpIndex < _tasks.data.length - 1){
        if(tmpIndex >= 0){
            const _nextItem = _tasks.data[tmpIndex + 1];
            if(_nextItem == undefined){
                setNoNextTask("There is no next task") 
            }else{
                setNextTask(_nextItem);
            }
        }
    }

    const getPlant = async () => {
        const _planting = await plantingService.getById(props.schedule.planting_id);
        var _plantId = _planting.data.plant_id;

        const _plant = await plantService.getById(_plantId);
        setPlant(_plant.data);
    }


    return (
        <div className={styles.container}>
            <div className={styles.calendarTitle}>
                <h3>{plant ? plant.name : ""}</h3>
                <h5>{plant ? plant.species : ""}</h5>
            </div>
            <div className={styles.eventContainer}>
                <div className={styles.noteContainer}>
                    <div className={styles.noteImage}>
                        {
                            plant.image && (
                                <img src={"/assets/upload/" + plant.image } alt="image" />
                            )
                        }
                    </div>
                    <div className={styles.noteInfo}>
                        <h5>{plant ? plant.name : ""}</h5>
                        <h6>{plant ? plant.species : ""}</h6>
                        <h6>{plant ? plant.description : ""}</h6>
                    </div>
                </div>
                <div className={styles.taskContainer}>
                    <div className={styles.detailContainer}>
                        <h3>{task ? task.title : ""}</h3>
                        <h5>{task ? task.note : ""}</h5>
                    </div>
                    <div className={styles.nextContainer}>
                        <h4>Next Task:</h4>
                        {
                            nextTask ? (
                                <h5>{nextTask.title} in {task.duration} days</h5>
                            ):(
                               <h5> { noNextTask } </h5>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className={styles.buttonsContainer}>
                <button onClick={() => props.completeTask(props.taskId)}>Mark Complete</button>
                <button onClick={props.cancelSchedule}>Cancel</button>
            </div>
        </div>
    );
};

export default CalendarDetail;