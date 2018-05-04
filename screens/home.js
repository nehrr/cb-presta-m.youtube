import React from "react";
import { Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
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
    localeName: "",
    search: ""
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("getderived");
    console.log("nextProps: ", nextProps.search);
    console.log("prevState: ", prevState.search);
    if (
      nextProps.locale !== prevState.locale ||
      nextProps.search !== prevState.search
    ) {
      return {
        locale: nextProps.locale,
        obj: [],
        search: nextProps.search
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("didupdate");
    console.log(this.state.search);
    console.log("prevProps: ", prevProps.locale);
    console.log("prevState: ", prevState.locale);
    if (this.state.locale !== prevProps.locale) {
      this.fetchVideos();
    }
    if (this.state.search !== prevProps.search) {
      this.fetchVideosSearch();
    }
  }

  componentDidMount() {
    this.fetchVideos();
  }

  fetchVideos = () => {
    const { BASE_URL, API_KEY } = CONFIG.YOUTUBE;
    console.log(this.props.locale);
    const locale = this.props.locale ? this.props.locale : "FR";
    console.log("fetchVideos");
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
        console.error(error);
      });
  };

  fetchVideosSearch = () => {
    const { BASE_URL, API_KEY } = CONFIG.YOUTUBE;
    console.log(this.props);
    const search = this.props.search;
    console.log("fetchVideosSearch");
    const query = "&part=snippet&maxResults=20&chart=mostPopular";
    let url = `${BASE_URL}/search?${query}&key=${API_KEY}&q=${search}`;

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
  };

  render() {
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
        {this.props.isSearchOpen ? <SearchBar /> : null}
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
    localeName: state.localeName,
    search: state.search
  };
};

export default connect(mapStateToProps)(Home);
