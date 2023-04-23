import { StyleSheet, Text, View, Modal, TextInput } from "react-native";
import React from "react";
import Colors from "../misc/Colors";
import { TouchableWithoutFeedback } from "react-native-web";

const NoteInputModal = ({ visible }) => {

  const handleModalClose = ()=>{

  }



  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <TextInput
          placeholder="Title"
          placeholderTextColor={Colors.PRIMARY}
          style={[styles.input, styles.title]}
        />
        <TextInput
          multiline
          placeholder="Note"
          placeholderTextColor={Colors.PRIMARY}
          style={[styles.input, styles.desc]}
        />
      </View>
      <TouchableWithoutFeedback onPress={handleModalClose}>
        <View style={[styles.modalBG, StyleSheet.absoluteFillObject]}  />
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default NoteInputModal;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    paddingHorizontal: 20,
    gap: 20,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.PRIMARY,
    outlineStyle: "none",
    fontSize: 15,
    color: Colors.DARK,
  },
  title: {
    height: 40,
  },
  desc: {
    height: 100,
  },
  modalBG:{
    // backgroundColor: "red",
    flex: 1,
    zIndex: -1
  }
});
