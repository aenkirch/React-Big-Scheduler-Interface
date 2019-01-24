import { PREV_CLICK, NEXT_CLICK,
    ON_VIEW_CHANGE, ON_SELECT_DATE,
    LOAD_AGENDA_DATA_AFTER_EDIT, 
    MOVE_EVENT, UPDATE_EVENT_END,
    UPDATE_EVENT_START, EVENT_INFOS_LOADED} from "../constants/index";
import store from "../store/index";
import axios from 'axios';
import moment from 'moment';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function prevClick(){
    return ({type: PREV_CLICK})
}

export function nextClick(){
    return ({type: NEXT_CLICK})
}

export function onViewChange(schedulerData, view){
    return ({type: ON_VIEW_CHANGE, payload: view})
}

export function onSelectDate(schedulerData, date){
    return ({type: ON_SELECT_DATE, payload: date})
}

function checkForConflict(schedulerEvents, eventToSaveStart, eventToSaveEnd, eventToSaveId){
    for (let i = 0 ; i < schedulerEvents.length ; i++){
        if ( (! (new Date(schedulerEvents[i].start) >= new Date(eventToSaveEnd) || new Date(schedulerEvents[i].end) <= new Date(eventToSaveStart)))) 
            {
            return false;
        }
    }
    return true;
}

export function moveEvent(schedulerData, event, slotId, slotName, start, end){
    if (checkForConflict(schedulerData.events, start, end, slotId)){
        return ({type: MOVE_EVENT, payload: {schedulerData, event, slotId, slotName, start, end}})
    }
    else{
        toast.error("Erreur : plusieurs évènements se déroulent en même temps !");
        return ({type: ''})
    }
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

export function eventClicked(schedulerData, event) {
    return function(dispatch){
        return axios.post('/api/getProf', {
            id_prof: event.id_prof
        }).then((resProf) => {
            return axios.post('/api/getMatiereInfos', {
                id_mat: event.id_mat
            }).then((resMatiereInfos) => {
                let prof = resProf.data[0].genre + '. ' +  resProf.data[0].nom + ' ' + resProf.data[0].prenom;
                let themes = resMatiereInfos.data[0].themes;
                let typeEns = resMatiereInfos.data[0].typeEns;
                dispatch({ type: EVENT_INFOS_LOADED, payload: { event, prof, themes, typeEns } })
            })
        })
    }
}