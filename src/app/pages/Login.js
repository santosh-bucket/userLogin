import React  from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { login } from '../actions/login';
import Nav from "../components/Nav";

class Login extends React.Component {
    constructor(props){
        super(props);    
        this.state = {            
            message : ""
        } 
           
    }
    componentDidMount(){
        const {isLoggedIn} = this.props;
        if(isLoggedIn) {            
            this.props.history.push(`/`);
        }                 
    }
    componentDidUpdate(){
        const {isLoggedIn} = this.props;
        if(isLoggedIn) {            
            this.props.history.push(`/`);
        }                 
    }
    getSubmit = () => { 
        const email = this.email.value.trim();
        const username = this.username.value.trim();
        const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        let emailValidate = true;
        let passwordValidate = true;
        let message = "";
        if(email === "") {
            emailValidate = false;
            message = "Email is required field !"
        }
        else if(!email.match(mailformat)) {
            console.log("EMail--->");
            emailValidate = false;
            message = "Invalid email id !"
        }
        else if(username === "") {
            passwordValidate = false;
            message = "Password is required field !"
        }

        if(emailValidate && passwordValidate) {
            const requestObj = {
                email,
                username
            }
            this.setState({message : ""});
            this.props.login(requestObj);
        }else {
            this.setState({message});
        }
       
    }   
    render(){
        const {  isError,  isLoggedIn, isPending } = this.props;
        let errorMsg = "";
        if(this.state.message) {
            errorMsg = this.state.message;
        } else if(isError) {
            errorMsg = "Invalid email or password!";
        }
        return (      
            <div className="mainWrapper">
                <Nav title="Login Page" />             
                    <div className="midWrapper">
                       <div className="formBox clearfix">
                            <div className="row error">{errorMsg}</div>
                            <div className="row">
                                <div className="span_1"><label>Email</label></div>
                                <div className="span_2"><input type="email" placeholder="Email" ref={el => (this.email = el)} /></div>
                            </div>
                            <div className="row">
                                <div className="span_1"><label>Password</label></div>
                                <div className="span_2"><input type="password" placeholder="Password" ref={el => (this.username = el)} /></div>
                            </div>
                            <div className="row">
                                <div className="span_1">&nbsp;</div>
                                <div className="span_2"><button className="btn_submit" onClick={this.getSubmit}>Submit</button></div>
                            </div>                    
                       </div>                    
                </div>
            </div>
        )
        
       
    }
}
const mapStateToProps = state => {
    const { Login } = state;     
    return { 
        isError: Login.isError,
        isPending: Login.isPending,
        isLoggedIn: Login.isLoggedIn
    };
};
  
  const mapDispatchToProps = dispatch => {
    return {        
        login: bindActionCreators(login, dispatch)       
    };
  };
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login);