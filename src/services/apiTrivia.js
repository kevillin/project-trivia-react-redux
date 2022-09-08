const apiTrivia = async () => {
  const requestApi = await fetch('https://opentdb.com/api_token.php?command=request');
  const result = await requestApi.json();
  return result;
};

export default apiTrivia;
