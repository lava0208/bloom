import React, { useState } from "react";
import { Modal, ModalBody } from "reactstrap";

import { yourPlan } from "~lib/dummy";
import CurrentPlan from "./CurrentPlan";
import UserSettings from "~components/plantsettings/UserSettings";

import 'bootstrap/dist/css/bootstrap.css';
import styles from "~styles/components/modifyplan/yourplan.module.scss";

const YourPlan = () => {
    const [planEditModalOpen, setPlanEditModalOpen] = useState(false);
    const [isShowActionText, setIsShowActionText] = useState(-1);
    const openPlanEditModal = () => {
        setPlanEditModalOpen(true);
    }
    const savePlan = () => {
        setPlanEditModalOpen(false);
    }
    const resetPlan = () => {
        setPlanEditModalOpen(false);
    }

    const [planSettingsModalOpen, setPlanSettingsModalOpen] = useState(false);
    const openPlanSettingsModal = () => {
        setPlanSettingsModalOpen(true);
    }
    const saveSetting = () => {
        setPlanSettingsModalOpen(false)
    }
    const cancelSetting = () => {
        setPlanSettingsModalOpen(false)
    }
    return (
        <>
            <div className={styles.container}>
                <h2>Your Plan</h2>

                <div className={styles.scrollContainer}>
                    {yourPlan.map((plan, i) => (
                        <div className={styles.planContainer} key={i} onMouseEnter={() => setIsShowActionText(i)} onMouseLeave={() => setIsShowActionText(-1)}>
                            <div className={styles.planHeader}>
                                <h3>{plan.name}</h3>
                                <h3>{plan.count}ct</h3>
                            </div>
                            <h4 className={styles.planSpecies}>{plan.species}</h4>
                            <div className={styles.planOptionsContainer}>
                                <h5>Start</h5>
                                <h5>Regular</h5>
                                <h5>Pinch</h5>
                                <h5>Pot On</h5>
                            </div>
                            {plan.notes && <h6 className={styles.planNotes}>{plan.notes}</h6>}
                            {
                                i === isShowActionText && (
                                    <div className={styles.plantHoverText}>
                                        <button>Delete</button>
                                        <button onClick={() => openPlanEditModal()}>Edit</button>
                                    </div>
                                )
                            }
                        </div>
                    ))}
                </div>

                <div className={styles.planSettings} onClick={() => openPlanSettingsModal()}>
                    <h3>Plan Settings</h3>
                </div>
            </div>
            <Modal toggle={() => setPlanEditModalOpen(!planEditModalOpen)} isOpen={planEditModalOpen} centered modalClassName="modifyPlanModal">
                <ModalBody>
                    <CurrentPlan title="Edit Crimson Glory" savePlan={savePlan} resetPlan={resetPlan} />
                </ModalBody>
            </Modal>
            <Modal toggle={() => setPlanSettingsModalOpen(!planSettingsModalOpen)} isOpen={planSettingsModalOpen} centered>
                <ModalBody>
                    <UserSettings saveSetting={saveSetting} cancelSetting={cancelSetting} />
                </ModalBody>
            </Modal>
        </>
    );
};

export default YourPlan;
