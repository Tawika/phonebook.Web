import { cloneDeep } from 'lodash';
import CreateEntry from '../models/Entry/Commands/CreateEntry';

// Actions
export const ACTION_ADD_ENTRY = 'ACTION_ADD_ENTRY';
export const ACTION_TOGGLE_MODAL = 'ACTION_TOGGLE_MODAL';
export const ACTION_CLEAR_REDUCER = 'ACTION_CLEAR_REDUCER';

// State interface
export interface ICreateEntryState {
    isOpen: boolean,
    entries: Array<CreateEntry>
}

// State
const initialState: ICreateEntryState = {
    isOpen: false,
    entries: new Array<CreateEntry>(),
}

const reducer = (state = initialState, action: any) : ICreateEntryState => {
    switch (action.type) {
        case ACTION_TOGGLE_MODAL:
                state = cloneDeep(state);
                state.isOpen = !state.isOpen;
                return state;
        case ACTION_ADD_ENTRY:
            state = cloneDeep(state);
            state.entries = [...state.entries, action.payload];
            return state;
        case ACTION_CLEAR_REDUCER:
            state = cloneDeep(state);
            state.isOpen = false;
            state.entries = new Array<CreateEntry>();
            return state;
        default:
            return state;
    }
}

// Action Creators
export const actionToggleModal = () => ({
    type: 'ACTION_TOGGLE_MODAL',
});

export const actionAddEntry = (entry: CreateEntry) => ({
    type: 'ACTION_ADD_ENTRY',
    payload: entry,
});

export const actionClearReducer = () => ({
    type: 'ACTION_CLEAR_REDUCER',
});

// Thunks

export default reducer;