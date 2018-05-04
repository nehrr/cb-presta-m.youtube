import React from "react";
import { WebView } from "react-native";
import styles from "../style/styles";
import stringLimit from "../mlib/string";

class Play extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: stringLimit(navigation.state.params.title),
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
