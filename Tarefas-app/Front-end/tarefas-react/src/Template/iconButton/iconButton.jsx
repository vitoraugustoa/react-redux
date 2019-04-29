import React from 'react';

export default props => {
   
    return(
        <button className={'btn btn-'+ props.estilo} onClick={props.onClick}>
                <i className={'fa fa-'+ props.icon}></i>
            </button>
    )
}