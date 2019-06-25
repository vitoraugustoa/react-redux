import '../common/template/dependencies'; 
import React, { Component } from 'react'; 
import axios from 'axios'; 
import { connect } from 'react-redux'; 
import { bindActionCreators } from 'redux';
import App from './app'; 
import Auth from '../auth/auth'; 
import { validateToken } from '../auth/redux/authActions';

class AuthOrApp extends Component {
    render() {         
        const { user, validToken } = this.props.auth;
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
const mapDispatchToProps = dispatch => bindActionCreators({
     validateToken 
}, dispatch); 
     
     export default connect(mapStateToProps, mapDispatchToProps)(AuthOrApp)
