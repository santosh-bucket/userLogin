import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserData } from '../actions/user';
import Nav from "../components/Nav";
import MyLoaderImage from '../../images/ajax-loader.gif';

const User = (props) => {
    const searchInput = React.useRef();
    const [ isSearch, setSearch ] = useState(false);
    const [ serachResult, setSerachResult ] = useState([]);
    useEffect(() => {
        props.getUserData(); 
    }, [ ]); 
     
    const getSearch = () => {
        const { userData } = props;
        const searchText = searchInput.current.value;
        if (searchText.trim()) {
            let dataArray = [];
            if (userData && userData.length > 0) {
                dataArray = userData.filter(x => {           
                    return x.name.includes(searchText);
                });
            }
            setSerachResult(dataArray);
            setSearch(true);
        } else {           
            setSerachResult([]);
            setSearch(false)
        }        
    }
    const { isPending, isError,  userData } = props;     
    let data = isSearch ? serachResult : userData;       
        
        return (      
            <div className="mainWrapper">
                <Nav title="User Page" />
                <div className="midWrapper">
                <div className="searchDiv">
                        <input type="text" name="search" ref={searchInput} placeholder="Search by name..." />
                        <button name="search" className="btn_submit"  onClick={getSearch} >Search</button>
                        
                </div>
                    <div className="tableBox">
                        <table width="100%" cellPadding="0" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>UserName</th>
                                </tr>                                
                            </thead>
                            <tbody>
                                {
                                    !isPending && data.length && !isError ? ( 
                                        data && data.map((user,i) => {                    
                                            return (
                                            <tr key={i}>
                                                <td>{user.name}</td>
                                                <td>{user.username}</td>                                            
                                            </tr>
                                            );
                                        })  
                                    ): 
                                    isError || isSearch ? (
                                        <tr><td colSpan="2">No Record Found!</td></tr>
                                    ) : (
                                        <tr><td colSpan="2" align="center"><img src={MyLoaderImage} alt="Loading...." /></td></tr>
                                    )
                                }
                            </tbody>
                        </table>        

                    </div>
                </div>
            </div>
        )
       
    }

const mapStateToProps = state => {
    const { User } = state;     
    return {        
        isPending: User.isPending,
        isError: User.isError,  
        errorMessage: User.error.message,
        userData: User.data
    };
};
  
  const mapDispatchToProps = dispatch => {
    return {        
        getUserData: bindActionCreators(getUserData, dispatch)       
    };
  };
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(User);