import React from "react";
import { Text, View } from "react-native";
import styles from "../style/styles";
import Actions from "../components/actions";

class Play extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <Text
        style={styles.textHeader}
        onPress={() => navigation.navigate("Home")}
      >
        Youplicate
      </Text>
    ),
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

export default Play;