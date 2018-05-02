import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Button
} from "react-native";
import Actions from "../components/actions";
import styles from "../style/styles";
import { StackNavigator } from "react-navigation";

class Home extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <Text style={styles.textHeader}>Youplicate</Text>,
    headerStyle: {
      backgroundColor: "#C20712"
    },
    headerRight: <Actions navigation={navigation} />
  });

  state = {
    obj: [
      {
        name: "video 1"
      },
      {
        name: "video 2"
      },
      {
        name: "video 3"
      }
    ]
  };

  render() {
    const list = this.state.obj.map((item, idx) => {
      return (
        <View key={idx} style={styles.cell}>
          <TouchableOpacity onPress={() => console.log("move to video view")}>
            <Image style={styles.image} />
            <Text style={styles.textScroll}> {item.name} </Text>
          </TouchableOpacity>
        </View>
      );
    });

    if (this.state.obj.length > 0) {
      return (
        <View style={styles.container}>
          <ScrollView>{list}</ScrollView>
        </View>
      );
    }
  }
}

export default Home;
