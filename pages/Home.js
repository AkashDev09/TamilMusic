import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Home = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.Home_con}>
            <TouchableOpacity onPress={()=> navigation.navigate("Player") }>
                <Text >Home</Text>
            </TouchableOpacity>
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