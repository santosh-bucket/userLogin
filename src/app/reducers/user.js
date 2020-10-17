const INITIAL_STATE = {
    data: [],    
    isPending: false,
    isError: false,
    error: {
      status: "",
      message: ""
    }    
  };

  export const User = (state = INITIAL_STATE, action) => {  
  switch (action.type) {  
    case "GET_USER_DATA":    
    return {   
        ...state,     
        isPending: true
    };    
  case "GET_USER_DATA_SUCCESS":    
    return {   
        ...state,
        data: [ ...(action.payload || []) ],
        isPending: false
    }; 
    case "GET_USER_DATA_FAILURE":
    return {
        ...state,
        data: [],
        error: {
          status: action.error.stack,
          message: action.error.message
        },
        isError: true,
        isPending: false
  }; 
  default:
    return state;
  }
};
