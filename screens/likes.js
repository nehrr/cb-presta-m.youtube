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

  componentWillMount() {
    const { FAVOURITES } = CONFIG.STORAGE;
    console.log("will mount");
    try {
      AsyncStorage.getItem(FAVOURITES).then(res => {
        console.log("res:", JSON.parse(res));
        if (res) {
          console.log("storage");
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
    console.log("state:", this.state.favourites);
    const list = this.state.favourites.map((item, idx) => {
      console.log(item);
      return (
        <View key={idx} style={styles.cell}>
          <TouchableOpacity>
            <TouchableOpacity style={styles.videoTitle}>
              {" "}
              {/* <TouchableOpacity
                onPress={() => {
                  // AsyncStorage add
                  if (_.some(this.props.favourite, item)) {
                    this.removeFromFavourites(idx);
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
              </TouchableOpacity> */}
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
