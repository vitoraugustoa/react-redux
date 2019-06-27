
import React, { Component } from 'react'; 
import { reduxForm, Field } from 'redux-form'; 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './auth.css' 
import { login, singup } from './redux/authActions'; 
import Row from '../common/layout/row'; 
import Grid from '../common/layout/grid'; 
import Messages from '../common/msg/message';
import InputAuth from '../common/form/inputAuth';


class Auth extends Component {     
    constructor(props) {         
        super(props)         
        
        this.state = {
            loginMode: true
        }     
    }

    changeMode() {         
        this.setState({ loginMode: !this.state.loginMode })     
    }

    onSubmit(values) {    
        this.state.loginMode ? this.props.login(values) : this.props.singup(values);
    }

    render() {         
        const { loginMode } = this.state;         
        const { handleSubmit } = this.props;         
    
        return (
            <div className="login-box">     
                <div className="login-logo"><b> My</b> Money</div>     
                <div className="login-box-body">         
                    <p className="login-box-msg">Bem vindo!</p>         
                    <form onSubmit={handleSubmit(v => this.onSubmit(v))}>             
                        <Field component={InputAuth} type="input" name="name" placeholder="Nome" icon='user' hide={loginMode} />             
                        <Field component={InputAuth} type="email" name="email" placeholder="E-mail" icon='envelope'/>             
                        <Field component={InputAuth} type="password" name="password" placeholder="Senha" icon='lock' />             
                        <Row>                 
                            <Grid cols="4">                     
                                <button type="submit" className="btn btn-primary btn-block btn-flat"> {loginMode ? 'Entrar' : 'Registrar'} </button>                 
                            </Grid>             
                        </Row>         
                    </form>         
                    <br />         
                    <a onClick={() => this.changeMode()}> {loginMode ? 'Novo usuário? Registrar aqui!' : 'Já é cadastrado? Entrar aqui!'} </a>     
                </div>    
                    <Messages /> 
            </div>
        )     
    } 
}

Auth = reduxForm({form: 'authForm'})(Auth); 

const mapDispatchToProps = dispatch => bindActionCreators({ 
    login, singup 
}, dispatch); 

export default connect(null, mapDispatchToProps)(Auth);

