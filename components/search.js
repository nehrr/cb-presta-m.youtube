import React from "react";
import { View, TouchableOpacity, Image, TextInput } from "react-native";
import { connect } from "react-redux";
import styles from "../style/styles";

class SearchBar extends React.Component {
  render() {
    return (
      <View>
        <TextInput
          style={styles.searchBar}
          onChangeText={text => {
            this.setState({ search: text });
            // console.log(this.state);
          }}
          onSubmitEditing={() =>
            this.props.dispatch({
              type: "newSearch",
              payload: {
                search: this.state.search
              }
            })
          }
          placeholder="Type your search here..."
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    search: state.search
  };
};

export default connect(mapStateToProps)(SearchBar);
