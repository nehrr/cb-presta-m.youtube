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
    fontSize: 26,
    marginTop: 52
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

  preview: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    width: width - 40,
    height: 200
  }
});

export default styles;
