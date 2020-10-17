import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import User from './pages/User';
import View from './pages/View';
import Login from './pages/Login';
import "../style.scss";
class App extends React.Component {
    render(){        
        return (
            <Router>
                <Route exact path="/" component={Home}/>  
                <Route path="/user" component={User} />
                <Route path="/login" component={Login} />
                <Route exact path="/blog" component={Blog} />               
                <Route path="/blog/:id" component={View} />                          
            </Router>
        );
    }
}
export default App;