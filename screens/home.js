import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  AsyncStorage,
  RefreshControl
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
    favourites: [],
    nextPage: "",
    prevPage: "",
    refreshing: false
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log("getderived");
    // console.log("nextProps: ", nextProps);
    // console.log("prevState: ", prevState);
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
    // console.log("prevProps: ", prevProps);
    // console.log("prevState: ", prevState);
    // console.log("thisstate: ", this.state);
    if (this.state.locale !== prevProps.locale) {
      this.fetchVideos();
    }
    if (this.state.search !== prevState.search) {
      this.fetchVideosSearch();
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
          // console.log("storage");
          AsyncStorage.setItem(AVAILABLE_REGIONS, JSON.stringify(temp));
        } catch (error) {
          console.log(error);
        }
        this.props.dispatch({ type: "getCountries", payload: { temp } });
        this.setState({
          countries: temp
        });
      })

      .catch(error => {
        console.error(error);
      });

    this.fetchVideos();
  }

  fetchVideos = () => {
    const {
      BASE_URL,
      API_KEY,
      DEFAULT_REGION,
      DEFAULT_NB_RESULT
    } = CONFIG.YOUTUBE;
    const locale = this.props.locale ? this.props.locale : DEFAULT_REGION;
    // console.log("fetchVideos");
    const query = `&part=snippet&order=rating&maxResults=${DEFAULT_NB_RESULT}&chart=mostPopular`;
    let url = `${BASE_URL}/search?${query}&key=${API_KEY}&regionCode=${locale}`;

    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        let temp = [];
        let nextPage = responseJson.nextPageToken;

        responseJson.items.forEach(item => {
          let id = item.id;
          let snippet = item.snippet;
          temp.push({ id, snippet });
        });

        this.setState({
          obj: temp,
          locale: locale,
          nextPage: nextPage
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  fetchVideosSearch = () => {
    const { BASE_URL, API_KEY, DEFAULT_NB_RESULT } = CONFIG.YOUTUBE;
    const search = this.props.search;
    // console.log("fetchVideosSearch");
    const query = `&part=snippet&maxResults=${DEFAULT_NB_RESULT}&chart=mostPopular`;
    let url = `${BASE_URL}/search?${query}&key=${API_KEY}&q=${search}`;

    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        let temp = [];
        let nextPage = responseJson.nextPageToken;

        responseJson.items.forEach(item => {
          let id = item.id;
          let snippet = item.snippet;
          temp.push({ id, snippet });
        });

        this.setState({
          obj: temp,
          nextPage: nextPage
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  fetchMoreVideos = scroll => {
    const {
      BASE_URL,
      API_KEY,
      DEFAULT_REGION,
      DEFAULT_NB_RESULT
    } = CONFIG.YOUTUBE;
    const locale = this.props.locale ? this.props.locale : DEFAULT_REGION;
    let pageToken;
    scroll == "down"
      ? (pageToken = this.state.nextPage)
      : (pageToken = this.state.prevPage);
    // console.log("fetchMoreVideos");
    const query = `&part=snippet&order=rating&maxResults=${DEFAULT_NB_RESULT}&chart=mostPopular`;
    let url = `${BASE_URL}/search?${query}&key=${API_KEY}&regionCode=${locale}&pageToken=${pageToken}`;
    // console.log(url);

    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        // let temp = [this.state.obj];
        let temp = [];
        let nextPage = responseJson.nextPageToken;
        let prevPage;
        responseJson.prevPageToken == undefined
          ? (prevPage = "")
          : (prevPage = responseJson.prevPageToken);
        // console.log(responseJson);

        responseJson.items.forEach(item => {
          let id = item.id;
          let snippet = item.snippet;
          temp.push({ id, snippet });
        });

        this.setState({
          obj: temp,
          locale: locale,
          nextPage: nextPage,
          prevPage: prevPage
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  fetchMoreSearchVideos = scroll => {
    const { BASE_URL, API_KEY, DEFAULT_NB_RESULT } = CONFIG.YOUTUBE;
    const search = this.props.search;
    scroll == "down"
      ? (pageToken = this.state.nextPage)
      : (pageToken = this.state.prevPage);
    const query = `&part=snippet&maxResults=${DEFAULT_NB_RESULT}&chart=mostPopular`;
    let url = `${BASE_URL}/search?${query}&key=${API_KEY}&q=${search}&pageToken=${pageToken}`;

    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        let temp = [];
        let nextPage = responseJson.nextPageToken;
        let prevPage;
        responseJson.prevPageToken == undefined
          ? (prevPage = "")
          : (prevPage = responseJson.prevPageToken);

        responseJson.items.forEach(item => {
          let id = item.id;
          let snippet = item.snippet;
          temp.push({ id, snippet });
        });

        this.setState({
          obj: temp,
          nextPage: nextPage,
          prevPage: prevPage
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  refresh = scroll => {
    if (this.props.isSearch) {
      if (this.state.prevPage !== "") {
        // console.log("is search");
        this.fetchMoreSearchVideos(scroll);
        this.refs._scrollView.scrollTo({ y: 5, animated: true });
      } else {
        this.fetchVideosSearch();
      }
    } else {
      // console.log("is not search");
      if (this.state.prevPage !== "") {
        this.fetchMoreVideos(scroll);
        this.refs._scrollView.scrollTo({ y: 5, animated: true });
      } else {
        this.fetchVideos();
      }
    }
  };

  addToFavourites = item => {
    let newItem = item;
    const { FAVOURITES } = CONFIG.STORAGE;
    try {
      const newFavs = [...this.props.favourites, newItem];
      this.props.dispatch({
        type: "addToFavourites",
        payload: { newFavs }
      });
      // console.log("storage");
      AsyncStorage.setItem(FAVOURITES, JSON.stringify(newFavs));
    } catch (error) {
      console.log(error);
    }
  };

  removeFromFavourites = item => {
    const { FAVOURITES } = CONFIG.STORAGE;
    try {
      let temp = [...this.props.favourites];
      // console.log("old array");
      // console.log(temp);
      // console.log("-------------------");
      let newTemp = temp.filter(function(el) {
        return el.id.videoId !== item.id.videoId;
      });
      // console.log("new array");
      // console.log(newTemp);
      AsyncStorage.setItem(FAVOURITES, JSON.stringify(newTemp)).then(() => {
        this.props.dispatch({
          type: "removeFromFavourites",
          payload: { array: newTemp }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const isCloseToBottom = ({
      layoutMeasurement,
      contentOffset,
      contentSize
    }) => {
      const paddingToBottom = 20;
      return (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
      );
    };

    // console.log("rerender");
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
              {" "}
              <TouchableOpacity
                onPress={() => {
                  // AsyncStorage.removeItem(FAVOURITES);
                  if (_.some(this.props.favourites, item)) {
                    // console.log("in");
                    this.removeFromFavourites(item);
                  } else if (!_.some(this.props.favourites, item)) {
                    // console.log("not in");
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
        <ScrollView
          ref="_scrollView"
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              if (this.props.isSearch) {
                // console.log("is search");
                this.fetchMoreSearchVideos("down");
                this.refs._scrollView.scrollTo({ y: 5, animated: true });
              } else {
                // console.log("is not search");
                this.fetchMoreVideos("down");
                this.refs._scrollView.scrollTo({ y: 5, animated: true });
              }
            }
          }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.refresh("up");
              }}
            />
          }
        >
          {list}
        </ScrollView>
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
