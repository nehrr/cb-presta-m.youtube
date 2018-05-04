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
    locale: "",
    isSearchOpen: false,
    countries: []
  };

  componentWillMount() {
    const { AVAILABLE_REGIONS, CURRENT_REGION } = CONFIG.STORAGE;
    console.log("will mount");
    try {
      AsyncStorage.getItem(AVAILABLE_REGIONS).then(res => {
        console.log(res);
        if (res) {
          const temp = JSON.parse(res);
          this.setState({
            countries: temp
          });
        }
      });
      AsyncStorage.getItem(CURRENT_REGION).then(res => {
        console.log(res);
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
    const { AVAILABLE_REGIONS, CURRENT_REGION } = CONFIG.STORAGE;
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

        try {
          console.log("storage");
          AsyncStorage.setItem(AVAILABLE_REGIONS, JSON.stringify(temp));
        } catch (error) {
          console.log(error);
        }
        this.setState({
          countries: temp
        });
      })

      .catch(error => {
        console.error(error);
      });
  }

  getCountryName = code => {
    const { AVAILABLE_REGIONS, CURRENT_REGION } = CONFIG.STORAGE;
    let res = "";
    this.state.countries.map(item => {
      if (item.gl == code) {
        res = item.name;
        try {
          console.log("storage");
          AsyncStorage.setItem(CURRENT_REGION, JSON.stringify(item));
        } catch (error) {
          console.log(error);
        }
      }
    });
    return res;
  };

  render() {
    let list = this.state.countries.map((item, idx) => {
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
