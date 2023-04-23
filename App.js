import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Intro from "./app/screens/Intro";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoteScreen from "./app/screens/NoteScreen";

export default function App() {
  const [user, setUser] = useState({});

  const findUser = async () => {
    const result = await AsyncStorage.getItem("user");
    // console.log(result);
    if (result !== null) {
      setUser(JSON.parse(result));
    }
  };

  useEffect(() => {
    findUser();
    // AsyncStorage.clear()
  }, []);


  if (!user.name) return <Intro onFinish={findUser}  />
  return (
    <View style={styles.container}>
      <NoteScreen user={user} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
