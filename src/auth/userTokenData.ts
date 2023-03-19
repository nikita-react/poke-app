const getUserTokenData = () => {
  const loggedIn = localStorage.getItem("PokeApp") == null ? true : false;
  return loggedIn;
};
export default getUserTokenData;
