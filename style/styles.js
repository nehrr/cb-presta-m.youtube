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

  picker: {
    margin: 52
  },

  actions: {
    flex: 1,
    flexDirection: "row"
  },

  actionsImage: {
    height: 25,
    width: 25
  },

  actionsMargin: {
    marginRight: 6
  },

  textHeader: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 26,
    marginLeft: 16
  },

  textBlack: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 26
  },

  textScroll: {
    color: "#fff",
    textAlign: "center",
    marginTop: 10
  },

  cell: {
    width: width - 20,
    marginLeft: 10,
    marginRight: 10
  },

  preview: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    width: width - 20,
    height: 200
  },

  searchBar: {
    height: 40,
    borderColor: "#C20712",
    borderWidth: 2
  },

  videoTitle: {
    height: 40,
    backgroundColor: "#000",
    flexDirection: "row"
  },

  trending: {
    height: 50,
    padding: 8
  },

  likes: {
    height: 20,
    width: 20,
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10
  }
});

export default styles;
