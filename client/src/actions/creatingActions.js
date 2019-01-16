import axios from 'axios';
import store from "../store/index";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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