import '../common/template/dependencies'; 
import React, { Component } from 'react'; 
import axios from 'axios'; 
import { connect } from 'react-redux'; 
import App from './app'; 
import Auth from '../auth/auth'; 

class AuthOrApp extends Component {
    render() {         
        const { user, validToken } = this.props.auth;
        console.log(user + " token: " + validToken);
        if(user && validToken) {             
            axios.defaults.headers.common['Authorization'] = user.token ; // Para todas as requisições, será enviado o token no header.       
            return (<App>{this.props.children}</App>);         
        } 
        else {            
            return (<Auth />);         
        }
    } 
}

const mapStateToProps = state => ({ 
    auth: state.auth 
}); 

     
     export default connect(mapStateToProps, null)(AuthOrApp)
