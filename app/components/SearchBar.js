import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import Colors from "../misc/Colors";
import { AntDesign } from "@expo/vector-icons";

const SearchBar = ({ containerStyle, value, onChangeText, onClear }) => {
  return (
    <View style={[styles.container, { ...containerStyle }]}>
      <TextInput
        style={styles.searchbar}
        value={value}
        onChangeText={onChangeText}
        placeholder="Search Here..."
        placeholderTextColor={Colors.PRIMARY}
      />
      {value ? (
        <AntDesign
          name="close"
          size={20}
          color={"#dbb2ff"}
          onPress={onClear}
          style={styles.clearIcon}
        />
      ) : null}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchbar: {
    borderWidth: 0.5,
    borderColor: Colors.PRIMARY,
    height: 40,
    borderRadius: 40,
    paddingLeft: 15,
    fontSize: 15,
    color: Colors.DARK,
    outlineStyle: "none",
  },
  container: {
    justifyContent: "center",
  },
  clearIcon: {
    position: "absolute",
    right: 10,
  },
});
