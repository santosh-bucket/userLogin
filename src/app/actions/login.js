export const login = (request) => {  
  return async (dispatch, getState) => {
    let userData = getState().User.data;
    dispatch({
      type: "GET_LOGIN_DATA"
    });
    try {
      if(userData && userData.length === 0){
        const url = "https://jsonplaceholder.typicode.com/users";
        const response = await fetch(url);
        userData = await response.json();          
      }
      let loginData = [];
      if (userData && userData.length > 0) {
          loginData = userData.filter(x => {           
              return x.email == request.email && x.username == request.username;
          });
      }
       
      if (loginData && loginData.length == 1) {
        localStorage.setItem("loggedInUser", true);    
        dispatch({
          type: "GET_LOGIN_DATA_SUCCESS"
        });
      } else {      
        console.log("Data Validation failure");
        dispatch({
          type: "GET_LOGIN_DATA_FAILURE",
          error: {
            message: "Something went wrong",
            stack: "VALIDATION ERROR"
          }
        });
      } 
    } catch (error) {
      dispatch({
        type: "GET_LOGIN_DATA_FAILURE",
        error
      });
    } 
    
  }
}
export const logout = () => {  
  return async (dispatch) => {   
    dispatch({
      type: "GET_LOGOUT_DATA_SUCCESS"
    });
  }
}

