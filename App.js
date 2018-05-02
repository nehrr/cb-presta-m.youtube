import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import Home from "./views/home";
import Second from "./views/second";

const MainStack = StackNavigator({
  Home: {
    screen: Home
  },
  Second: {
    screen: Second
  }
});

class App extends Component {
  render() {
    return <MainStack />;
  }
}

export default App;
