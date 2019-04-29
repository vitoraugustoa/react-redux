import React, { Component } from 'react';

import './Calculator.css';

import Button from '../components/Button/Button';
import Display from '../components/Display/Display';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0 , 0],
  current: 0,
}

export default class Calculator extends Component {
    state = {...initialState};

  constructor(props) {
    super(props);
    this.clearMemory = this.clearMemory.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.addDigit = this.addDigit.bind(this);
  }

  clearMemory() {
    this.setState({ ...initialState });
  }

  setOperation(operation) {
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true})
    }
    else{
      const equals = operation == "=";
      const currentOperation = this.state.operation;

      const values = [...this.state.values];

      try{
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
      }catch(e){
        values[0] = this.state.values[0];
      }
    
      values[1] = 0;
      this.setState({ 
        displayValue: values[0], 
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values
      });
    }
  }

  addDigit(n){
    if (n === '.' && this.state.displayValue.includes('.')){
      return
    }

    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;
    const currentValue = clearDisplay ? '' : this.state.displayValue;
    const displayValue = currentValue + n;
    this.setState({ displayValue, clearDisplay: false});

    if (n !== '.') {
       const i = this.state.current;
       const newValue = parseFloat(displayValue);
       const values = [...this.state.values];
       values[i] = newValue;
       this.setState({ values });
       console.log(values);
    }
  }
  
  render() {
    return (
        <div className="calculator">
          <Display value={this.state.displayValue}/>
            <Button click={this.clearMemory} triple label="AC"></Button>
            <Button click={this.setOperation} operation label="/"></Button>
            <Button click={this.addDigit} label="7"></Button>
            <Button click={this.addDigit} label="8"></Button>
            <Button click={this.addDigit} label="9"></Button>
            <Button click={this.setOperation} operation label="*"></Button>
            <Button click={this.addDigit} label="4"></Button>
            <Button click={this.addDigit} label="5"></Button>
            <Button click={this.addDigit} label="6"></Button>
            <Button click={this.setOperation} operation label="-"></Button>
            <Button click={this.addDigit} label="1"></Button>
            <Button click={this.addDigit} label="2"></Button>
            <Button click={this.addDigit} label="3"></Button>
            <Button click={this.setOperation} operation label="+"></Button>
            <Button click={this.addDigit} double label="0"></Button>
            <Button click={this.addDigit} label="."></Button>
            <Button click={this.setOperation} operation label="="></Button>
        </div>
    );
  }
}
