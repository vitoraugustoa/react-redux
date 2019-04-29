import React, { Component } from 'react';


export default class ComponenteClasse extends Component {
  

// Class Component precisa ter a função 'render'
  render() {
    return ( 
        <h1>{this.props.valor || 'Estou com valor padrão'}</h1>
    );
  }
}
