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
    const savePlan = () => {
        setModalOpen(false);
    }
    const resetPlan = () => {
        setModalOpen(false);
    }

    const [query, setQuery] = useState('');
    const search = (e) => {
        setQuery(e.target.value)
    }
    const searchFilter = (array) => {
        return array.filter(
            (el) => Object.keys(el).some((parameter) => 
                el[parameter].toString().toLowerCase().includes(query)
            )
        )
    }
    const filtered = searchFilter(availablePlans)
    return (
        <>
            <div className={styles.headerContainer}>
                <h2>Available</h2>
                <input className={styles.searchButton} placeholder={'Search'} onChange={search} />
            </div>
            <div className={styles.plansContainer}>
                {filtered.map((plan, i) => (
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
            <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen} centered modalClassName="modifyPlanModal">
                <ModalBody>
                    <CurrentPlan title="Add Crimson Glory" savePlan={savePlan} resetPlan={resetPlan} />
                </ModalBody>
            </Modal>
        </>
    );
};

export default AvailablePlans;
