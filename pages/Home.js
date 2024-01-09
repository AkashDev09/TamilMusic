import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Home = () => {
    return (
        <View style={styles.Home_con}>
            <Text>haiiii</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    Home_con: {
        borderColor: "#000",
        width: "100%",
        height:20,
        borderWidth: 1,
        backgroundColor:"#fff"
    }
})

export default Home;