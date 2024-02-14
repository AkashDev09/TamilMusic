import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, NativeModules, Image } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign"
import Fav from "react-native-vector-icons/MaterialIcons"
import Pla from "react-native-vector-icons/SimpleLineIcons"
import Re from "react-native-vector-icons/MaterialCommunityIcons"
import { useDispatch, useSelector } from 'react-redux';
import BottomPlayer from '../components/BottomPlayer';
import { useRoute } from '@react-navigation/native';
import { songCompleteForward } from '../utils/playerFunction';



const Home = ({ navigation }) => {

    const { ThumbnailExtractor } = NativeModules;
    const dispatch = useDispatch();

    const route = useRoute();

    const { selectItem, Songs, interval, isPlaying, duration } = useSelector((state) => state.reducer);

    const [imagebace64, setimagebace64] = useState()
    const myIcon = <Icon name="search1" size={20} color="tomato" />;

    const collection_Data = [
        {
            text: "Favorites",
            Icon: <Fav name="favorite" size={30} color="#fff" />,
            BG_color: "#ff5d5b",
            onPress: () => thunmbnail()
        },
        {
            text: "Playlist ",
            Icon: <Pla name="playlist" size={30} color="#fff" />,
            BG_color: "#9d48fe",
            onPress: ""
        },
        {
            text: "Recent",
            Icon: <Re name="clock-time-four" size={30} color="#fff" />,
            BG_color: "#f8ac34",
            onPress: ""
        }
    ]

    function thunmbnail() {

        // Use the module function to extract thumbnail
        ThumbnailExtractor.extractThumbnail(selectItem?.songs?.streamURL)
            .then(base64Thumbnail => {
                setimagebace64(base64Thumbnail)
            })
            .catch(error => {
                // Handle error
                console.error(error);
            });
    }
    React.useEffect(() => {
        if (interval === -1) {
            songCompleteForward(selectItem, Songs, dispatch)
        }

    }, [interval])
    return (
        <View style={styles.Home_con}>
            <View style={styles.header}>
                <Text style={styles.header_tittel}>My Music</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                    {myIcon}
                </TouchableOpacity>
            </View>
            <View style={styles.collections_home} >
                {collection_Data.map((x, i) => (
                    <View key={i} style={{ ...styles.collections, backgroundColor: x.BG_color }}>
                        <TouchableOpacity onPress={x.onPress}>
                            {x.Icon}
                        </TouchableOpacity>

                        <Text style={styles.collections_text}>{x.text}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.homeBottom}>
                {Object.keys(selectItem).length > 0 && <BottomPlayer DimensionsFilter={route.name} navigation={navigation} />}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    Home_con: {
        flex: 1,
        backgroundColor: "#000",
    },
    header: {
        borderBottomWidth: 1,
        borderBottomColor: "#313131",
        width: Math.floor(Dimensions.get('window').width),
        height: Math.floor(Dimensions.get('window').height * 0.1),
        backgroundColor: "#000",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10
    },
    header_tittel: {
        fontSize: 20,
        fontWeight: "400",
        color: "tomato"
    },
    collections_home: {
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#000",
        overflow: "scroll",
        width: Math.floor(Dimensions.get('window').width),
        height: Math.floor(Dimensions.get('window').height * 0.7),
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
        color: "#fff",
        fontWeight: "500"
    },
    homeBottom: {
        width: Math.floor(Dimensions.get('window').width),
        height: Math.floor(Dimensions.get('window').height * 0.14),
        position: "relative"
    }

})

export default Home;