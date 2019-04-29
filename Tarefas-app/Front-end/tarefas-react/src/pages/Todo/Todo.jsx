import React from 'react';

import PageHeader from '../../Template/PageHeader/PageHeader';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

export default props =>  {

        return (
            <div className="container">
                <PageHeader name="Tarefas" small="Cadastro"/>
                <TodoForm />
                <TodoList />
            </div>
        );
}