import React from 'react';

export default props => (
    <input 
        {...props.input} // propriedades do redux-form 
        className="form-control" 
        placeholder={props.placeholder} 
        readOnly={props.readOnly}
        type={props.type} 
        />
);
