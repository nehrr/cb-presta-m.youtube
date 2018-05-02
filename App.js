import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import Home from "./views/home";
import Search from "./views/search";
import Likes from "./views/likes";
import Profile from "./views/profile";
import Play from "./views/play";

const RootStack = StackNavigator(
  {
    Home: {
      screen: Home
    },
    Search: {
      screen: Search
    },
    Likes: {
      screen: Likes
    },
    Play: {
      screen: Play
    },
    Profile: {
      screen: Profile
    }
  },
  {
    initialRouteName: "Home"
  }
);

class App extends Component {
  render() {
    return <RootStack />;
  }
}

export default App;
