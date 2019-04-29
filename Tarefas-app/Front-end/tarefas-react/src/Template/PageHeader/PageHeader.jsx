import React from 'react';

export default props => {

    return (
        <header className="d-flex m-5">
            <h2>{props.name} <small>{props.small}</small></h2>
        </header>        
    );
}