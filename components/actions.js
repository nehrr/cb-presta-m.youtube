import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import styles from "../style/styles";

class Actions extends React.Component {
  render() {
    return (
      <View style={styles.actions}>
        <TouchableOpacity>
          <Image
            style={styles.actionsImage}
            source={require("../assets/search.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.actionsImage}
            source={require("../assets/play.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.actionsImage}
            source={require("../assets/liked.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.actionsImage}
            source={require("../assets/user.png")}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default Actions;
