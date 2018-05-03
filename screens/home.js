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
import { connect } from "react-redux";
import Actions from "../components/actions";
import SearchBar from "../components/search";
import TextLimit from "../components/text_limit";
import styles from "../style/styles";
import stringLimit from "../mlib/string";
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
    obj: [],
    isSearchOpen: false,
    locale: "",
    localeName: ""
  };

  //still buggy
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.locale == prevState.locale) {
      return null;
    } else {
      // console.log("change");
      return { obj: [] };
    }
  }

  componentDidMount() {
    this.fetchVideos();
  }

  componentDidUpdate(nextProps, prevState) {
    if (nextProps.locale != prevState.locale) {
      this.fetchVideos();
    } else {
      // console.log("error");
    }
  }

  fetchVideos = () => {
    const { BASE_URL, API_KEY } = CONFIG.YOUTUBE;
    const locale = this.props.locale ? this.props.locale : "FR";
    // console.log(locale);
    const query = "&part=snippet&order=rating&maxResults=20&chart=mostPopular";
    let url = `${BASE_URL}/search?${query}&key=${API_KEY}&regionCode=${locale}`;

    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        let temp = [];
        responseJson.items.forEach(item => {
          temp.push(item);
        });

        this.setState({
          obj: temp,
          locale: locale
        });
      })
      .catch(error => {
        // console.error(error);
      });
  };

  render() {
    console.log("home ", this.props.localeName);
    const list = this.state.obj.map((item, idx) => {
      return (
        <View key={idx} style={styles.cell}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Play", {
                url: item.id.videoId,
                title: item.snippet.title
              });
            }}
          >
            <TouchableOpacity style={styles.videoTitle}>
              {TextLimit({
                str: item.snippet.title,
                limit: 42,
                endsWith: "...",
                style: styles.textScroll
              })}
            </TouchableOpacity>
            <Image
              source={{ uri: item.snippet.thumbnails.high.url }}
              style={styles.preview}
            />
          </TouchableOpacity>
        </View>
      );
    });

    return (
      <View style={styles.container}>
        {this.props.isSearchOpen == true && <SearchBar />}
        <TouchableOpacity style={styles.trending}>
          <Text style={styles.textBlack}>
            Trending in{" "}
            {this.props.localeName ? this.props.localeName : "France"}
          </Text>
        </TouchableOpacity>
        <ScrollView>{list}</ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    locale: state.locale,
    isSearchOpen: state.isSearchOpen,
    localeName: state.localeName
  };
};

export default connect(mapStateToProps)(Home);
