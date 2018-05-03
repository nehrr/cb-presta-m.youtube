import React from "react";
import { Text, View, Picker, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import styles from "../style/styles";
import Actions from "../components/actions";
import { CONFIG } from "../constants/index";

class Settings extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Settings",
    headerStyle: {
      backgroundColor: "#C20712"
    }
  });

  state = {
    locale: [],
    isSearchOpen: false,
    countries: []
  };

  componentWillMount() {
    console.log("will mount");
    try {
      AsyncStorage.getItem("@Storage:locale").then(res => {
        if (res) {
          const temp = JSON.parse(res);
          this.setState({
            locale: temp,
            countries: temp
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
          let gl = item.snippet.gl;
          let name = item.snippet.name;
          temp.push({ gl, name });
        }
        this.setState({
          locale: temp,
          countries: temp
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

  getCountryName = code => {
    let res = "";
    this.state.countries.map(item => {
      if (item.gl == code) {
        res = item.name;
      }
    });
    return res;
  };

  render() {
    let list = this.state.locale.map((item, idx) => {
      return <Picker.Item key={idx} label={item.name} value={item.gl} />;
    });

    return (
      <View style={styles.container}>
        <Text style={styles.textBlack}>Please pick a region</Text>
        <Picker
          selectedValue={this.props.locale}
          style={styles.picker}
          onValueChange={item => {
            this.props.dispatch({
              type: "getLocale",
              payload: { item, name: this.getCountryName(item) }
            });
          }}
        >
          {list}
        </Picker>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    locale: state.locale
  };
};

export default connect(mapStateToProps)(Settings);
