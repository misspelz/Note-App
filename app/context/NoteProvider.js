// import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const NoteContext = createContext()

const NoteProvider = ({children}) => {
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    const result = await AsyncStorage.getItem("notes");
    if (result !== null) setNotes(JSON.parse(result));
  };


  const store ={
    notes,
    setNotes,
    getNotes
  }


  return (
    <NoteContext.Provider value={store}>
         {children}
    </NoteContext.Provider>
  )
}
export default NoteProvider

export const useNotes =()=> useContext(NoteContext)
