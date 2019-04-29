import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './Todo.css';

import Grid from '../../Template/Grid/Grid';
import IconButton from '../../Template/iconButton/iconButton';
import { add, changeDescription, search, clear } from './redux/TodoActions';

class TodoForm extends Component {
    constructor(props){
        super(props);

        this.keyHandler = this.keyHandler.bind(this);
    }

    componentWillMount() {
        this.props.search();
    }

    keyHandler = (e) => {
        const { add, search, description, clear } = this.props; // Extrair add, search, description de props

        if (e.key === 'Enter') { // a tecla Enter foi apertada?
            e.shiftKey ? search() : add(description); // O shift está apertado junto com o Enter?
        }else if (e.key === 'Escape'){ // A tecla Esc foi apertada?
            clear();
        }
    }

    render() {
        const { add, search, description, clear } = this.props;
        return(
            <div role="form" className="todoForm row">
            <Grid cols='12 9 10'>
                <input 
                id="description" 
                className="form-control"
                placeholder="Adicione uma tarefa" 
                onChange={this.props.changeDescription} 
                onKeyUp={this.keyHandler}
                value={this.props.description}
                >
                </input>
            </Grid>

            <Grid cols='12 3 2'>
             <IconButton estilo="primary" icon='plus' onClick={() => add(description)}></IconButton>
             <IconButton estilo="info" icon='search' onClick={search}></IconButton>
             <IconButton estilo="default" icon='close' onClick={() => clear()}></IconButton>
            </Grid>
        </div>
        )   
    }
}


const mapStateToProps = state => ({
    description: state.todo.description
});

const mapDispatchToProps = dispatch => bindActionCreators({ add, changeDescription, search, clear }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);