import React, { Component } from 'react';
import axios from 'axios';
import Main from '../../templates/main/main';

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir'
}

const initialState = {
    user: {
        name: '',
        email: ''
    },
    list: []
}

const baseUrl = "https://localhost:5001/api/Autentication";

export default class UserCrud extends Component {
    constructor(props){
        super(props);

        this.state = {
           ...initialState 
        }

        this.clear = this.clear.bind(this);
        this.save = this.save.bind(this);
        this.updateField = this.updateField.bind(this);
        this.load = this.load.bind(this);
        this.remove = this.remove.bind(this);
        this.renderTable = this.renderTable.bind(this);
        this.renderRows = this.renderRows.bind(this);
    }

    componentWillMount() {
        axios.get(`${baseUrl}/GetAll`)
            .then(resp => {
                this.setState({ list: resp.data });
            })
    }

    clear() {
        this.setState({ user: initialState.user })
    }

    save() {
        const user = this.state.user;
        console.log(user.id);
        const method = user.id ? 'put' : 'post';
        const url = user.id ? `${baseUrl}/UpdateUser` : `${baseUrl}/CreateUser`;
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdateList(resp.data);
                this.setState({ user:initialState.user, list });
            })
            .catch(e => {
                console.log(e);
            });
    }

    getUpdateList(user, add = true){
        const list = this.state.list.filter(u => u.id !== user.id);
        if(add) list.unshift(user);
        
        return list;
    }

    updateField(event){
        console.log(event.target.name);
        const user = { ...this.state.user };
        user[event.target.name] = event.target.value;
        this.setState({ user });
    }

    load(user) {
        this.setState({ user });
    }

    remove(user) {
        axios.delete(`${baseUrl}/DeleteUser/${user.id}`)
            .then(resp => {
                console.log(resp.data);
                const list = this.getUpdateList(user, false);
                this.setState({ list });
            })
            .catch(e => {
                console.log(e);
            })
    }

    renderTable(){
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        );
    }

    renderRows(){
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning" onClick={() => this.load(user)} >
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2" onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="name" 
                                value={this.state.user.name} 
                                onInput={this.updateField} 
                                placeholder="Digite o nome..."/> 
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="email" 
                                value={this.state.user.email} 
                                onInput={this.updateField} 
                                placeholder="Digite o e-mail..."/> 
                        </div>
                    </div>
                </div>

                <hr/>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={this.save}>Salvar</button>
                        <button className="btn btn-secondary ml-2" onClick={this.clear}>Cancelar</button>
                    </div>
                </div>
            </div>
        );
    }

    render (){
        console.log(this.state.list);
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        );
    }
}