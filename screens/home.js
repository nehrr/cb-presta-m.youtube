import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Button
} from "react-native";
import { StackNavigator } from "react-navigation";
import Actions from "../components/actions";
import styles from "../style/styles";
import { CONFIG } from "../constants/index";

class Home extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <Text style={styles.textHeader}>Youplicate</Text>,
    headerStyle: {
      backgroundColor: "#C20712"
    },
    headerRight: <Actions navigation={navigation} />
  });

  state = {
    obj: []
  };

  componentDidMount() {
    const { BASE_URL, API_KEY } = CONFIG.YOUTUBE;
    const query =
      "&part=snippet,id&order=rating&maxResults=20&chart=mostPopular";
    let url = `${BASE_URL}/search?${query}&key=${API_KEY}&regionCode=FR`;

    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        let temp = [];
        responseJson.items.forEach(item => {
          temp.push(item);
        });

        this.setState({
          obj: temp
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const list = this.state.obj.map((item, idx) => {
      return (
        <View key={idx} style={styles.cell}>
          <TouchableOpacity onPress={() => console.log("move to video view")}>
            <Image
              source={{ uri: item.snippet.thumbnails.high.url }}
              style={styles.preview}
            />
            {/* Limit nb of characters */}
            <Text style={styles.textScroll}> {item.snippet.title} </Text>
          </TouchableOpacity>
        </View>
      );
    });

    // if (this.state.obj.length > 0) {
    return (
      <View style={styles.container}>
        <ScrollView>{list}</ScrollView>
      </View>
    );
    // }
  }
}

export default Home;
