/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { userService, plantService } from "services";

import { Spinner } from "reactstrap";

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from "firebaseConfig";

import styles from "~styles/components/plantsettings/plants.module.scss";

const Plant = (props) => {
    const [plant, setPlant] = useState({
        user_id: "",
        name: "",
        species: "",
        description: "",
        image: "",
        earliest_seed: "",
        latest_seed: "",
        direct_seed: "",
        direct_seed_pinch: "",
        cold_stratify: "",
        pinch: "",
        pot_on: "",
        harden: "",
        transplant: "",
        maturity_early: "",
        maturity_late: "",
        light: false,
        depth: "",
        rebloom: false,
        indoor_seed_note: "",
        direct_seed_note: "",
        pinch_note: "",
        pot_on_note: "",
        transplant_note: "",
        harvest_note: "",
    });

    useEffect(() => {
        getPlant(props.id)
    }, [])

    const getPlant = async () => {
        if(props.id !== 0){
            var response = await plantService.getById(props.id);
            setPlant(response.data)
        }       
    }

    const [imageFile, setImageFile] = useState()
    const [downloadURL, setDownloadURL] = useState('')
    const [percent, setPercent] = useState(0);

    const handleSelectedFile = (files) => {
        if (files && files[0].size < 10000000) {
            setImageFile(files[0])
            const _imageFile = files[0]
            if (_imageFile) {
                const name = _imageFile.name
                const storageRef = ref(storage, `image/${name}`)
                const uploadTask = uploadBytesResumable(storageRef, _imageFile)
    
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const _percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                        setPercent(_percent);
                    },
                    (error) => {
                        swal({
                            title: "Error!",
                            text: error.message,
                            icon: "error",
                        });
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                            plant.image = url
                            setDownloadURL(url)
                        })
                    },
                )
            }
        } else {
            swal({
                title: "Error!",
                text: "File size to large",
                icon: "error",
            });
        }
    }

    const uploadPlant = async () => {
        if(props.id === 0){
            const _result = await plantService.create(plant);
            if(_result.status === true){
                swal({
                    title: "Success!",
                    text: _result.message,
                    icon: "success",
                });
                props.savePlant()
            }
        }else{
            const _result = await plantService.update(props.id, plant);
            if(_result.status === true){
                swal({
                    title: "Success!",
                    text: _result.message,
                    icon: "success",
                });
                props.savePlant()
            }
        }
    }

    const savePlant = async () => {
        if (plant.name !== "" && plant.species !== "" && plant.description !== "") {
            if(plant.earliest_seed === "" && plant.latest_seed === "" && plant.direct_seed === ""){
                swal({
                    title: "Warning!",
                    text: "Please fill all fields.",
                    icon: "warning",
                });
            }else{
                plant.user_id = userService.getId();
                plant.image = downloadURL;
                uploadPlant();
            }                                  
        } else {
            swal({
                title: "Warning!",
                text: "Please fill all fields.",
                icon: "warning",
            });
        }
    }

    return (
        <>
            <div className={styles.plantModalContainer}>
                <div className={styles.modalImageContainer}>
                    <label className={styles.modalImage}>
                        <input
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            hidden
                            onChange={(e) => handleSelectedFile(e.target.files)}
                        />
                        {downloadURL ? (
                            <img src={downloadURL} alt="plant" />
                        ) : (
                            plant.image && (
                                <img src={plant.image} alt="plant" />
                            )                            
                        )}
                    </label>
                    {
                        imageFile && percent < 100 && (
                            <Spinner color="info"> Loading... </Spinner>
                        )
                    }
                </div>
                <div className={styles.inputContainer}>
                    <small>Variety Name</small>
                    <input
                        type="text"
                        className={styles.input}
                        value={plant.name}
                        onChange={(e) => {
                            setPlant({
                                ...plant,
                                name: e.target.value,
                            });
                        }}
                    />
                    <small>Species</small>
                    <input
                        type="text"
                        className={styles.input}
                        value={plant.species}
                        onChange={(e) => {
                            setPlant({
                                ...plant,
                                species: e.target.value,
                            });
                        }}
                    />
                    <small>Description</small>
                    <textarea
                        rows="3"
                        className={styles.input}
                        value={plant.description}
                        onChange={(e) => {
                            setPlant({
                                ...plant,
                                description: e.target.value,
                            });
                        }}
                    />
                </div>
            </div>
            <div className="row mt-4">
                <div className={styles.inputContainer + " col-md-6"}>
                    <h5>Indoor Timing</h5>
                    <small>Early Seed</small>
                    <input
                        type="number"
                        className={styles.input}
                        value={plant.earliest_seed}
                        onChange={(e) => {
                            setPlant({
                                ...plant,
                                earliest_seed: e.target.value,
                            });
                        }}
                    />
                    <small>Late Seed</small>
                    <input
                        type="number"
                        className={styles.input}
                        value={plant.latest_seed}
                        onChange={(e) => {
                            setPlant({
                                ...plant,
                                latest_seed: e.target.value,
                            });
                        }}
                    />
                    <small>Pinch</small>
                    <input
                        type="number"
                        className={styles.input}
                        value={plant.pinch}
                        onChange={(e) => {
                            setPlant({
                                ...plant,
                                pinch: e.target.value,
                            });
                        }}
                    />
                    <small>Pot On</small>
                    <input
                        type="number"
                        className={styles.input}
                        value={plant.pot_on}
                        onChange={(e) => {
                            setPlant({
                                ...plant,
                                pot_on: e.target.value,
                            });
                        }}
                    />
                    <small>Harden</small>
                    <input
                        type="number"
                        className={styles.input}
                        value={plant.harden}
                        onChange={(e) => {
                            setPlant({
                                ...plant,
                                harden: e.target.value,
                            });
                        }}
                    />
                    <small>Transplant</small>
                    <input
                        type="number"
                        className={styles.input}
                        value={plant.transplant}
                        onChange={(e) => {
                            setPlant({
                                ...plant,
                                transplant: e.target.value,
                            });
                        }}
                    />
                    <h5 className="mt-3">Harvest</h5>
                    <small>Maturity Early</small>
                    <input
                        type="number"
                        className={styles.input}
                        value={plant.maturity_early}
                        onChange={(e) => {
                            setPlant({
                                ...plant,
                                maturity_early: e.target.value,
                            });
                        }}
                    />
                    <small>Maturity Late</small>
                    <input
                        type="number"
                        className={styles.input}
                        value={plant.maturity_late}
                        onChange={(e) => {
                            setPlant({
                                ...plant,
                                maturity_late: e.target.value,
                            });
                        }}
                    />
                    <h6 className="d-flex align-items-center">
                        <label htmlFor="rebloom">Rebloom?</label>
                        <input
                            type="checkbox"
                            id="rebloom"
                            value={plant.rebloom}
                            checked={plant.rebloom}
                            onChange={(e) => {
                                setPlant({
                                    ...plant,
                                    rebloom: e.target.checked,
                                });
                            }}
                        />
                    </h6>
                    <h5 className="mt-3">Transplant Note</h5>
                    <textarea
                        rows="3"
                        value={plant.transplant_note}
                        onChange={(e) => {
                            setPlant({
                                ...plant,
                                transplant_note: e.target.value,
                            });
                        }}
                    />
                    <h5 className="mt-3">Pinch Note</h5>
                    <textarea
                        rows="3"
                        value={plant.pinch_note}
                        onChange={(e) => {
                            setPlant({
                                ...plant,
                                pinch_note: e.target.value,
                            });
                        }}
                    />
                </div>
                <div className={styles.inputContainer + " col-md-6"}>
                    <h5>Direct Seed Timing</h5>
                    <small>Direct Seed</small>
                    <input
                        type="number"
                        className={styles.input}
                        value={plant.direct_seed}
                        onChange={(e) => {
                            setPlant({
                                ...plant,
                                direct_seed: e.target.value,
                            });
                        }}
                    />
                    <small>Pinch</small>
                    <input
                        type="number"
                        className={styles.input}
                        value={plant.direct_seed_pinch}
                        onChange={(e) => {
                            setPlant({
                                ...plant,
                                direct_seed_pinch: e.target.value,
                            });
                        }}
                    />
                    <h5 className="mt-4">Seeding</h5>
                    <small>Depth (mm)</small>
                    <input
                        type="number"
                        className={styles.input}
                        value={plant.depth}
                        onChange={(e) => {
                            setPlant({
                                ...plant,
                                depth: e.target.value,
                            });
                        }}
                    />
                    <small>Cold Stratify (weeks)</small>
                    <input
                        type="number"
                        className={styles.input}
                        value={plant.cold_stratify}
                        onChange={(e) => {
                            setPlant({
                                ...plant,
                                cold_stratify: e.target.value,
                            });
                        }}
                    />
                    <h6 className="d-flex align-items-center">
                        <label htmlFor="light">Light for germination</label>
                        <input type="checkbox" id="light"
                            value={plant.light}
                            checked={plant.light}
                            onChange={(e) => {
                                setPlant({
                                    ...plant,
                                    light: e.target.checked,
                                });
                            }}
                        />
                    </h6>
                    <h5 className="mt-3">Indoor Seed Note</h5>
                    <textarea
                        rows="3"
                        value={plant.indoor_seed_note}
                        onChange={(e) => {
                            setPlant({
                                ...plant,
                                indoor_seed_note: e.target.value,
                            });
                        }}
                    />
                    <h5 className="mt-3">Direct Seed Note</h5>
                    <textarea
                        rows="3"
                        value={plant.direct_seed_note}
                        onChange={(e) => {
                            setPlant({
                                ...plant,
                                direct_seed_note: e.target.value,
                            });
                        }}
                    />
                    <h5>Pot On Note</h5>
                    <textarea
                        rows="3"
                        value={plant.pot_on_note}
                        onChange={(e) => {
                            setPlant({
                                ...plant,
                                pot_on_note: e.target.value,
                            });
                        }}
                    />
                    <h5>Harvest Note</h5>
                    <textarea
                        rows="3"
                        value={plant.harvest_note}
                        onChange={(e) => {
                            setPlant({
                                ...plant,
                                harvest_note: e.target.value,
                            });
                        }}
                    />
                </div>
                <div className={styles.inputContainer + " text-center"}>
                    <button onClick={() => { savePlant() }}>Save Changes</button>
                    <button onClick={props.cancelPlant}>Cancel</button>
                </div>
            </div>
        </>
    );
};

export default Plant;
