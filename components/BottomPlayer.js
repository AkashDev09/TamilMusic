import { useRoute } from '@react-navigation/native'
import React from 'react'
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Icons from "react-native-vector-icons/AntDesign"
import Icon from 'react-native-vector-icons/Feather';
import { playerPlayAndPause } from '../utils/playerFunction'


const BottomPlayer = ({ DimensionsFilter, navigation }) => {

    const dispatch = useDispatch();
    const { selectItem, isPlaying } = useSelector((state) => state.reducer);
    const Array = [
        {
            name: isPlaying === true ? "pausecircle" : "play"
        }
    ]
    return (
        <View style={style.container}>
            <TouchableOpacity style={style.view} onPress={() => navigation.navigate("fullScreenPlayer", { PassValue: DimensionsFilter })}>
                <View style={style.bottomControlIcon}>
                    <View style={style.songsImaNO}>
                        <Icon name={"music"} size={30} color={"#ffff"} />
                    </View>
                </View>
                <View style={style.bottomControlText}>
                    <Text style={{ color: "#939997", fontWeight: 700 }}>{String(selectItem?.songs?.name).length > 32 ? String(selectItem?.songs?.name).substring(0, 32) + "..." : selectItem?.songs?.name}</Text>
                </View>
            </TouchableOpacity>
            <View style={style.bottomControl}>
                {Array.map((x, i) => (
                    <TouchableOpacity key={i} onPress={() => playerPlayAndPause(dispatch)}>
                        <Icons name={x.name} size={36} color={"tomato"} />
                    </TouchableOpacity>
                ))}
            </View>

        </View>
    )
}
const style = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        backgroundColor: "#dee0f7",
        // padding: 2,
        borderRadius: 5,
        width: Math.floor(Dimensions.get('window').width),
        flexDirection: "row",
        justifyContent: "flex-start",
        height: 65
    },
    bottomControlIcon: {
        borderRightWidth: 1,
        borderRightColor: "#939997",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: Math.floor(Dimensions.get('window').width * 0.2)
    },
    bottomControlText: {
        borderRightWidth: 1,
        borderRightColor: "#939997",
        width: Math.floor(Dimensions.get('window').width * 0.9),
        flexDirection: "row",
        alignItems: "center",
        padding: 5
    },
    view: {
        width: Math.floor(Dimensions.get('window').width * 0.8),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    bottomControl: {
        width: Math.floor(Dimensions.get('window').width * 0.2),
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10
    },
    songsImaNO: {
        height: 40,
        width: 40,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "tomato",
        borderRadius: 10
    }

})

export default BottomPlayer