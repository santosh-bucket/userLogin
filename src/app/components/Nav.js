import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logout } from '../actions/login';
import { withRouter } from "react-router-dom";
class Nav extends React.Component {    
    changeRoute = (link) => {  
        if(link == "logout") {         
          this.props.logout();  
        } else {
          this.props.history.push(link);
        }   
        
    }
    render() {         
        const pathname = this.props.location.pathname; 
        const {isLoggedIn, title} = this.props;
          return (    
               <React.Fragment>           
                <div className="nav">                    
                    <ul>
                        <li><button onClick={() => this.changeRoute("/")} className={`btnclass ${pathname === "/" ? "active" : ""}`} >Home</button></li>
                        <li><button onClick={() => this.changeRoute("/user")} className={`btnclass ${pathname === "/user" ? "active" : ""}`} >User</button></li>
                        <li><button onClick={() => this.changeRoute("/blog")} className={`btnclass ${pathname === "/blog" ? "active" : ""}`} >Blog</button></li>
                        {
                            isLoggedIn ? (
                                <li className="last"><button className="btnclass" onClick={() => this.changeRoute("logout")} >Logout</button></li>
                            ) : (
                                <li className="last"><button className="btnclass" onClick={() => this.changeRoute("/login")} >Login</button></li>
                            )
                        }                        
                    </ul>                    
                </div>
                <div className="logoWrap">
                  <h1>{title}</h1>
                </div>
                </React.Fragment> 
            );
    }
}
const mapStateToProps = state => {
    const { Login } = state;     
    return {        
        isLoggedIn: Login.isLoggedIn
    };
};
const mapDispatchToProps = dispatch => {
    return {        
        logout: bindActionCreators(logout, dispatch)       
    };
  };
export default connect(
    mapStateToProps,
    mapDispatchToProps  
  )(withRouter(Nav));