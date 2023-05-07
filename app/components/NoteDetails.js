import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import RoundIconBtn from "../components/RoundIconBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNotes } from "../context/NoteProvider";
import NoteInputModal from "./NoteInputModal";

const formatDate = (ms) => {
  const date = new Date(ms);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hrs = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
};

const NoteDetails = (props) => {
  const [note, setNote] = useState(props.route.params.note)
  const { setNotes } = useNotes();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleDelete = async () => {
    const result = await AsyncStorage.getItem("notes");
    let mynotes = [];
    if (result !== null) {
      mynotes = JSON.parse(result);
    }
    const newNotes = mynotes.filter((item) => item.id !== note.id);
    setNotes(newNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
    props.navigation.goBack();
  };

  const handleEdit = () => {
    setShowModal(true);
    setIsEdit(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleUpdate = async (title, desc, time) => {
    const result = await AsyncStorage.getItem("notes");
    let mynotes = [];
    if (result !== null) {
      mynotes = JSON.parse(result);
    }
    const newNotes = mynotes.filter((item) => {
      if(item.id === note.id){
        item.title = title
        item.desc = desc
        item.time = time
        item.isUpdated =  true


        setNote(item)
      }
      return item
    });

    setNotes(newNotes)
    await AsyncStorage.setItem("notes", JSON.stringify(newNotes))
  };

  return (
    <>
      <View style={[styles.container, { paddingTop: 60 }]}>
        <Text style={styles.time}>{note.isUpdated ? `Updated At ${formatDate(note.time)}` :`Created At ${formatDate(note.time)}`}</Text>
        <Text numberOfLines={2} style={styles.title}>{note.title}</Text>
        <Text style={styles.desc}>{note.desc}</Text>
      </View>
      <View style={styles.btnContainer}>
        <RoundIconBtn
          antIconName="delete"
          style={{ backgroundColor: "#ff0000", marginBottom: 15 }}
          onPress={handleDelete}
        />
        <RoundIconBtn
          antIconName="edit"
          style={{ backgroundColor: "#dbb2ff" }}
          onPress={handleEdit}
        />
      </View>
      <NoteInputModal
        onClose={handleClose}
        onSubmit={handleUpdate}
        visible={showModal}
        isEdit={isEdit}
        note={note}
      />
    </>
  );
};

export default NoteDetails;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    position: "relative",
  },
  title: {
    fontSize: 30,
    color: "#dbb2ff",
    fontWeight: "bold",
  },
  desc: {
    fontSize: 20,
    opacity: 0.6,
  },
  time: {
    textAlign: "right",
    fontSize: 12,
    opacity: 0.5,
    marginBottom: 15,
  },
  btnContainer: {
    position: "absolute",
    right: 15,
    bottom: 50,
  },
});
