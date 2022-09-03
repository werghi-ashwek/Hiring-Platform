/*export const getlocalstorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};*/

export const setHeaders = () => {
  
    const headers = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    console.log(headers);
    return headers;
  
};
