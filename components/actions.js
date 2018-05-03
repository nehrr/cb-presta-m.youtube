import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { StackNavigator } from "react-navigation";
import { connect } from "react-redux";
import styles from "../style/styles";

class Actions extends React.Component {
  render() {
    return (
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionsMargin}
          onPress={() => this.props.dispatch({ type: "isSearchOpen" })}
          // onPress={() => console.log(this.props)}
        >
          <Image
            style={styles.actionsImage}
            source={require("../assets/search.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionsMargin}
          // onPress={() => this.props.navigation.navigate("Play")}
        >
          <Image
            style={styles.actionsImage}
            source={require("../assets/hash.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionsMargin}
          // onPress={() => this.props.navigation.navigate("Likes")}
        >
          <Image
            style={styles.actionsImage}
            source={require("../assets/liked.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionsMargin}
          onPress={() => this.props.navigation.navigate("Settings")}
        >
          <Image
            style={styles.actionsImage}
            source={require("../assets/user.png")}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    locale: state.locale,
    isSearchOpen: state.isSearchOpen
  };
};

export default connect(mapStateToProps)(Actions);
