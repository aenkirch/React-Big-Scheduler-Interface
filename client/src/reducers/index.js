import { combineReducers } from 'redux';
import { ALL_GROUPES_LOADED, ALL_FORMATIONS_LOADED,
    LOAD_AGENDA_DATA, PREV_CLICK, NEXT_CLICK,
    ON_VIEW_CHANGE, ON_SELECT_DATE,
    LOAD_AGENDA_DATA_AFTER_EDIT,
    MOVE_EVENT, UPDATE_EVENT_END,
    UPDATE_EVENT_START, ALL_MODULES_LOADED, ALL_MATIERES_LOADED,
    ALL_PROFS_LOADED, ALL_SALLES_LOADED, EVENT_INFOS_LOADED, 
    EVENT_INFOS_ENDED, SHOW_FIRST_VIEW, SHOW_SECOND_VIEW,
    LOAD_MATIERES_AFTER_EDIT } from "../constants/index";
import { SchedulerData, ViewTypes } from 'react-big-scheduler';
import config from "../schedulerConfig";

/*  
    *
    * This file contains the state of the app :
    * 
    * all the state elements can be seen in the const rootReducer (see the end of the file)
    * 
    * each reducer corresponds to a state element, depending on the type of the action triggered by the component that triggered it,
    * a certain element of the state will be modified
    * 
*/
 
const schedulerDataReducer = (state = new SchedulerData('2018-10-17', ViewTypes.Week, false, false, config), action) => {

  const tempScheduler = new SchedulerData(state.startDate, state.viewType, false, false, config);
 
  switch (action.type) {
    case LOAD_AGENDA_DATA:
      tempScheduler.setResources(action.payload.resources);
      tempScheduler.setEvents(action.payload.events);
      return tempScheduler;
 
    case LOAD_AGENDA_DATA_AFTER_EDIT:
      tempScheduler.setResources(state.resources);
      tempScheduler.setEvents(action.payload.events);
      return tempScheduler;
 
    case PREV_CLICK:
      tempScheduler.prev();
      tempScheduler.setResources(state.resources);
      tempScheduler.setEvents(state.events);
      return tempScheduler;
 
    case NEXT_CLICK:
      tempScheduler.next();
      tempScheduler.setResources(state.resources);
      tempScheduler.setEvents(state.events);
      return tempScheduler;
 
    case ON_VIEW_CHANGE:
      tempScheduler.setViewType(action.payload.viewType, action.payload.showAgenda, action.payload.isEventPerspective);
      tempScheduler.setResources(state.resources);
      tempScheduler.setEvents(state.events);
      return tempScheduler;
 
    case ON_SELECT_DATE:
      tempScheduler.setDate(action.payload);
      tempScheduler.setResources(state.resources);
      tempScheduler.setEvents(state.events);
      return tempScheduler;
 
    case MOVE_EVENT:
      tempScheduler.setResources(state.resources);
      tempScheduler.setEvents(state.events);
      tempScheduler.moveEvent(action.payload.event, action.payload.slotId, action.payload.slotName, action.payload.start, action.payload.end);
      return tempScheduler;
 
    case UPDATE_EVENT_START:
      tempScheduler.setResources(state.resources);
      tempScheduler.setEvents(state.events);
      tempScheduler.updateEventStart(action.payload.event, action.payload.newStart);
      return tempScheduler;
 
    case UPDATE_EVENT_END:
      tempScheduler.setResources(state.resources);
      tempScheduler.setEvents(state.events);
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

const allModulesReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_AGENDA_DATA:
      return action.payload.resources
    case ALL_MODULES_LOADED:
      return action.payload;
    default:
      return state;
  }
};

const allMatieresReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_MATIERES_AFTER_EDIT:
      return action.payload;
    case ALL_MATIERES_LOADED:
      return action.payload;
    default:
      return state;
  }
};

const allProfsReducer = (state = [], action) => {
  switch (action.type) {
    case ALL_PROFS_LOADED:
      return action.payload;
    default:
      return state;
  }
};

const allSallesReducer = (state = [], action) => {
  switch (action.type) {
    case ALL_SALLES_LOADED:
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

const eventInfosReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_INFOS_LOADED:
      return action.payload;
    case EVENT_INFOS_ENDED:
      return {};
    default:
      return state;
  }
};

const isFirstViewActiveReducer = (state = true, action) => {
  switch (action.type) {
    case SHOW_FIRST_VIEW:
      return true;
    case SHOW_SECOND_VIEW:
      return false;
    default:
      return state;
  }
};

const allPeriodesReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_AGENDA_DATA:
      return action.payload.periodes;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  schedulerData: schedulerDataReducer,
  allFormations: allFormationsReducer,
  allGroupes: allGroupesReducer,
  allModules: allModulesReducer,
  allMatieres: allMatieresReducer,
  allProfs: allProfsReducer,
  allSalles: allSallesReducer,
  idGroupe: idGroupeReducer,
  idFormation: idFormationReducer,
  eventInfos: eventInfosReducer,
  isFirstViewActive: isFirstViewActiveReducer,
  allPeriodes: allPeriodesReducer
})
 
export default rootReducer;