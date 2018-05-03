import React from "react";
import { Text, View } from "react-native";
import styles from "../style/styles";
import Actions from "../components/actions";
import { CONFIG } from "../constants/index";

class Profile extends React.Component {
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

  state = {
    locale: []
  };

  componentDidMount() {
    const { BASE_URL, API_KEY } = CONFIG.YOUTUBE;
    const query = "part=snippet&hl=en_GB";
    let url = `${BASE_URL}/i18nRegions?${query}&key=${API_KEY}`;

    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);

        this.setState({
          locale: responseJson
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textBlack}>Profile</Text>
      </View>
    );
  }
}

export default Profile;
