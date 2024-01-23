import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from "react-native-vector-icons/Entypo"
import { useSelector } from 'react-redux';

function Player({ navigation }) {
    const { selectItem } = useSelector((state) => state.reducer);
    const myIcon = <Icon name="chevron-thin-left" size={20} color="tomato" />;

    console.log(selectItem, "keddi")
    return (
        <View style={styles.Player_con}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate(Object.values(selectItem).length === 0 ? "Home" : selectItem?.RouterN)}>
                    {myIcon}
                </TouchableOpacity>
                <Text></Text>
            </View>
            <View style={styles.search_body}>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    Player_con: {
        width: "100%",
        height: "auto",
        backgroundColor: "#fff"
    },
    header: {
        borderBottomWidth: 1,
        borderBottomColor: "#313131",
        height: 50,
        backgroundColor: "#000",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10
    },
    search_body: {
        height: 805,
        backgroundColor: "#000",

    },
})

export default Player