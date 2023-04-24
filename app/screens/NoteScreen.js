import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Dimensions
} from "react-native";
import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import RoundIconBtn from "../components/RoundIconBtn";
import NoteInputModal from "../components/NoteInputModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoteCard from "../components/NoteCard";

const NoteScreen = ({ user }) => {
  const [greet, setGreet] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [notes, setNotes] = useState([]);
  console.log(notes);

  useEffect(() => {
    getNotes();
    // AsyncStorage.clear()
    greetTime();
  }, []);

  const greetTime = () => {
    const hours = new Date().getHours();
    if (hours === 0 || hours < 12) return setGreet("Morning");
    if (hours === 1 || hours < 17) return setGreet("Afternoon");
    setGreet("Evening");
  };

  const getNotes = async () => {
    const result = await AsyncStorage.getItem("notes");
    // console.log(result)
    if (result !== null) setNotes(JSON.parse(result));
  };

  const handleOnSubmit = async (title, desc) => {
    const note = {
      id: Date.now(),
      title, //use same name for both key and value
      desc,
      time: Date.now(),
    };

    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>

      {notes.length > 0 && <SearchBar containerStyle={{}} />}

      <FlatList
        data={notes}
        numColumns={2}
        columnWrapperStyle={{justifyContent: "space-between"}}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <NoteCard item={item} />
          </View>
        )}
      />

      {!notes.length > 0 && (
        <View
          style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}
        >
          <Text style={styles.emptyHeader}>Add Notes</Text>
        </View>
      )}

      <RoundIconBtn
        onPress={() => setModalVisible(true)}
        antIconName="plus"
        style={styles.addBtn}
      />

      <NoteInputModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleOnSubmit}
      />
    </View>
  );
};

export default NoteScreen;



const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 10,
    flex: 1,
  },
  header: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 40,
  },
  emptyHeader: {
    fontSize: 20,
    textTransform: "uppercase",
    opacity: 0.4,
    fontWeight: 600,
  },
  emptyHeaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },
  addBtn: {
    position: "absolute",
    right: 20,
    bottom: 50,
  },
});
