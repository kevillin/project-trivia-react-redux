export const SAVE_TOKEN = 'SAVE_TOKEN';
export const SAVE_NAME_USER = 'SAVE_NAME_USER';
export const SAVE_EMAIL_USER = 'SAVE_EMAIL_USER';

export const saveToken = (payload) => ({ type: SAVE_TOKEN, payload });
export const saveEmailUser = (payload) => ({ type: SAVE_EMAIL_USER, payload });
export const saveNameUser = (payload) => ({ type: SAVE_NAME_USER, payload });
