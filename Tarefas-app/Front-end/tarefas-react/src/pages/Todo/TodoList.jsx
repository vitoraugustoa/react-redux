import React from 'react';
import { connect } from 'react-redux'; 
import { bindActionCreators } from 'redux';

import './Todo.css';

import IconButton from '../../Template/iconButton/iconButton';
import { maskAsDone, maskAsPending, remove } from './redux/TodoActions';

const TodoList = props => {

    const renderRows = () => {
        const list = props.list || [];

        
        return list.map(todo => (
            <tr key={todo.id}>
                <td className={todo.done ? 'markedAsDone' : ''}>{todo.description}</td>
                <td className={todo.done ? 'markedAsDone' : ''}> {todo.createdAt} </td>
                <td>
                    <IconButton estilo={`success ${!todo.done ? '' : 'invisible'}`}   onClick={() => props.maskAsDone(todo)}  icon="check" ></IconButton>
                    <IconButton estilo={`warning ${!todo.done ? 'invisible' : '' }`}  onClick={() => props.maskAsPending(todo)}  icon="undo" ></IconButton>
                    <IconButton estilo={`danger ${!todo.done ? 'invisible' : '' }`}  onClick={() => props.remove(todo)}  icon="trash-o" ></IconButton> 
                </td>
            </tr>
        ));
    };

    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th>Data e Hora criação</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
         </table>
    );
}

const mapStateToProps = state => ({
    list: state.todo.list
});

const mapDispatchToProps = dispatch => bindActionCreators({ maskAsDone, maskAsPending, remove }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);