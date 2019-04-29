import React  from 'react';
import {  Switch, Route, Redirect } from 'react-router-dom';

import Todo from './pages/Todo/Todo';
import About from './pages/About/About';

export default props => {
        return (
                <Switch>      
                    <Route path="/todos" component={Todo} />
                    <Route path="/about" component={About} />
                    <Redirect from="*" to="/todos"/>
                </Switch>
        );
}