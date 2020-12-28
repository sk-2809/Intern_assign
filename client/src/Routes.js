import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthContext } from './contexts/AuthContext'
import { login } from './actions/auth'
import Register from './components/register';
import Login from './components/login';
import Home from './components/home';
import Post from './components/blog';

const Route = require('react-router-dom').Route;

class Routes extends Component {

    static contextType = AuthContext;

    componentDidMount(){

        const token = localStorage.getItem('token');
        if(token && !this.context.isAuthenticated){
            const data = {token, email : null, password : null}
            login(data, (res) => {
                if(res.data.success){
                    this.context.login(res)
                } else {
                    localStorage.removeItem('token')
                    console.log(res.data.msg)
                }
            })
        }
    }

    render() { 
        return ( 
            <Router>
                <Route exact path="/" component={Home}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/post" component={Post}/>
            </Router>
         );
    }
}
 
export default Routes;