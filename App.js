import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import { Provider } from "react-redux";
import { createStore } from "redux";

import Home from "./screens/home";
import Search from "./screens/search";
import Likes from "./screens/likes";
import Settings from "./screens/settings";
import Play from "./screens/play";

// redux to keep locale
// # to random region locale
// store locale in Storage
// magnifier opens text input
// get gl/name from API for locale

const initState = {
  locale: "",
  isSearchOpen: false,
  localeName: ""
};

function reducer(prevState = initState, action) {
  switch (action.type) {
    case "getLocale":
      // console.log("action ", action.payload.name);
      return Object.assign({}, prevState, {
        locale: action.payload.item,
        localeName: action.payload.name
      });
    case "isSearchOpen":
      return Object.assign({}, prevState, {
        isSearchOpen: !prevState.isSearchOpen
      });

    default:
      return prevState;
  }
}

const store = createStore(reducer);

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
    Settings: {
      screen: Settings
    }
  },
  {
    initialRouteName: "Home"
  }
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}

export default App;
