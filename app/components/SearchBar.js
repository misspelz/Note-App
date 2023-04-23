import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import Colors from '../misc/Colors'

const SearchBar = ({containerStyle}) => {
  return (
    <View style={[styles.container, {...containerStyle}]}>
      <TextInput style={styles.searchbar} placeholder='Search Here...' />
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    searchbar: {
        borderWidth: 0.5,
        borderColor: Colors.PRIMARY,
        height: 40,
        borderRadius: 40,
        paddingLeft: 15,
        fontSize: 15,
        color: Colors.PRIMARY,
        outlineStyle: "none"
    }
})