import React from "react";
import { Text, View, Picker, AsyncStorage } from "react-native";
import styles from "../style/styles";
import Actions from "../components/actions";
import { CONFIG } from "../constants/index";

class Settings extends React.Component {
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

  componentWillMount() {
    console.log("will mount");
    try {
      AsyncStorage.getItem("@Storage:locale").then(res => {
        if (res) {
          const temp = JSON.parse(res);
          this.setState({
            locale: temp
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    const { BASE_URL, API_KEY } = CONFIG.YOUTUBE;
    const query = "part=snippet&hl=en_GB";
    let url = `${BASE_URL}/i18nRegions?${query}&key=${API_KEY}`;

    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        let temp = [];
        for (let item of responseJson.items) {
          temp.push(item);
        }
        this.setState({
          locale: temp
        });

        try {
          console.log("storage");
          AsyncStorage.setItem("@Storage:locale", JSON.stringify(temp));
        } catch (error) {
          console.log(error);
        }
      })

      .catch(error => {
        console.error(error);
      });
  }

  render() {
    let list = this.state.locale.map((item, idx) => {
      return (
        <Picker.Item
          key={idx}
          label={item.snippet.name}
          value={item.snippet.gl}
        />
      );
    });

    return (
      <View style={styles.container}>
        <Text style={styles.textBlack}>Please pick a region</Text>
        <Picker
          selectedValue={this.state.locale}
          style={styles.picker}
          onValueChange={item => {
            console.log(item);
          }}
        >
          {list}
        </Picker>
      </View>
    );
  }
}

export default Settings;
