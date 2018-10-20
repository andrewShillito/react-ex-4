import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Header extends Component {
  render() {
  	return (
	  <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">ReactND - Coding Practice</h1>
      </header>
	);
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">      
        <Header />
        <Game />       
      </div>
    );
  }
}

class Game extends Component {
  constructor(props) {
    super(props)
    
    const value1 = Math.floor(Math.random() * 100);
    const value2 = Math.floor(Math.random() * 100);
    const value3 = Math.floor(Math.random() * 100);
    const proposedAnswer = Math.floor(Math.random() * 3) + value1 + value2 + value3;
    const numQuestions = 0;
    const numCorrect = 0;
    
    this.state = {
      value1,
      value2,
      value3,
      proposedAnswer,
      numQuestions,
      numCorrect,
    }
    
    this.buttonClickHandler = this.buttonClickHandler.bind(this);
    this.incrementNumQuestions = this.incrementNumQuestions.bind(this);
    this.incrementNumCorrect = this.incrementNumCorrect.bind(this);
  }
  
  buttonClickHandler = function(selectedAnswer) {    
    this.incrementNumQuestions();
    let temp = this.state.value1+this.state.value2+this.state.value3;
    let truth = temp===this.state.proposedAnswer;
    if(truth===selectedAnswer) {
      this.incrementNumCorrect();
    }
    this.getNewEquation();
  }
  
  incrementNumQuestions = function() {this.setState((prevState) => ({numQuestions: prevState.numQuestions+1}))}
  incrementNumCorrect = function() {this.setState((prevState) => ({numCorrect: prevState.numCorrect+1}))}
  
  getNewEquation = () => {
    let val1 = Math.floor(Math.random() * 100);
    let val2 = Math.floor(Math.random() * 100);
    let val3 = Math.floor(Math.random() * 100);
    let newProposed = Math.floor(Math.random() * 3) + val1 + val2 + val3;
    console.log(val1, val2, val3);
    console.log(newProposed);
    console.log(val1+val2+val3);
    this.setState(() => ({
      value1: val1,
      value2: val2,
      value3: val3,
      proposedAnswer: newProposed,
    }))
  }
  render() {
    return ( 
      <div className="game">
        <GameTitle />
        <Equation 
          value1={this.state.value1}
          value2={this.state.value2}
          value3={this.state.value3}
          proposedAnswer={this.state.proposedAnswer}
          />
        <TrueButton 
          clickHandler={this.buttonClickHandler}
          />
        <FalseButton 
          clickHandler={this.buttonClickHandler}
          />
        <Score 
          numQuestions={this.state.numQuestions}
          numCorrect={this.state.numCorrect}
          />
      </div>
    );
  }
}

class GameTitle extends Component {
  render() {
    return (
      <h2>Mental Math</h2>
    );
  }
}

class Equation extends Component {
  render() {
    return (
      <div className="equation">
        <p className="text">{`${this.props.value1} + ${this.props.value2} + ${this.props.value3} = ${this.props.proposedAnswer}`}</p>
      </div>
    );
  }
}

class TrueButton extends Component {
  render() {
    return (
      <button onClick={() => this.props.clickHandler(true)}>True</button>
    );
  }
}

class FalseButton extends Component {
  render() {
    return (
       <button onClick={() => this.props.clickHandler(false)}>False</button>
    );
  }
}

class Score extends Component {
  render() {
    return (
      <p className="text">
        Your Score: {this.props.numCorrect}/{this.props.numQuestions}
      </p>
    );
  }
}

export default App;
