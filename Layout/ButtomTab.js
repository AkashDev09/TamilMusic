import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

function ButtomTab() {
    return (
        <View style={style.TabContainer}>
            <View style={style.TabIcon} ></View>
            <View style={style.TabIcon}></View>
            <View style={style.TabIcon}></View>
            <View style={style.TabIcon}></View>
        </View>
    )
}
const style = StyleSheet.create({
    TabContainer: {
        width: "auto",
        height: 60,
        borderWidth: 1,
        borderColor: "#000",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor:"#080808"
    },
    TabIcon: {
        borderWidth: 1,
        borderColor: "#000",
        width: 40,
        height: 40,
        borderRadius: 100,
        backgroundColor: "#fff"
    }

})
export default ButtomTab