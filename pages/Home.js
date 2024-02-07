import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, NativeModules } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign"
import Fav from "react-native-vector-icons/MaterialIcons"
import Pla from "react-native-vector-icons/SimpleLineIcons"
import Re from "react-native-vector-icons/MaterialCommunityIcons"
import { useDispatch } from 'react-redux';
import { SongsLists } from '../Store/action';



const Home = ({ navigation }) => {
    const dispatch = useDispatch();

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

    const _getAllAudios = async () => {
        const data = NativeModules.MyFileAccess.getAllAudio((list) => {
            const fList = String(`1__${list}__1`).split(', ');
            fList[0] = fList[0].replace('1__[', '');
            fList[(fList.length - 1)] = fList[(fList.length - 1)].replace(']__1', '');

            Createlist(fList)

        });
    }

    function Createlist(SongsList) {
        let Ayy = []
        for (let index = 0; index < SongsList.length; index++) {
            let ob = {}
            const element = SongsList[index];
            let frist = String(element).split("/")
            let sen = frist[frist.length - 1].split(".")[0]
            ob["name"] = sen;
            ob["streamURL"] = element;
            ob["imageURL"] = ""
            ob["Id"] = index + 1
            ob["scrollId"] = index
            ob["desc"] = "Unkown Artist"
            Ayy.push(ob)
        }
        dispatch(SongsLists(Ayy));
        return Ayy
    }
    React.useEffect(() => {
        _getAllAudios()
    }, [])

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
                        {x.Icon}
                        <Text style={styles.collections_text}>{x.text}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    Home_con: {
        flex: 1,
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
    header_tittel: {
        fontSize: 20,
        fontWeight: "400",
        color: "tomato"
    },
    collections_home: {
        flex: 1,
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
        color: "#fff",
        fontWeight: "500"
    }
})

export default Home;