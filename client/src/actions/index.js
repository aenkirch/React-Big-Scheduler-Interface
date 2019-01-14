
import { LOAD_AGENDA_DATA, ALL_FORMATIONS_LOADED, 
    ALL_GROUPES_LOADED, PREV_CLICK, NEXT_CLICK,
    ON_VIEW_CHANGE, ON_SELECT_DATE,
    LOAD_AGENDA_DATA_AFTER_EDIT, 
    MOVE_EVENT, UPDATE_EVENT_END,
    UPDATE_EVENT_START} from "../constants/index";
import store from "../store/index";
import axios from 'axios';
import moment from 'moment';

export function loadAgendaData(idFormation, idGroupe) {
    return function(dispatch){
        return axios.post('/api/getModule', {
            id_form: idFormation
        }).then((resResources) => {
            return axios.post('/api/getCreneaux', {
                id_grpe: idGroupe
            }).then((resEvents) => {
                resEvents.data.forEach((element) => {
                    element.start = moment.unix(element.start).format("YYYY-MM-DD HH:mm:ss");
                    element.end = moment.unix(element.end).format("YYYY-MM-DD HH:mm:ss");
                })
                dispatch({ type: LOAD_AGENDA_DATA, payload: {resources: resResources.data, events: resEvents.data, idFormation: idFormation, idGroupe: idGroupe} })
            })
        })
    }
};

export function getAllFormations() {
    return function(dispatch){
        return fetch("/api/getFormations")
        .then(response => response.json())
        .then(json => {
          dispatch({ type: ALL_FORMATIONS_LOADED, payload: json });
        });
    }
}

export function getAllGroupes(idFormation) {
    return function(dispatch){
        return axios.post('/api/getGroupe', {id_form: idFormation})
        .then((response) => {
            dispatch({ type: ALL_GROUPES_LOADED, payload: response.data })
        })
        .catch((err) => {
            throw err;
        })
    }
}

export function prevClick(){
    return ({type: PREV_CLICK, payload: {}})
}

export function nextClick(){
    return ({type: NEXT_CLICK, payload: {}})
}

export function onViewChange(schedulerData, view){
    return ({type: ON_VIEW_CHANGE, payload: view})
}

export function onSelectDate(schedulerData, date){
    return ({type: ON_SELECT_DATE, payload: date})
}

export function moveEvent(schedulerData, event, slotId, slotName, start, end){
    return ({type: MOVE_EVENT, payload: {schedulerData, event, slotId, slotName, start, end}})
}

export function updateEventStart(schedulerData, event, newStart){
    return ({type: UPDATE_EVENT_START, payload: {schedulerData, event, newStart}})
}

export function updateEventEnd(schedulerData, event, newEnd){
    return ({type: UPDATE_EVENT_END, payload: {schedulerData, event, newEnd}})
}

export function saveEvent(schedulerData, event){
    return function(dispatch){
        return axios.post('/api/saveEvent', {
            tDeb: moment(event.start).format('X'),
            tFin: moment(event.end).format('X'),
            id: event.id
        }).then(() => {
            return axios.post('/api/getCreneaux', {
                id_grpe: store.getState().idGroupe
            }).then((resEvents) => {
                resEvents.data.forEach((element) => {
                    element.start = moment.unix(element.start).format("YYYY-MM-DD HH:mm:ss");
                    element.end = moment.unix(element.end).format("YYYY-MM-DD HH:mm:ss");
                })
                dispatch({ type: LOAD_AGENDA_DATA_AFTER_EDIT, payload: {events: resEvents.data} })
            })
        })
    }
}

export function deleteEvent(schedulerData, event){
    return function(dispatch){
        return axios.post('/api/deleteEvent', {
            id: event.id
        }).then(() => {
            return axios.post('/api/getCreneaux', {
                id_grpe: store.getState().idGroupe
            }).then((resEvents) => {
                resEvents.data.forEach((element) => {
                    element.start = moment.unix(element.start).format("YYYY-MM-DD HH:mm:ss");
                    element.end = moment.unix(element.end).format("YYYY-MM-DD HH:mm:ss");
                })
                dispatch({ type: LOAD_AGENDA_DATA_AFTER_EDIT, payload: {events: resEvents.data} })
            })
        })
    }
}