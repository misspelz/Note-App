import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import RoundIconBtn from '../components/RoundIconBtn'
import NoteInputModal from '../components/NoteInputModal'

const NoteScreen = ({user}) => {
  const [greet, setGreet] = useState("")

  const greetTime = ()=>{
    const hours = new Date().getHours()
    if(hours === 0 || hours < 12) return setGreet("Morning")
    if(hours === 1 || hours < 17) return setGreet("Afternoon")
    setGreet("Evening")
  }

  useEffect(() => {
    greetTime()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>
      <SearchBar containerStyle={{}} />

      <View style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}>
        <Text style={styles.emptyHeader}>Add Notes</Text>
        <RoundIconBtn onPress={()=> alert("Opening Modal")} antIconName="plus" style={styles.addBtn} />
      </View>
      <NoteInputModal visible={true} />
    </View>
  )
}

export default NoteScreen

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        gap: 10,
        flex: 1,
    },
    header: {
        fontSize: 15,
        fontWeight: "600",
        marginTop: 40  
    },
    emptyHeader: {
        fontSize: 20,
        textTransform: "uppercase",
        opacity: 0.4,
        fontWeight: 600
    },
    emptyHeaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        zIndex: -1
    },
    addBtn: {
        position: "absolute",
        right: 20,
        bottom: 50,
        // cursor: "pointer"
    }
})