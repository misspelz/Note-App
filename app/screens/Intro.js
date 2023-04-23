import { StyleSheet, Text, View, TextInput, Dimensions } from "react-native";
import React, { useState } from "react";
import Colors from "../misc/Colors";
import RoundIconBtn from "../components/RoundIconBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";

const width = Dimensions.get("window").width - 50;
console.log(width);

const Intro = ({onFinish}) => {
  const [name, setName] = useState("");
  //   console.log(user);  => working fine
  const handleSubmit = async ()=>{
    const user = { name: name }
    await AsyncStorage.setItem("user", JSON.stringify(user))
    if (onFinish) onFinish()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.inputTitle}>Enter your Name to continue</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
        placeholderTextColor={Colors.PRIMARY}
        style={styles.textInput}
      />
      {name.length >= 3 && <RoundIconBtn antIconName="arrowright" onPress={handleSubmit} />}
    </View>
  );
};

export default Intro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputTitle: {
    fontWeight: "600",
    marginBottom: 10,
    fontSize: 14,
    alignSelf: "flex-start",
    paddingLeft: 25,
    opacity: 0.7,
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    width,
    height: 50,
    borderRadius: 8,
    paddingLeft: 15,
    fontSize: 18,
    color: Colors.PRIMARY,
    outlineStyle: "none",
    marginBottom: 15,
  },
});
