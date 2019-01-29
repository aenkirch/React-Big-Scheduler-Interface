import { SHOW_FIRST_VIEW, SHOW_SECOND_VIEW } from "../constants/index";

export function showFirstView() {
    return function(dispatch){
        dispatch({ type: SHOW_FIRST_VIEW })
    }
}

export function showSecondView() {
    return function(dispatch){
        dispatch({ type: SHOW_SECOND_VIEW })
    }
}