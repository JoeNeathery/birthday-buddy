import React from 'react';
import './App.scss';
import { Login, Register, Home } from "./components/Index";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLogginActive: true,
      isLoggedIn: false
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(loggedIn, authToken) {
    this.setState({isLoggedIn: loggedIn, token: authToken});
  }

  componentDidMount() {
    //Add .right by default
    this.rightSide.classList.add("right");
  }

  changeState() {
    //ES6 Object Destructuring
    const { isLogginActive } = this.state;
  
    //We togglet component classes depending on the current active state 
    if (isLogginActive) {
      //Right side for login
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    } else {
      //Left side for Register 
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
    }
    //Of course we need to toggel the isLogginActive by inversing it's previous state 
    this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
  }

  render() {
    const isLogginActive = this.state.isLogginActive;
    const isLoggedIn = this.state.isLoggedIn;
    const current = isLogginActive ? "Register" : "Login";
    const currentActive = isLogginActive ? "login" : "register";
    let display;

    if(!isLoggedIn){
      display = 
        <div className="login">
          <div className="container" ref={ref => (this.container = ref)}>
            {isLogginActive && (
              <Login containerRef={ref => (this.current = ref)} parentMethod={this.handleLogin} />
            )}
            {!isLogginActive && (
              <Register containerRef={ref => (this.current = ref)} />
            )}
          </div>
          <RightSide
            current={current}
            currentActive={currentActive}
            containerRef={ref => (this.rightSide = ref)}
            onClick={this.changeState.bind(this)}
          />
        </div>;
    }else{
      display = 
        <div className="home">
          <Home />
        </div>;
    }

    return (
      <div className="App">
        {display}
      </div>
    );
  } 
}

const RightSide = props => {
  return (
    <div
      className="right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
}; 

export default App;


