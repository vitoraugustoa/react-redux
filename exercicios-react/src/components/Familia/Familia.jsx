import React from 'react';
import { filhosComProps } from '../../Utils/utils'; 

export default props =>
    <div>
        <h1>Familia {props.sobrenome}</h1>
    
       {filhosComProps(props)}
       
       {/* {React.Children.map(props.children, child => {
           return React.cloneElement(child, {...props});
       })} Metodo mais utilizado  */}

       {/* {React.cloneElement(props.children, { ...props })} Metodo recomendado, porem só funciona para um elemento */}
       {/* {React.cloneElement(props.children, props )}  Metodo não recomendado*/}
        {/* <li>{React.cloneElement(props.children, {sobrenome: props.sobrenome})}</li>  Metodo passando uma propriedade*/}
          
    </div>