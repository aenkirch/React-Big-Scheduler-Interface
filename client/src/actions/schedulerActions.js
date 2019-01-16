import { PREV_CLICK, NEXT_CLICK,
    ON_VIEW_CHANGE, ON_SELECT_DATE,
    LOAD_AGENDA_DATA_AFTER_EDIT, 
    MOVE_EVENT, UPDATE_EVENT_END,
    UPDATE_EVENT_START} from "../constants/index";
import store from "../store/index";
import axios from 'axios';
import moment from 'moment';

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