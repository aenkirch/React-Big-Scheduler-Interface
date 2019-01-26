import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './components/Main';
import { Provider } from 'react-redux';
import store from './store/index';
import registerServiceWorker from './registerServiceWorker';        // TESTER DE METTRE LE FOND GRIS SUR LA TOTALITE DE LA PAGE
                                                                    // ET DETOURER AVEC UN FIN TRAIT NOIR LE MENU
                                                                    // STYLE INSTAGRAM = + PRO !

ReactDOM.render(
    <Provider store = {store}>
        <Main />
    </Provider>, 
document.getElementById('root'));
registerServiceWorker();
