import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Intro from "./app/screens/Intro";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoteScreen from "./app/screens/NoteScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import NoteDetails from "./app/components/NoteDetails";
import NoteProvider from "./app/context/NoteProvider";

const Stack = createStackNavigator();

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

  const renderNoteScreen = (props) => {
    return <NoteScreen {...props} user={user} />;
  };

  if (!user.name) return <Intro onFinish={findUser} />;
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <NoteProvider>
          <Stack.Navigator
            screenOptions={{
              headerTitle: "",
              headerTransparent: true,
            }}
          >
            <Stack.Screen component={renderNoteScreen} name="NoteScreen" />
            <Stack.Screen component={NoteDetails} name="NoteDetails" />
          </Stack.Navigator>
        </NoteProvider>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
