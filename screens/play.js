import React from "react";
import { WebView, View } from "react-native";
import styles from "../style/styles";

class Play extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title.slice(0, 20),
    headerStyle: {
      backgroundColor: "#C20712"
    }
  });

  state = {
    isSearchOpen: false
  };

  render() {
    const BASE_URL = "https://www.youtube.com/watch?v=";

    return (
      <WebView
        source={{
          uri: `${BASE_URL}${this.props.navigation.state.params.url}`
        }}
      />
    );
  }
}

export default Play;
