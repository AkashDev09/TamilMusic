import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign"
import Fav from "react-native-vector-icons/MaterialIcons"
import Pla from "react-native-vector-icons/SimpleLineIcons"
import Re from "react-native-vector-icons/MaterialCommunityIcons"


const Home = () => {
    const myIcon = <Icon name="search1" size={20} color="tomato" />;

    const collection_Data = [
        {
            text: "Favorites",
            Icon: <Fav name="favorite" size={30} color="#fff" />,
            BG_color: "#ff5d5b"
        },
        {
            text: "Playlist ",
            Icon: <Pla name="playlist" size={30} color="#fff" />,
            BG_color: "#9d48fe"
        },
        {
            text: "Recent",
            Icon: <Re name="clock-time-four" size={30} color="#fff" />,
            BG_color: "#f8ac34"
        }
    ]

    return (
        <View style={styles.Home_con}>
            <View style={styles.header}>
                <Text style={styles.header_tittel}>My Music</Text>
                {myIcon}
            </View>
            <ScrollView>
                <View style={styles.collections_home} >
                    {collection_Data.map((x, i) => (
                        <View key={i} style={{ ...styles.collections, backgroundColor: x.BG_color }}>
                            {x.Icon}
                            <Text style={styles.collections_text}>{x.text}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    Home_con: {
        width: "100%",
        height: "auto",
        backgroundColor: "#fff"
    },
    header: {
        borderBottomWidth:1,
        borderBottomColor: "#313131",
        height: 50,
        backgroundColor: "#000",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5
    },
    header_tittel: {
        fontSize: 15,
        fontWeight: "350",
        color: "tomato"
    },
    collections_home: {
        height: 680,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#000",
        overflow: "scroll"
    },
    collections: {
        width: 110,
        height: 110,
        borderRadius: 20,
        backgroundColor: "#ff5d5b",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 5
    },
    collections_text: {
        fontSize: 15,
        fontWeight: "500",
        color: "#fff"
    }
})

export default Home;