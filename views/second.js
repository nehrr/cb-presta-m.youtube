import React from "react";
import { Text, View } from "react-native";
import styles from "../style/styles";

class Second extends React.Component {
  static navigationOptions = {
    title: "Youplicate",
    headerStyle: {
      backgroundColor: "#C20712"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textBlack}>View 2</Text>
      </View>
    );
  }
}

export default Second;
