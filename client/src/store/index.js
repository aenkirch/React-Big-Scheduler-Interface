import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "../reducers/index";
import thunk from 'redux-thunk';

/*  
    *
    * Ce fichier nous permet de définir notre reducer comme le fichier qui gardera en lui le state de notre projet
    * => définition du store
    * 
*/

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;