export const getUserData = () => {  
  return async dispatch => {
    dispatch({
      type: "GET_USER_DATA"
    });
    const url = "https://jsonplaceholder.typicode.com/users";
    const response = await fetch(url);
    const data = await response.json();  
    console.log("ActionData->", data);    
    try {
      if (data && Array.isArray(data)) {       
        dispatch({
          type: "GET_USER_DATA_SUCCESS",
          payload: data
        });
      } else {      
        console.log("Data Validation failure");
        dispatch({
          type: "GET_USER_DATA_FAILURE",
          error: {
            message: "Something went wrong",
            stack: "VALIDATION ERROR"
          }
        });
      } 
    } catch (error) {
      console.log("ERROR->");
      dispatch({
        type: "GET_USER_DATA_FAILURE",
        error
      });
    } 
    
  }
}

