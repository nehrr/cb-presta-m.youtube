import React from "react";
import { StyleSheet, Dimensions, Platform } from "react-native";

//UI
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    ...Platform.select({
      ios: {
        backgroundColor: "#FFFFFF"
      },
      android: {
        backgroundColor: "#21252B"
      }
    })
  },

  actions: {
    flex: 1,
    flexDirection: "row"
  },

  actionsImage: {
    height: 35,
    width: 35
  },

  textScroll: {
    color: "#000",
    textAlign: "center"
  },

  cell: {
    borderWidth: 1,
    borderColor: "#828289",
    width: width,
    padding: 20
  },

  image: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 52
  }
});

export default styles;
