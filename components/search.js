import React from "react";
import { View, TouchableOpacity, Image, TextInput } from "react-native";
import styles from "../style/styles";

class SearchBar extends React.Component {
  render() {
    return (
      <View>
        <TextInput
          style={styles.searchBar}
          // onChangeText={(text) => this.setState({text})}
          placeholder="Type your search here..."
        />
      </View>
    );
  }
}

export default SearchBar;
