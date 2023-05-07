import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import Colors from "../misc/Colors";
import RoundIconBtn from "./RoundIconBtn";

const NoteInputModal = ({ visible, onClose, onSubmit, note, isEdit }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (isEdit) {
      setTitle(note.title);
      setDesc(note.desc);
    }
  }, [isEdit]);

  const handleModalClose = () => {
    Keyboard.dismiss(); // to dismiss keyboard on input
  };

  const handleSubmit = () => {
    if (!title.trim() && !desc.trim()) return onClose();

    if (isEdit) {
      onSubmit(title, desc, Date.now())
    } else {
      onSubmit(title, desc);
      setTitle("");
      setDesc("");
    }
    onClose();
  };

  const closeModal = () => {
    if (!isEdit) {
      setTitle("");
      setDesc("");
    }

    onClose();
  };

  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <TextInput
          placeholder="Title"
          placeholderTextColor={Colors.PRIMARY}
          style={[styles.input, styles.title]}
          value={title}
          // name="title"
          onChangeText={(value) => setTitle(value)}
        />
        <TextInput
          multiline
          placeholder="Note"
          placeholderTextColor={Colors.PRIMARY}
          style={[styles.input, styles.desc]}
          value={desc}
          // name="desc"
          onChangeText={(value) => setDesc(value)}
        />
      </View>

      <View style={styles.submitBtns}>
        <RoundIconBtn
          antIconName="check"
          size={15}
          style={styles.style}
          onPress={handleSubmit}
        />
        {title.trim() || desc.trim() ? (
          <RoundIconBtn
            antIconName="close"
            size={15}
            style={styles.style}
            onPress={closeModal}
          />
        ) : null}
      </View>

      <TouchableWithoutFeedback onPress={handleModalClose}>
        <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
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
  modalBG: {
    flex: 1,
    zIndex: -1,
  },
  submitBtns: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  style: {
    backgroundColor: "#023047",
  },
});
