import { cloneDeep } from 'lodash';
import Notification from '../components/Notification/ToastNotification';
import CreatePhonebookCommand from '../models/Phonebook/Commands/CreatePhonebook';
import Phonebook from '../models/Phonebook/Phonebook';
import axiosInstance from '../Utils/apiHandler/axiosInstance'
import { base64toBlob } from '../Utils/utils';

// Actions
export const ACTION_SAVE_PHONEBOOK = 'ACTION_SAVE_PHONEBOOK';
export const ACTION_FETCHING_PHONEBOOK = 'ACTION_FETCHING_PHONEBOOK';
export const ACTION_LOAD_PHONEBOOK = 'ACTION_LOAD_PHONEBOOK';
export const ACTION_CLEAR_REDUCER = 'ACTION_CLEAR_REDUCER';
export const ACTION_TOGGLE = 'ACTION_TOGGLE';
export const ACTION_ADD_PHONEBOOK_NAME = 'ACTION_ADD_PHONEBOOK_NAME';

// State interface
interface ICreatePhonebookState {
    phonebook: Phonebook | null,
    isLoading: boolean,
    isOpen: boolean,
    phonebookName: string,
}

// State
const initialState: ICreatePhonebookState = {
    phonebook: null,
    isLoading: false,
    isOpen: false,
    phonebookName: "",
}

const reducer = (state = initialState, action: any): ICreatePhonebookState => {
    switch (action.type) {
        case ACTION_FETCHING_PHONEBOOK:
            state = cloneDeep(state);
            state.isLoading = action.payload;
            return state;
        case ACTION_LOAD_PHONEBOOK:
            state = cloneDeep(state);
            state.phonebook = action.payload;
            return state;
        case ACTION_CLEAR_REDUCER:
            state = cloneDeep(state);

            state.phonebook = null;
            state.isLoading = false;
            state.isOpen = false;
            state.phonebookName = "";

            return state;
        case ACTION_TOGGLE:
            state = cloneDeep(state);
            state.isOpen = !state.isOpen;
            return state;
        case ACTION_ADD_PHONEBOOK_NAME:
            state = cloneDeep(state);
            state.phonebookName = action.payload;
            return state;
        default:
            return state;
    }
}

// Action Creators
export const actionFetchingPhonebook = (fetching: boolean) => ({
    type: ACTION_FETCHING_PHONEBOOK,
    payload: fetching
});

export const actionLoadPhonebook = (phonebook: Phonebook) => ({
    type: ACTION_LOAD_PHONEBOOK,
    payload: phonebook
});

export const actionClearReducer = (phonebook: Phonebook) => ({
    type: ACTION_CLEAR_REDUCER,
});

export const actionToggleModal = () => ({
    type: 'ACTION_TOGGLE',
});

export const actionAddPhonebookName = (name: string) => ({
    type: ACTION_ADD_PHONEBOOK_NAME,
    payload: name
});

// Thunks
export const thunkSavePhonebook = (phonebookToSave: CreatePhonebookCommand) => (dispatch: any) => {

    const response = new Promise((resolve, reject) => {
        axiosInstance.post('/api/Phonebook', phonebookToSave)
            .then(function (response) {
                resolve(response.data);
            }).catch(function (error) {
                Notification({message: error.response.data.Message, position: "top-right", type: "error" });
            });
    });

    return response;
}

export const thunkGetPhonebook = (pageSize: number, pageNo: number, searchStr: string, sortColumn: string, sortDesc: boolean) => (dispatch: any) => {

    dispatch(actionFetchingPhonebook(true));

    axiosInstance.get(`/api/Phonebook/GetPhonebookPaged?pageSize=${pageSize}&pageNo=${pageNo}&searchStr=${searchStr}&sortColumn=${sortColumn}&sortDesc=${sortDesc}`)
        .then(function (response) {

            dispatch(actionFetchingPhonebook(false));
            dispatch(actionLoadPhonebook(response.data));

        }).catch(function (error) {
            dispatch(actionFetchingPhonebook(false));
            Notification({message: error.response.data.Message, position: "top-right", type: "error" });
        });
}

export const thunkDownloadPhonebook = () => (dispatch: any) => {

    axiosInstance.get('/api/Phonebook/DownloadPhonebook').then((response: any) => {
        const url = window.URL.createObjectURL(base64toBlob(response.data, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', "Entries.xlsx");
        document.body.appendChild(link);
        link.click();
        link.remove();

    }).catch((error: any) => {
        Notification({message: error.response.data.Message, position: "top-right", type: "error" });
    });
}

export default reducer;