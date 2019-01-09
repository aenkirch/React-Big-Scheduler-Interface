
import { ALL_GROUPES_LOADED, ALL_FORMATIONS_LOADED, LOAD_AGENDA_DATA } from "../constants/index";
import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT} from 'react-big-scheduler'

const initialState = {
    schedulerData : new SchedulerData('2018-10-17', ViewTypes.Week, false, false, {
    }),
    allFormations : [],
    allGroupes : []
};

function rootReducer(state = initialState, action) {
    let tempScheduler = new SchedulerData('2018-10-17', ViewTypes.Week, false, false, {
    });

    if (action.type === LOAD_AGENDA_DATA){
        tempScheduler.setResources(action.payload.resources);
        tempScheduler.setEvents(action.payload.events);
        return Object.assign({}, state, {
            schedulerData: tempScheduler
        })
    }

    if (action.type === ALL_GROUPES_LOADED){
        return Object.assign({}, state, {
            allGroupes: action.payload
        })
    }

    if (action.type === ALL_FORMATIONS_LOADED) {
        return Object.assign({}, state, {
            allFormations: action.payload
        })
    }
    
    return state;
};

export default rootReducer;