import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  AsyncStorage
} from "react-native";
import { StackNavigator } from "react-navigation";
import { connect } from "react-redux";
import Actions from "../components/actions";
import SearchBar from "../components/search";
import TextLimit from "../components/text_limit";
import styles from "../style/styles";
import stringLimit from "../mlib/string";
import _ from "lodash";
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
    search: "",
    isSearch: false,
    favourites: []
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log("getderived");
    // console.log("nextProps: ", nextProps.search);
    // console.log("prevState: ", prevState.search);
    if (nextProps.locale !== prevState.locale) {
      return {
        locale: nextProps.locale,
        obj: []
      };
    }
    if (nextProps.search !== prevState.search) {
      return {
        obj: [],
        search: nextProps.search
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("didupdate");
    // console.log("prevProps: ", prevProps.locale);
    // console.log("prevState: ", prevState.locale);
    if (this.state.locale !== prevProps.locale) {
      this.fetchVideos();
    }
    if (this.state.search !== prevState.search) {
      this.fetchVideosSearch();
    }
  }

  componentDidMount() {
    this.fetchVideos();
  }

  fetchVideos = () => {
    const {
      BASE_URL,
      API_KEY,
      DEFAULT_REGION,
      DEFAULT_NB_RESULT
    } = CONFIG.YOUTUBE;
    // console.log(this.props.locale);
    const locale = this.props.locale ? this.props.locale : DEFAULT_REGION;
    console.log("fetchVideos");
    const query = `&part=snippet&order=rating&maxResults=2&chart=mostPopular`;
    let url = `${BASE_URL}/search?${query}&key=${API_KEY}&regionCode=${locale}`;

    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        let temp = [];
        responseJson.items.forEach(item => {
          let id = item.id;
          let snippet = item.snippet;
          temp.push({ id, snippet });
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
    const { BASE_URL, API_KEY, DEFAULT_NB_RESULT } = CONFIG.YOUTUBE;
    console.log(this.props);
    const search = this.props.search;
    console.log("fetchVideosSearch");
    const query = `&part=snippet&maxResults=2&chart=mostPopular`;
    let url = `${BASE_URL}/search?${query}&key=${API_KEY}&q=${search}`;

    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        let temp = [];
        responseJson.items.forEach(item => {
          let id = item.id;
          let snippet = item.snippet;
          temp.push({ id, snippet });
        });

        this.setState({
          obj: temp
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  addToFavourites = item => {
    console.log(this.props.favourites);
    const { FAVOURITES } = CONFIG.STORAGE;
    try {
      const newFavs = [...this.props.favourites, item];
      this.props.dispatch({
        type: "addToFavourites",
        payload: { newFavs }
      });
      console.log("storage");
      AsyncStorage.setItem(FAVOURITES, JSON.stringify(newFavs));
    } catch (error) {
      console.log(error);
    }
  };

  removeFromFavourites = item => {
    const { FAVOURITES } = CONFIG.STORAGE;
    console.log(this.props.favourites);
    try {
      let temp = [...this.props.favourites];
      temp.splice(item, 1);
      AsyncStorage.setItem(FAVOURITES, JSON.stringify(temp)).then(() => {
        this.props.dispatch({
          type: "removeFromFavourites",
          payload: { array: temp }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    // console.log(this.props.favourites);
    const { FAVOURITES } = CONFIG.STORAGE;
    const list = this.state.obj.map((item, idx) => {
      // console.log(item);
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
              {" "}
              <TouchableOpacity
                onPress={() => {
                  if (_.some(this.state.favourite, item)) {
                    console.log("already exists");
                    this.removeFromFavourites(item);
                  } else {
                    this.addToFavourites(item);
                  }
                }}
              >
                {!_.some(this.props.favourites, item) ? (
                  <Image
                    style={styles.likes}
                    source={require("../assets/videolike.png")}
                  />
                ) : (
                  <Image
                    style={styles.likes}
                    source={require("../assets/videoliked.png")}
                  />
                )}
              </TouchableOpacity>
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
          {this.props.isSearch ? (
            <Text style={styles.textBlack}>
              Trending for {this.props.search ? this.props.search : ""}
            </Text>
          ) : (
            <Text style={styles.textBlack}>
              Trending in{" "}
              {this.props.localeName ? this.props.localeName : "France"}
            </Text>
          )}
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
    search: state.search,
    isSearch: state.isSearch,
    favourites: state.favourites
  };
};

export default connect(mapStateToProps)(Home);
