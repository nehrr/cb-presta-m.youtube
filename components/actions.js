import React from "react";
import { View, TouchableOpacity, Image, AsyncStorage } from "react-native";
import { StackNavigator } from "react-navigation";
import { connect } from "react-redux";
import styles from "../style/styles";
import { CONFIG } from "../constants/index";

class Actions extends React.Component {
  render() {
    const { AVAILABLE_REGIONS, CURRENT_REGION } = CONFIG.STORAGE;
    return (
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionsMargin}
          onPress={() => this.props.dispatch({ type: "isSearchOpen" })}
        >
          <Image
            style={styles.actionsImage}
            source={require("../assets/search.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionsMargin}
          onPress={async () => {
            if (this.props.countries.length != 0) {
              const random = [
                Math.floor(Math.random() * this.props.countries.length)
              ];
              try {
                await AsyncStorage.setItem(
                  CURRENT_REGION,
                  JSON.stringify(this.props.countries[random])
                );
                this.props.dispatch({
                  type: "randomLocale",
                  payload: { locale: this.props.countries[random] }
                });
              } catch (error) {
                console.log(error);
              }
            } else {
              alert("Please load the settings first!");
            }
          }}
        >
          <Image
            style={styles.actionsImage}
            source={require("../assets/hash.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionsMargin}
          onPress={() => this.props.navigation.navigate("Likes")}
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
    isSearchOpen: state.isSearchOpen,
    countries: state.countries
  };
};

export default connect(mapStateToProps)(Actions);
