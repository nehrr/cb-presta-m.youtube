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
  countries: [],
  search: "",
  isSearch: false,
  favourites: []
};

function reducer(prevState = initState, action) {
  switch (action.type) {
    case "getLocale":
      return Object.assign({}, prevState, {
        locale: action.payload.item,
        localeName: action.payload.name
      });
    case "isSearchOpen":
      return Object.assign({}, prevState, {
        isSearchOpen: !prevState.isSearchOpen
      });

    case "randomLocale":
      return Object.assign({}, prevState, {
        locale: action.payload.locale.gl,
        localeName: action.payload.locale.name,
        isSearch: false
      });
    case "newSearch":
      return Object.assign({}, prevState, {
        search: action.payload.search,
        isSearch: true
      });
    case "addToFavourites":
      console.log(action.payload.newFavs);
      return Object.assign({}, prevState, {
        favourites: action.payload.newFavs
      });
    case "removeFromFavourites":
      return Object.assign({}, prevState, {
        favourites: action.payload.array
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
    search: "",
    isSearch: false,
    favourites: [],
    store: store
  };

  async componentWillMount() {
    const { AVAILABLE_REGIONS, CURRENT_REGION, FAVOURITES } = CONFIG.STORAGE;
    const locale = await AsyncStorage.getItem(CURRENT_REGION);
    const countries = await AsyncStorage.getItem(AVAILABLE_REGIONS);
    const liked = await AsyncStorage.getItem(FAVOURITES);

    if (locale) {
      let myLocale = JSON.parse(locale);

      let favourites;
      if (JSON.parse(liked)) {
        favourites = JSON.parse(liked);
      } else {
        favourites = [];
      }

      const smth = {
        locale: myLocale.gl,
        countries: JSON.parse(countries),
        isSearchOpen: false,
        localeName: myLocale.name,
        search: "",
        isSearch: false,
        favourites: favourites
      };

      this.setState({ store: createStore(reducer, smth) });
    } else {
      this.setState({ store: store });
    }
    this.setState({ isLoading: false });
  }

  render() {
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
