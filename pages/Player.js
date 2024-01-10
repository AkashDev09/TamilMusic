import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

function Player() {

    return (
        <View style={styles.Player_con}>
                <Text>Player</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    Player_con: {
        borderColor: "#000",
        width: "100%",
        height: 20,
        // borderWidth: 1,
        backgroundColor: "#fff"
    }
})

export default Player