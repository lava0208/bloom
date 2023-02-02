import React, { useState } from "react";
import moment from "moment";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'bootstrap/dist/css/bootstrap.css';

import styles from "~styles/components/masterplan/calendar.module.scss";

import CalendarToolbar from "~components/masterplan/CalendarToolbar";
import CalendarDetail from "./CalendarDetail";

const CalendarTab = () => {
    const [events, setEvents] = useState([
        {
            id: 1,
            start: moment().toDate(),
            end: moment().toDate(),
            title: "Start Zinnia",
            description: "King Orange Helium",
            type: "start",
            note: {
                title: "Seed Note",
                text: "King Orange Helium is a classic Zinnia, with large and easy to handle seeds. Start two seeds per cell, and lightly cover with vermiculite before moistening. Zinnias are large seedlings and should sprout up in just a few days."
            },
            detail:{
                title: "Start 450 seeds",
                text: "Light is NOT required for germination.",
                day: 14
            }
        },
        {
            id: 2,
            start: moment().toDate(),
            end: moment().add(1, "days").toDate(),
            title: "Harden off Lisianthus",
            description: "King Orange Helium",
            type: "harden",
            note: {
                title: "Harden Note",
                text: "King Orange Helium is a Zinnia, which means it does not tolerate cold well. Hardening is essential."
            },
            detail:{
                title: "Harden Zinnia",
                text: "Bring Zinnia outdoors in the shade for a few hours.",
                day: 7
            }
        },
        {
            id: 3,
            start: moment("2022-07-10T17:31:19+00:00").toDate(),
            end: moment("2022-07-10T17:31:19+00:00").add(1, "days").toDate(),
            title: "Transplant Lisianthus",
            description: "King Orange Helium",
            type: "transplant",
        },
    ]);

    const Calendar = withDragAndDrop(BigCalendar);

    const localizer = momentLocalizer(moment);

    const onEventResize = ({ event, start, end }) => {
        console.log(event);
        const nextEvents = events.map((existingEvent) => {
            return existingEvent.id == event.id
                ? { ...existingEvent, start, end }
                : existingEvent;
        });

        setEvents(nextEvents);
    };

    const onEventDrop = ({ event, start, end }) => {
        const idx = events.indexOf(event);
        const updatedEvent = { ...event, start, end };

        const nextEvents = [...events];
        nextEvents.splice(idx, 1, updatedEvent);

        setEvents(nextEvents);
    };

    const eventStyleGetter = (event) => {
        let backgroundColor = "";
        switch (event.type) {
            case "start":
                backgroundColor = "#505168";
                break;
            case "harden":
                backgroundColor = "#707070";
                break;
            case "transplant":
                backgroundColor = "#eaf0ce";
                break;
            default:
                backgroundColor = "#505168";
        }

        let style = {
            backgroundColor,
            color: event.type === "transplant" ? "#2e2e2e" : "#fff",
        };

        return {
            style,
        };
    };

    const [modalOpen, setModalOpen] = useState(false);
    const [schedule, setSchedule] = useState({});

    const chooseEvent = (event) => {
        console.log(event);
        setSchedule(event);
        setModalOpen(true);
    }

    const saveSchedule = () => {
        setModalOpen(false);
    }
    const cancelSchedule = () => {
        setModalOpen(false);
    }

    return (
        <div className={styles.container}>
            <Calendar
                localizer={localizer}
                events={events}
                onEventDrop={onEventDrop}
                eventPropGetter={eventStyleGetter}
                onEventResize={onEventResize}
                resizeable
                showAllEvents
                selectable
                components={{ toolbar: CalendarToolbar }}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={chooseEvent}
            />
            <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen} centered modalClassName="modifyPlanModal">
                <ModalBody>
                    <CalendarDetail schedule = {schedule} saveSchedule={saveSchedule} cancelSchedule={cancelSchedule} />
                </ModalBody>
            </Modal>
        </div>
    );
};

export default CalendarTab;
