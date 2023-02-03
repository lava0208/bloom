import React, { useState } from "react";

import { currentPlan } from "~lib/dummy";

import styles from "~styles/components/modifyplan/currentplan.module.scss";

const CurrentPlan = (props) => {
    const [pinchCheckbox, setPinchCheckbox] = useState(false);
    const [potCheckbox, setPotCheckbox] = useState(false);

    const seeds = [
        { label: "Direct Sow", value: 1 },
        { label: "Direct Indoors", value: 2 }
    ]
    const [activeSeed, setActiveSeed] = useState(-1);

    const harvests = [
        { label: "Early", value: 1 },
        { label: "Regular", value: 2 },
        { label: "Lave", value: 3 }
    ]
    const [activeHarvest, setActiveHarvest] = useState(-1);

    return (
        <div className={styles.container}>
            <div className="modal-header">
                <h5 className="modal-title">{props.title}</h5>
            </div>
            <div className={styles.currentPlanContainer}>
                <div className={styles.planDetailsContainer}>
                    <div className={styles.planImage}></div>
                    <div className={styles.planInfoContainer}>
                        <h3>{currentPlan.name}</h3>
                        <h4>{currentPlan.variety}</h4>
                        <h5>{currentPlan.description}</h5>
                    </div>
                </div>
                <div className={styles.planOptionsContainer}>
                    <div className={styles.seedingRow}>
                        <h4>Seeding</h4>
                        {seeds.map((element, i) => (
                            <button key={i} onClick={() => setActiveSeed(element.value)} className={activeSeed === i + 1 ?  styles.selected : ''}>{element.label}</button>
                        ))}
                    </div>
                    <div className={styles.quantityRow}>
                        <h4>Quantity</h4>
                        <input placeholder="# of seeds" />
                    </div>
                    <div className={styles.harvestRow}>
                        <h4>Harvest</h4>
                        {harvests.map((element, i) => (
                            <button key={i} onClick={() => setActiveHarvest(element.value)} className={activeHarvest === i + 1 ?  styles.selected : ''}>{element.label}</button>
                        ))}
                    </div>
                    <div className={styles.successionContainer}>
                        <div className={styles.successionContainer1}>
                            <div className={styles.successionTextContainer}>
                                <h4>Sucessions</h4>
                                <h5>You can always adjust spacing later.</h5>
                            </div>
                            <div className={styles.successionButtonsContainer}>
                                <div><input placeholder="6" /> <span>Plantings</span></div>
                                <div><input placeholder="14" /> <span>Days Between</span></div>
                            </div>
                        </div>
                        <div className={styles.successionCheckboxesContainer}>
                            <div className={styles.successionCheckboxRow}>
                                <h6>Pinch</h6>
                                <div
                                    onClick={() => setPinchCheckbox(!pinchCheckbox)}
                                    className={`${styles.checkbox} ${pinchCheckbox ? styles.active : null
                                        }`}
                                ></div>
                            </div>
                            <div className={styles.successionCheckboxRow}>
                                <h6>Pot On</h6>
                                <div
                                    onClick={() => setPotCheckbox(!potCheckbox)}
                                    className={`${styles.checkbox} ${potCheckbox ? styles.active : null
                                        }`}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.buttonsContainer}>
                <button onClick={props.savePlan}>Save Changes</button>
                <button onClick={props.resetPlan}>Reset</button>
            </div>
        </div>
    );
};

export default CurrentPlan;
