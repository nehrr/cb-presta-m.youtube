import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import Home from "./screens/home";
import Search from "./screens/search";
import Likes from "./screens/likes";
import Profile from "./screens/profile";
import Play from "./screens/play";

// redux to keep locale
// # to random region locale
// store locale in Storage
// magnifier opens text input
// get gl/name from API for locale

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
