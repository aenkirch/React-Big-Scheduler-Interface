import { ALL_MODULES_LOADED, ALL_MATIERES_LOADED, ALL_PROFS_LOADED, ALL_SALLES_LOADED } from '../constants';
import axios from 'axios';
import store from "../store/index";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function getAllModules() {
    return function(dispatch){
        return fetch("/api/getAllModules")
        .then(response => response.json())
        .then(json => {
          dispatch({ type: ALL_MODULES_LOADED, payload: json });
        });
    }
}

export function getAllMatieres() {
    return function(dispatch){
        return fetch("/api/getAllMatieres")
        .then(response => response.json())
        .then(json => {
          dispatch({ type: ALL_MATIERES_LOADED, payload: json });
        });
    }
}

export function getAllProfs() {
    return function(dispatch){
        return fetch("/api/getAllProfs")
        .then(response => response.json())
        .then(json => {
          dispatch({ type: ALL_PROFS_LOADED, payload: json });
        });
    }
}

export function getAllSalles() {
    return function(dispatch){
        return fetch("/api/getAllSalles")
        .then(response => response.json())
        .then(json => {
          dispatch({ type: ALL_SALLES_LOADED, payload: json });
        });
    }
}

export function createFormation(champFormation, champFormationLabel){
    return function(dispatch){
        return axios.post('/api/createFormation', {
            nom: champFormation,
            id: store.getState().allFormations[store.getState().allFormations.length - 1].id + 1,
            label: champFormationLabel
        }).then((res) => {
            toast.success("Formation "+champFormation+" créée avec succès !");
            dispatch({type: ''});
        }).catch((err) => { toast.error("Erreur ! Formation "+champFormation+" non créée.") });
    }
}

export function createGroupe(selectedFormationId, champNumeroGroupe, champTypeGroupe){
    return function(dispatch){
        return fetch('/api/getNbGroupes')
        .then(response => response.json())
        .then(json => {
            return axios.post('/api/createGroupe', {
                id_grpe: parseInt(json)+1,
                num_grpe: champNumeroGroupe,
                id_promo: selectedFormationId,
                type_grpe: champTypeGroupe
            }).then((res) => {
                toast.success("Groupe "+champNumeroGroupe+" créée avec succès !");
                dispatch({type: ''});
            })
        }).catch((err) => { toast.error("Erreur ! Groupe "+champNumeroGroupe+" non crée.") });
    }
}

export function createModule(selectedFormationId, champNomModule, champLabelModule){
    return function(dispatch){
        return axios.post('/api/createUE', {
            id_grpe: store.getState().allFormations.length,
            id_form: selectedFormationId,
            nom: champNomModule,
            label: champLabelModule
        }).then((res) => {
            toast.success("Module "+champNomModule+" créée avec succès !");
            dispatch({type: ''});
        })
        .catch((err) => { toast.error("Erreur ! Module "+champNomModule+" non crée.") });
    }
}

export function createMatiere(selectedModuleId, champNomMatiere, champLabelMatiere, champCouleur){
    return function(dispatch){
        return fetch('/api/getNbMatieres')
        .then(response => response.json())
        .then(json => {
            return axios.post('/api/createMatiere', {
                id_mat: parseInt(json)+1,
                id_ue: selectedModuleId,
                nom: champNomMatiere,
                label: champLabelMatiere,
                couleur: champCouleur
            }).then((res) => {
                toast.success("Matière "+champNomMatiere+" créée avec succès !");
                dispatch({type: ''});
            })
        }).catch((err) => { toast.error("Erreur ! Matière "+champNomMatiere+" non crée.") });
    }
}