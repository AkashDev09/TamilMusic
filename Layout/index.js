import React from 'react'
import Header from './Header'
import ButtomTab from './ButtomTab'
import { StyleSheet, View } from 'react-native'

function Index(props) {
    return (
        <View>
            <Header />
            <View style={styles.Main_con} >{props.children}</View>
            <ButtomTab />
        </View>


    )
}
const styles = StyleSheet.create({
    Main_con: {
        borderColor: "#000",
        width: "100%",
        height: 670,
        borderWidth: 1,
        backgroundColor:"#2f2f2f"
    }
})

export default Index