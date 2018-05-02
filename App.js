import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import Home from "./views/home";

const MainStack = StackNavigator({
  Home: {
    screen: Home
  }
});

class App extends Component {
  render() {
    return <MainStack />;
  }
}

export default App;
