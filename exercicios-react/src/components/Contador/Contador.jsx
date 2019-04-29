import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { inc, dec, stepChanged } from './Redux/ContadorActions';


class Contador extends Component {
    
    render() {
    return (
        <div>
            <div>Número: {this.props.number}</div>
            <input type="text" onChange={this.props.stepChanged}/>
            <button onClick={this.props.inc}> Inc (+) </button>
            <button onClick={this.props.dec}> Dec (-)</button>
        </div>
    );
  }
}

function mapStateToProps(state){
    return {
        number: state.contador.number,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ inc, dec, stepChanged }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Contador);




//Problema do This

// Solução 01 - Bind
// constructor(props) { 
//     super(props);
//     this.maisUm = this.maisUm.bind(this);
// }

// Solução 02 - Função Arrow no onClick
{/* <button id="teste" onClick={() => this.maisUm()}> Inc (+) </button> */}

// Solução 03 - Função Arrow
// maisUm = () => {
//     console.log(this);
// }