import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer } from 'redux-form';
import reducerCreatephonebook from '../reducers/reducerPhonebook'
import reducerCreateEntry from '../reducers/reducerCreateEntry'
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const rootReducer = combineReducers({
        router: connectRouter(history),
        form: reducer,
        createPhonebook: reducerCreatephonebook,
        createEntry:reducerCreateEntry,
    });

export type rootState = ReturnType<typeof rootReducer>;