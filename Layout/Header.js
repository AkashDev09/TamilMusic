import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

function Header() {
    return (
        <View style={styles.Header_con}>
        </View>
    )
}
const styles = StyleSheet.create({
    Header_con: {
        borderColor: "#000",
        width: "100%",
        height: 50,
        borderWidth: 1,
        backgroundColor:"#080808"
    }
})

export default Header