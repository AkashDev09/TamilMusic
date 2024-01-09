import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

function Player() {
    const navigation = useNavigation();

    return (
        <View style={styles.Player_con}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Text>Player</Text>
            </TouchableOpacity>

        </View>
    )
}
const styles = StyleSheet.create({
    Player_con: {
        borderColor: "#000",
        width: "100%",
        height: 20,
        borderWidth: 1,
        backgroundColor: "#fff"
    }
})

export default Player