import React from "react";
import { Text, View } from "react-native";
import styles from "../style/styles";
import Actions from "../components/actions";

class Search extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textBlack}>Search</Text>
      </View>
    );
  }
}

export default Search;
