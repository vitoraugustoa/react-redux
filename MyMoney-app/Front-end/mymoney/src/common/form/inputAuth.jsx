import React from 'react'; 
import If from '../operador/if';

export default props => (    
    <div className={`form-group has-feedback ${!props.hide ? '' : 'd-none'}`}>
        <input {...props.input} className='form-control' placeholder={props.placeholder} readOnly={props.readOnly}  type={props.type} /> 
        <span className={`glyphicon glyphicon-${props.icon}  form-control-feedback`}></span>  
    </div>       
)