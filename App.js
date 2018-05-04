import React, { Component } from "react";
import { AsyncStorage, Text } from "react-native";
import { StackNavigator } from "react-navigation";
import { Provider } from "react-redux";
import { createStore } from "redux";

import Home from "./screens/home";
import Search from "./screens/search";
import Likes from "./screens/likes";
import Settings from "./screens/settings";
import Play from "./screens/play";
import { CONFIG } from "./constants/index";

// redux to keep locale
// # to random region locale
// store locale in Storage
// magnifier opens text input
// get gl/name from API for locale

const initState = {
  locale: "FR",
  isSearchOpen: false,
  localeName: "",
  countries: []
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

    case "randomLocale":
      console.log(prevState);
      const random = [Math.floor(Math.random() * prevState.countries.length)];
      const randomLocale = prevState.countries[random];
      return Object.assign({}, prevState, {
        locale: randomLocale.gl,
        localeName: randomLocale.name
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
  state = {
    isLoading: true,
    locale: "",
    countries: [],
    store: store
  };

  async componentWillMount() {
    const { AVAILABLE_REGIONS, CURRENT_REGION } = CONFIG.STORAGE;
    // console.log("will mount");
    const locale = await AsyncStorage.getItem(CURRENT_REGION);
    const countries = await AsyncStorage.getItem(AVAILABLE_REGIONS);

    if (locale) {
      let myLocale = JSON.parse(locale);
      const smth = {
        locale: myLocale.gl,
        countries: JSON.parse(countries),
        isSearchOpen: false,
        localeName: myLocale.name
      };
      this.setState({ store: createStore(reducer, smth) });
    } else {
      this.setState({ store: store });
    }
    this.setState({ isLoading: false });
  }

  render() {
    // console.log(store);
    if (this.state.isLoading) {
      return <Text>Loading Parameters</Text>;
    } else {
      return (
        <Provider store={this.state.store}>
          <RootStack />
        </Provider>
      );
    }
  }
}

export default App;
