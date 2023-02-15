import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

import { settingsPlants } from "~lib/dummy";

import 'bootstrap/dist/css/bootstrap.css';
import styles from "~styles/components/plantsettings/plants.module.scss";

const Plants = () => {
    const [name, setName] = useState('');
    const [species, setSpecies] = useState('');
    const [description, setDescription] = useState('');
    const [earlySeed, setEarlySeed] = useState('');
    const [lateSeed, setLateSeed] = useState('');
    const [pinch, setPinch] = useState('');
    const [potOn, setPotOn] = useState('');
    const [tarden, setTarden] = useState('');
    const [transplant, setTransplant] = useState('');
    const [maturityEarly, setMaturityEarly] = useState('');
    const [maturityLate, setMaturityLate] = useState('');
    const [reBloom, setReBloom] = useState(false);
    const [transplantNote, setTransplantNote] = useState('');
    const [pinchNote, setPinchNote] = useState('');
    const [directSeed, setDirectSeed] = useState('');
    const [directPinch, setDirectPinch] = useState('');
    const [depth, setDepth] = useState('');
    const [coldStratify, setColdStratify] = useState('');
    const [indoorSeedNote, setIndoorSeedNote] = useState('');
    const [directSeedNote, setDirectSeedNote] = useState('');
    const [potOnNote, setPotOnNote] = useState('');
    const [harvestNote, setHarvestNote] = useState('');

    const [modalOpen, setModalOpen] = useState(false);
    const [isShowActionText, setIsShowActionText] = useState(-1);
    const openCreateModal = () => {
        setModalOpen(true);
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
    const filtered = searchFilter(settingsPlants)
    return (
        <>
            <div className={styles.headerContainer}>
                <div className={styles.addCustomContainer} onClick={() => openCreateModal()}>
                    <button>Add New Custom</button>
                </div>
                <input className={styles.searchButton} placeholder={'Search'} onChange={search} />
            </div>
            <div className={styles.plantsContainer}>
                {filtered.map((plant, i) => (
                    <div className={styles.plantContainer} key={i} onMouseEnter={() => setIsShowActionText(i)} onMouseLeave={() => setIsShowActionText(-1)}>
                        <div className={styles.plantImage}></div>
                        <div className={styles.plantInfoContainer}>
                            <h3>{plant.name}</h3>
                            <h4>{plant.variety}</h4>
                            <h5>{plant.description}</h5>
                        </div>
                        {
                            i === isShowActionText && (
                                <div className={styles.plantHoverText}>
                                    <button onClick={() => openCreateModal()}>Edit</button>
                                    <button>Remove</button>
                                </div>
                            )
                        }
                    </div>
                ))}
            </div>
            <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen} modalClassName="customPlantModal">
                <ModalHeader>
                    Add New Custom Plant
                </ModalHeader>
                <ModalBody>
                    <div className={styles.plantsContainer}>
                        <div className={styles.modalImage}></div>
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Variety Name"
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Species"
                                onChange={(e) => setSpecies(e.target.value)}
                            />
                            <textarea
                                cols="2"
                                className={styles.input}
                                placeholder="Description"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className={styles.inputContainer + " col-md-6"}>
                            <h5>Indoor Timing</h5>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Early Seed"
                                onChange={(e) => setEarlySeed(e.target.value)}
                            />
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Late Seed"
                                onChange={(e) => setLateSeed(e.target.value)}
                            />
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Pinch"
                                onChange={(e) => setPinch(e.target.value)}
                            />
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Pot On"
                                onChange={(e) => setPotOn(e.target.value)}
                            />
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Tarden"
                                onChange={(e) => setTarden(e.target.value)}
                            />
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Transplant"
                                onChange={(e) => setTransplant(e.target.value)}
                            />
                            <h5 className="mt-3">Harvest</h5>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Maturity Early"
                                onChange={(e) => setMaturityEarly(e.target.value)}
                            />
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Maturity Late"
                                onChange={(e) => setMaturityLate(e.target.value)}
                            />
                            <h6 className="d-flex align-items-center">
                                <label htmlFor="rebloom">Rebloom?</label>
                                <input type="checkbox" id="rebloom" onChange={(e) => setReBloom(e.target.value)} />
                            </h6>
                            <h5 className="mt-3">Transplant Note</h5>
                            <textarea
                                cols="3"
                                onChange={(e) => setTransplantNote(e.target.value)}
                            ></textarea>
                            <h5 className="mt-3">Pinch Note</h5>
                            <textarea
                                cols="3"
                                onChange={(e) => setPinchNote(e.target.value)}
                            ></textarea>
                        </div>
                        <div className={styles.inputContainer + " col-md-6"}>
                            <h5>Direct Seed Timing</h5>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Direct Seed"
                                onChange={(e) => setDirectSeed(e.target.value)}
                            />
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Pinch"
                                onChange={(e) => setDirectPinch(e.target.value)}
                            />
                            <h5>Seeding</h5>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Depth (mm)"
                                onChange={(e) => setDepth(e.target.value)}
                            />
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Cold Stratify (weeks)"
                                onChange={(e) => setColdStratify(e.target.value)}
                            />
                            <h6 className="d-flex align-items-center">
                                <label htmlFor="germination">Light for germination</label>
                                <input type="checkbox" id="germination" />
                            </h6>
                            <h5 className="mt-3">Indoor Seed Note</h5>
                            <textarea
                                cols="3"
                                onChange={(e) => setIndoorSeedNote(e.target.value)}
                            ></textarea>
                            <h5>Direct Seed Note</h5>
                            <textarea
                                cols="3"
                                onChange={(e) => setDirectSeedNote(e.target.value)}
                            ></textarea>
                            <h5>Pot On Note</h5>
                            <textarea
                                cols="3"
                                onChange={(e) => setPotOnNote(e.target.value)}
                            ></textarea>
                            <h5>Harvest Note</h5>
                            <textarea
                                cols="3"
                                onChange={(e) => setHarvestNote(e.target.value)}
                            ></textarea>
                        </div>
                        <div className={styles.inputContainer + " text-center"}>
                            <button onClick={() => setModalOpen(!modalOpen)}>Save Changes</button>
                            <button onClick={() => setModalOpen(!modalOpen)}>Cancel</button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
};

export default Plants;
