import React, { useState } from "react";
import { Modal, ModalBody } from "reactstrap";

import { availablePlans } from "~lib/dummy";
import CurrentPlan from "./CurrentPlan";

import 'bootstrap/dist/css/bootstrap.css';
import styles from "~styles/components/modifyplan/availableplans.module.scss";

const AvailablePlans = () => {
    const [isShowActionText, setIsShowActionText] = useState(-1);
    const [modalOpen, setModalOpen] = useState(false);
    const openCreateModal = () => {
        setModalOpen(true);
    }
    return (
        <>
            <div className={styles.headerContainer}>
                <h2>Available</h2>
                <input className={styles.searchButton} placeholder={'Search'} />
            </div>
            <div className={styles.plansContainer}>
                {availablePlans.map((plan, i) => (
                    <div className={styles.planContainer} key={i} onMouseEnter={() => setIsShowActionText(i)} onMouseLeave={() => setIsShowActionText(-1)}>
                        <div className={styles.planImage}></div>
                        <div className={styles.planInfoContainer}>
                            <h3>{plan.name}</h3>
                            <h4>{plan.variety}</h4>
                            <h5>{plan.description}</h5>
                        </div>
                        {
                            i === isShowActionText && (
                                <div className={styles.plantHoverText}>
                                    <button onClick={() => openCreateModal()}>Add</button>
                                </div>
                            )
                        }
                    </div>
                ))}
            </div>
            <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
                <ModalBody>
                    <CurrentPlan />
                </ModalBody>
            </Modal>
        </>
    );
};

export default AvailablePlans;
