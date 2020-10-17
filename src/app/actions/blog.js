export const getBlogData = () => {  
  return async dispatch => {
    dispatch({
      type: "GET_BLOG_DATA"
    });
    const url = "https://jsonplaceholder.typicode.com/posts";
    const response = await fetch(url);
    const data = await response.json();   
    try {
      if (data && Array.isArray(data)) { 
        let filterData = [];
        if (data.length > 0) {
          filterData = data.filter(x => {           
                return x.userId === 2;
            });
        }      
        dispatch({
          type: "GET_BLOG_DATA_SUCCESS",
          payload: filterData
        });
      } else {      
        console.log("Data Validation failure");
        dispatch({
          type: "GET_BLOG_DATA_FAILURE",
          error: {
            message: "Something went wrong",
            stack: "VALIDATION ERROR"
          }
        });
      } 
    } catch (error) {
      dispatch({
        type: "GET_BLOG_DATA_FAILURE",
        error
      });
    } 
    
  }
}

