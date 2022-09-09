export const getToken = async () => {
  const requestApi = await fetch('https://opentdb.com/api_token.php?command=request');
  const result = await requestApi.json();
  return result;
};

export const getQuestions = async (token) => {
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const requestApi = await fetch(URL);
  const result = await requestApi.json();
  return result;
};
