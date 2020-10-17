const INITIAL_STATE = { 
    isPending: false,    
    isLoggedIn: false,
    isError: false,
    error: {
      status: "",
      message: ""
    }    
  };

  export const Login = (state = INITIAL_STATE, action) => {  
  switch (action.type) {
  case "GET_LOGIN_DATA":    
    return {   
        ...state,     
        isPending: true
    };     
  case "GET_LOGIN_DATA_SUCCESS":    
    return {   
        ...state,
        isLoggedIn: true
    }; 
  case "GET_LOGIN_DATA_FAILURE":
    return {
        ...state,        
        error: {
          status: action.error.stack,
          message: action.error.message
        },
        isError: true,
        isLoggedIn: false
  };
  case "GET_LOGOUT_DATA_SUCCESS":    
    return {   
        ...state,
        isLoggedIn: false
    };  
  default:
    return state;
  }
};
