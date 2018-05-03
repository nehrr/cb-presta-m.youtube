import React from "react";
import { Text, View } from "react-native";
import styles from "../style/styles";
import Actions from "../components/actions";

class Likes extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#C20712"
    },
    headerRight: <Actions navigation={navigation} />
  });

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textBlack}>Likes</Text>
      </View>
    );
  }
}

export default Likes;
