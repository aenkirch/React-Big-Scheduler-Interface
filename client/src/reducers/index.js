import { combineReducers } from 'redux';
import { ALL_GROUPES_LOADED, ALL_FORMATIONS_LOADED,
    LOAD_AGENDA_DATA, PREV_CLICK, NEXT_CLICK,
    ON_VIEW_CHANGE, ON_SELECT_DATE,
    LOAD_AGENDA_DATA_AFTER_EDIT,
    MOVE_EVENT, UPDATE_EVENT_END,
    UPDATE_EVENT_START} from "../constants/index";
import { SchedulerData, ViewTypes } from 'react-big-scheduler'
 
const schedulerDataReducer = (state = new SchedulerData('2018-10-17', ViewTypes.Week), action) => {

  const tempScheduler = new SchedulerData(state.startDate, state.viewType);
 
  switch (action.type) {
    case LOAD_AGENDA_DATA:
      tempScheduler.setResources(action.payload.resources);
      tempScheduler.setEvents(action.payload.events);
      return tempScheduler;
 
    case LOAD_AGENDA_DATA_AFTER_EDIT:
      tempScheduler.setResources(state.schedulerData.resources);
      tempScheduler.setEvents(action.payload.events);
      return tempScheduler;
 
    case PREV_CLICK:
      tempScheduler.prev();
      tempScheduler.setResources(state.schedulerData.resources);
      tempScheduler.setEvents(state.schedulerData.events);
      return tempScheduler;
 
    case NEXT_CLICK:
      tempScheduler.next();
      tempScheduler.setResources(state.schedulerData.resources);
      tempScheduler.setEvents(state.schedulerData.events);
      return tempScheduler;
 
    case ON_VIEW_CHANGE:
      tempScheduler.setViewType(action.payload.viewType, action.payload.showAgenda, action.payload.isEventPerspective);
      tempScheduler.setResources(state.schedulerData.resources);
      tempScheduler.setEvents(state.schedulerData.events);
      return tempScheduler;
 
    case ON_SELECT_DATE:
      tempScheduler.setDate(action.payload);
      tempScheduler.setResources(state.schedulerData.resources);
      tempScheduler.setEvents(state.schedulerData.events);
      return tempScheduler;
 
    case MOVE_EVENT:
      tempScheduler.setResources(state.schedulerData.resources);
      tempScheduler.setEvents(state.schedulerData.events);
      tempScheduler.moveEvent(action.payload.event, action.payload.slotId, action.payload.slotName, action.payload.start, action.payload.end);
      return tempScheduler;
 
    case UPDATE_EVENT_START:
      tempScheduler.setResources(state.schedulerData.resources);
      tempScheduler.setEvents(state.schedulerData.events);
      tempScheduler.updateEventStart(action.payload.event, action.payload.newStart);
      return tempScheduler;
 
    case UPDATE_EVENT_END:
      tempScheduler.setResources(state.schedulerData.resources);
      tempScheduler.setEvents(state.schedulerData.events);
      tempScheduler.updateEventEnd(action.payload.event, action.payload.newEnd);
      return tempScheduler;
 
    default:
      return state;
  }
};
                       
const allFormationsReducer = (state = [], action) => {
  switch (action.type) {
    case ALL_FORMATIONS_LOADED:
      return action.payload;
    default:
      return state;
  }
};
 
const allGroupesReducer = (state = [], action) => {
  switch (action.type) {
    case ALL_GROUPES_LOADED:
      return action.payload;
    default:
      return state;
  }
};
 
const idFormationReducer = (state = '', action) => {
  switch (action.type) {
    case LOAD_AGENDA_DATA:
      return action.payload.idFormation;
    default:
      return state;
  }
};
 
const idGroupeReducer = (state = '', action) => {
  switch (action.type) {
    case LOAD_AGENDA_DATA:
      return action.payload.idGroupe;
    default:
      return state;
  }
};
 
const rootReducer = combineReducers({
  schedulerData: schedulerDataReducer,
  allFormations: allFormationsReducer,
  allGroupes: allGroupesReducer,
  idGroupe: idGroupeReducer,
  idFormation: idFormationReducer
})
 
export default rootReducer;