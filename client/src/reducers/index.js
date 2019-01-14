
import { ALL_GROUPES_LOADED, ALL_FORMATIONS_LOADED, 
    LOAD_AGENDA_DATA, PREV_CLICK, NEXT_CLICK, 
    ON_VIEW_CHANGE, ON_SELECT_DATE,
    LOAD_AGENDA_DATA_AFTER_EDIT,
    MOVE_EVENT, UPDATE_EVENT_END, 
    UPDATE_EVENT_START} from "../constants/index";
import { SchedulerData, ViewTypes } from 'react-big-scheduler'

const initialState = {
    schedulerData : new SchedulerData('2018-10-17', ViewTypes.Week),
    allFormations : [],
    allGroupes : [],
    idGroupe: '',
    idFormation: ''
};

function rootReducer(state = initialState, action) {
    let tempScheduler = new SchedulerData(state.schedulerData.startDate, state.schedulerData.viewType);

    switch (action.type) {
        case LOAD_AGENDA_DATA:
            tempScheduler.setResources(action.payload.resources);
            tempScheduler.setEvents(action.payload.events);
            return Object.assign({}, state, {
                schedulerData: tempScheduler,
                idGroupe: action.payload.idGroupe,
                idFormation: action.payload.idFormation
            })
        
        case LOAD_AGENDA_DATA_AFTER_EDIT:
            tempScheduler.setResources(state.schedulerData.resources);
            tempScheduler.setEvents(action.payload.events);
            return Object.assign({}, state, {
                schedulerData: tempScheduler
            })

        case ALL_GROUPES_LOADED:
            return Object.assign({}, state, {
                allGroupes: action.payload
            })
        
        case ALL_FORMATIONS_LOADED:
            return Object.assign({}, state, {
                allFormations: action.payload
            })

        case PREV_CLICK:
            tempScheduler.prev();
            tempScheduler.setResources(state.schedulerData.resources);
            tempScheduler.setEvents(state.schedulerData.events);
            return Object.assign({}, state, {
                schedulerData: tempScheduler
            })

        case NEXT_CLICK:
            tempScheduler.next();
            tempScheduler.setResources(state.schedulerData.resources);
            tempScheduler.setEvents(state.schedulerData.events);
            return Object.assign({}, state, {
                schedulerData: tempScheduler
            })

        case ON_VIEW_CHANGE:
            tempScheduler.setViewType(action.payload.viewType, action.payload.showAgenda, action.payload.isEventPerspective);
            tempScheduler.setResources(state.schedulerData.resources);
            tempScheduler.setEvents(state.schedulerData.events);
            return Object.assign({}, state, {
                schedulerData: tempScheduler
            })

        case ON_SELECT_DATE:
            tempScheduler.setDate(action.payload);
            tempScheduler.setResources(state.schedulerData.resources);
            tempScheduler.setEvents(state.schedulerData.events);
            return Object.assign({}, state, {
                schedulerData: tempScheduler
            })

        case MOVE_EVENT:
            tempScheduler.setResources(state.schedulerData.resources);
            tempScheduler.setEvents(state.schedulerData.events);
            tempScheduler.moveEvent(action.payload.event, action.payload.slotId, action.payload.slotName, action.payload.start, action.payload.end);
            return Object.assign({}, state, {
                schedulerData: tempScheduler
            })

        case UPDATE_EVENT_START:
            tempScheduler.setResources(state.schedulerData.resources);
            tempScheduler.setEvents(state.schedulerData.events);
            tempScheduler.updateEventStart(action.payload.event, action.payload.newStart);
            return Object.assign({}, state, {
                schedulerData: tempScheduler
            })

        case UPDATE_EVENT_END:
            tempScheduler.setResources(state.schedulerData.resources);
            tempScheduler.setEvents(state.schedulerData.events);
            tempScheduler.updateEventEnd(action.payload.event, action.payload.newEnd);
            return Object.assign({}, state, {
                schedulerData: tempScheduler
            })

        default:
            return state;
    }
};

export default rootReducer;

// => peut pas utiliser combineReducers pour le moment puisque il faut que le Scheduler aie une valeur au démarrage !