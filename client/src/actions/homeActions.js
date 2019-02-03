
import { LOAD_AGENDA_DATA, ALL_FORMATIONS_LOADED, 
    ALL_GROUPES_LOADED, 
    EVENT_INFOS_ENDED } from "../constants/index";
import axios from 'axios';
import moment from 'moment';

/*  
    *
    * This class contains all the actions that will be called by the Home component to trigger a certain action of a user interaction
    * 
    * for example : this class contains the action that will be made on the state when a user fill the select elements on the home menu (loading agenda data)
    * 
*/

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
                return axios.post('/api/getPeriodes', {
                    idFormation: idFormation
                }).then((resPeriodes) => {  
                    dispatch({ type: LOAD_AGENDA_DATA, payload: {resources: resResources.data, events: resEvents.data, idFormation: idFormation, idGroupe: idGroupe, periodes: resPeriodes.data} })
                })
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

export function closeEventInfos() {
    return function(dispatch){
        dispatch({ type: EVENT_INFOS_ENDED })
    }
}