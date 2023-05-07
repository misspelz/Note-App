import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Colors from "../misc/Colors";

const NoteCard = ({ item, onPress }) => {
  const { title, desc } = item;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text numberOfLines={1} style={{ fontWeight: "bold", marginBottom: 10 }}>
        {title}
      </Text>
      <Text numberOfLines={3}>{desc}</Text>
    </TouchableOpacity>
  );
};

export default NoteCard;

const width = Dimensions.get("window").width - 40;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY,
    flexDirection: "",
    width: width / 2 - 10,
    height: 110,
    padding: 8,
    marginTop: 10,
    borderRadius: 10,
  },
});
