import { getQuestions } from '../../services/apiTrivia';

export const SAVE_TOKEN = 'SAVE_TOKEN';
export const SAVE_NAME_USER = 'SAVE_NAME_USER';
export const SAVE_EMAIL_USER = 'SAVE_EMAIL_USER';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const SAVE_SCORE = 'SAVE_SCORE';
export const ERROU_QUESTION = 'ERROU_QUESTION';
export const ACERTOU_QUESTION = 'ACERTOU_QUESTION';

export const saveToken = (payload) => ({ type: SAVE_TOKEN, payload });
export const saveEmailUser = (payload) => ({ type: SAVE_EMAIL_USER, payload });
export const saveNameUser = (payload) => ({ type: SAVE_NAME_USER, payload });
export const getRightAnswer = (payload) => ({ type: ACERTOU_QUESTION, payload });
// export const getWrongAnswer = (payload) => ({ type: ERROU_QUESTION, payload });

export const saveQuestions = (data) => ({
  type: SAVE_QUESTIONS,
  payload: data,
});

export const fetchQuestionsAction = (token) => async (dispatch) => {
  const response = await getQuestions(token);

  dispatch(saveQuestions(response));
};

export const saveScore = (payload) => ({
  type: SAVE_SCORE,
  payload,
});
