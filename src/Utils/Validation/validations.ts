import textConstants from '../applicationConstants'

export const validatePhonebookName = (value: any) => {
    if(value === null || value === undefined || value.length === 0 ){
        return textConstants.phonebookNameLength;
    }
}

export const validateEntryName = (value: any) => {
    if(value === null || value === undefined || value.length === 0 ){
        return textConstants.entryNameLength;
    }
}

export const validateEntryPhoneNumber = (value: any) => {
    if(value === null || value === undefined || value.length === 0 ){
        return textConstants.entryPhoneNumberLength;
    }
}

export const validate10DigitPhoneNumber = (value: any) => {

    // Need to refine
    const phoneNumberRegEx = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    const regex = new RegExp(phoneNumberRegEx);

    if(!regex.test(value) ){
        return "Please enter a valid phone number."
    }
}