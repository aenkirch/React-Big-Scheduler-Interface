import { LOAD_MATIERES_AFTER_EDIT } from "../constants/index";
import store from "../store/index";
import axios from 'axios';

export function decrementTime(nbHactuel, id_mat){
    return function(dispatch){
        return axios.post('/api/modifyTimeForPeriode', {
            nouvellePeriode: nbHactuel-1,
            id_mat
        }).then(() => {
            return axios.post("/api/getAllMatieres", {
                id_formation: store.getState().idFormation
            }).then((res) => {
                dispatch({ type: LOAD_MATIERES_AFTER_EDIT, payload: res.data });
            })
        })
    }
}

export function incrementTime(nbHactuel, id_mat){
    return function(dispatch){
        return axios.post('/api/modifyTimeForPeriode', {
            nouvellePeriode: nbHactuel+1,
            id_mat
        }).then(() => {
            return axios.post("/api/getAllMatieres", {
                id_formation: store.getState().idFormation
            }).then((res) => {
                dispatch({ type: LOAD_MATIERES_AFTER_EDIT, payload: res.data });
            })
        })
    }
}

export function deleteNbHforMatiere(id_mat){
    return function(dispatch){
        return axios.post("/api/deleteNbH", {
            id_mat
        }).then((res) => {
            return axios.post("/api/getAllMatieres", {
                id_formation: store.getState().idFormation
            }).then((res) => {
                dispatch({ type: LOAD_MATIERES_AFTER_EDIT, payload: res.data });
            })
        })
    }
}

export function changePeriodeForMatiere(nouvellePeriode, id_mat){
    return function(dispatch){
        return axios.post('/api/modifyPeriodeForMatiere', {
            nouvellePeriode,
            id_mat
        }).then(() => {
            return axios.post("/api/getAllMatieres", {
                id_formation: store.getState().idFormation
            }).then((res) => {
                dispatch({ type: LOAD_MATIERES_AFTER_EDIT, payload: res.data });
            })
        })
    }
}