import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import _ from "lodash";
import styles from "../style/styles";
import Actions from "../components/actions";
import { CONFIG } from "../constants/index";

class Likes extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Favourites",
    headerStyle: {
      backgroundColor: "#C20712"
    }
  });

  state = { favourites: [] };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.favourites !== prevState.favourites) {
      return {
        favourites: nextProps.favourites
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.favourites !== prevProps.favourites) {
      this.render();
    }
  }

  addToFavourites = item => {
    let id = item.id.videoId;
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

  componentWillMount() {
    const { FAVOURITES } = CONFIG.STORAGE;
    // console.log("will mount");
    try {
      AsyncStorage.getItem(FAVOURITES).then(res => {
        if (res) {
          const temp = JSON.parse(res);
          this.setState({
            favourites: temp
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const list = this.state.favourites.map((item, idx) => {
      return (
        <View key={idx} style={styles.cell}>
          <TouchableOpacity>
            <TouchableOpacity style={styles.videoTitle}>
              {" "}
              <TouchableOpacity
                onPress={() => {
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
        <TouchableOpacity style={styles.trending}>
          <Text style={styles.textBlack}>Favourites</Text>
        </TouchableOpacity>
        {list.length > 0 ? <ScrollView>{list}</ScrollView> : null}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    favourites: state.favourites
  };
};

export default connect(mapStateToProps)(Likes);
