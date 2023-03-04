/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { userService, planService, plantService, plantingService } from "services";

import styles from "~styles/components/modifyplan/currentplan.module.scss";

const CurrentPlan = (props) => {
    //... Initialize
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
        { label: "Late", value: 3 }
    ]
    const [activeHarvest, setActiveHarvest] = useState(-1);

    const [planting, setPlanting] = useState({
        plan_id: "",
        plant_id: props.plantId,
        seeds: 0,
        harvest: "",
        direct_sow: false,
        direct_indoors: false,
        pinch: false,
        pot_on: false,
        succession: "",
        spacing: ""
    })

    useEffect(() => {
        if(props.planting){
            //... edit page
            getPlanting();
            setPinchCheckbox(props.planting.pinch);
            setPotCheckbox(props.planting.pot_on);
            setActiveSeed(props.planting.direct_sow ? 1 : 2);
            var _harvest = harvests.find(x => x.label === props.planting.harvest)
            setActiveHarvest(_harvest ? _harvest.value : -1);
        }else{
            //... create page
            getPlantAndPlanting();
        }
    }, [props.planting])

    //... get plan nand planting
    const [plant, setPlant] = useState({});
    const getPlantAndPlanting = async () => {
        console.log(userService.getId());
        var _plan = await planService.getByUserId(userService.getId());
        var _plant = await plantService.getById(props.plantId);
        var _planting = { ...planting };
        _planting.plan_id = _plan ? _plan.data._id : "";
        _planting.name = _plant ? _plant.data.name : "";
        _planting.species = _plant ? _plant.data.species : "";
        setPlant(_plant.data);
        setPlanting(_planting);
    }

    const getPlanting = async () => {
        var _plant = await plantService.getById(props.plantId);
        setPlant(_plant.data);
        setPlanting(props.planting)
    }

    const save = async () => {
        if(props.planting !== undefined){
            swal({
                title: "Wait!",
                text: "Are you sure you want to update?",
                icon: "info",
                buttons: [
                    'No, cancel it!',
                    'Yes, I am sure!'
                ],
                dangerMode: true,
            }).then(async function (isConfirm) {
                if (isConfirm) {
                    var _result = await plantingService.update(props.planting._id , planting);
                    swal({
                        title: "Success!",
                        text: _result.message,
                        icon: "success",
                    }).then(function(){
                        props.savePlanting();
                    });
                }
            })
        }else{
            swal({
                title: "Wait!",
                text: "Are you sure you want to create?",
                icon: "info",
                buttons: [
                    'No, cancel it!',
                    'Yes, I am sure!'
                ],
                dangerMode: true,
            }).then(async function (isConfirm) {
                if (isConfirm) {
                    var _result = await plantingService.create(planting);
                    swal({
                        title: "Success!",
                        text: _result.message,
                        icon: "success",
                    }).then(function(){
                        props.savePlanting();
                    });
                }
            })
        }
    }

    const reset = () => {
        setPlanting(planting => ({
            ...planting,
            seeds: 0,
            succession: "",
            spacing: ""
        }))
        setActiveSeed(-1);
        setActiveHarvest(-1);
        setPinchCheckbox(false);
        setPotCheckbox(false);
    }

    return (
        <div className={styles.container}>
            <div className="modal-header">
                <h5 className="modal-title">{props.title}</h5>
            </div>
            <div className={styles.currentPlanContainer}>
                <div className={styles.planDetailsContainer}>
                    <div className={styles.planImage}>
                        {
                            plant.image && (
                                <img src={"/assets/upload/" + plant.image } alt="image" />
                            )
                        }
                    </div>
                    <div className={styles.planInfoContainer}>
                        <h3>{plant.name}</h3>
                        <h4>{plant.species}</h4>
                        <h5>{plant.description}</h5>
                    </div>
                </div>
                <div className={styles.planOptionsContainer}>
                    <div className={styles.seedingRow}>
                        <h4>Seeding</h4>
                        {seeds.map((element, i) => (
                            <button key={i} 
                                onClick={() => {setActiveSeed(element.value), setPlanting({...planting, direct_sow: element.value === 1 ? true : false, direct_indoors: element.value === 1 ? false : true})}}
                                className={activeSeed === i + 1 ?  styles.selected : ''}
                                value={planting.direct_sow}
                            >
                                {element.label}
                            </button>
                        ))}
                    </div>
                    <div className={styles.quantityRow}>
                        <h4>Quantity</h4>
                        <input type="number" placeholder="# of seeds" value={planting.seeds === null ? 0 : parseInt(planting.seeds)} onChange={(e) => setPlanting({...planting, seeds: parseInt(e.target.value) })} />
                    </div>
                    <div className={styles.harvestRow}>
                        <h4>Harvest</h4>
                        {harvests.map((element, i) => (
                            <button key={i} 
                                onClick={() => {setActiveHarvest(element.value), setPlanting({...planting, harvest: element.value === 1 ? "Early" : element.value === 2 ? "Regular" : "Late"})}} 
                                className={activeHarvest === i + 1 ?  styles.selected : ''}
                                value={planting.harvest}
                            >
                                {element.label}
                            </button>
                        ))}
                    </div>
                    <div className={styles.successionContainer}>
                        <div className={styles.successionContainer1}>
                            <div className={styles.successionTextContainer}>
                                <h4>Successions</h4>
                                <h5>You can always adjust spacing later.</h5>
                            </div>
                            <div className={styles.successionButtonsContainer}>
                                <div>
                                    <input value={planting.succession} onChange={(e) => setPlanting({...planting, succession: e.target.value})} /> 
                                    <span>Plantings</span>
                                </div>
                                <div>
                                    <input value={planting.spacing} onChange={(e) => setPlanting({...planting, spacing: e.target.value})} />
                                    <span>Days Between</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.successionCheckboxesContainer}>
                            <div className={styles.successionCheckboxRow}>
                                <h6>Pinch</h6>
                                <div
                                    onClick={() => {setPinchCheckbox(!pinchCheckbox), setPlanting({...planting, pinch: !pinchCheckbox})}}
                                    className={`${styles.checkbox} ${pinchCheckbox ? styles.active : null}`}
                                ></div>
                            </div>
                            <div className={styles.successionCheckboxRow}>
                                <h6>Pot On</h6>
                                <div
                                    onClick={() => {setPotCheckbox(!potCheckbox), setPlanting({...planting, pot_on: !potCheckbox})}}
                                    className={`${styles.checkbox} ${potCheckbox ? styles.active : null}`}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.buttonsContainer}>
                <button onClick={() => save()}>Save Changes</button>
                <button onClick={() => reset()}>Reset</button>
            </div>
        </div>
    );
};

export default CurrentPlan;
