import { StyleSheet} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../misc/Colors";

const RoundIconBtn = ({ antIconName, size, color, style, onPress }) => {
  return (
    <AntDesign
      name={antIconName}
      size={size || 24}
      color={color || Colors.LIGHT}
      style={[styles.icon, { ...style }]}
      onPress={onPress}
    />
  );
};

export default RoundIconBtn;

const styles = StyleSheet.create({
    icon: {
        backgroundColor: Colors.PRIMARY,
        padding: 15,
        borderRadius: 50,
        // elevation: 5
    }
});
