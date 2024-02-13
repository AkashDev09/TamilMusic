import React from 'react'
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from "react-native-vector-icons/Entypo"
import ControllerIcons from "react-native-vector-icons/AntDesign"
import { Slider } from '@react-native-assets/slider'
import { useDispatch, useSelector } from 'react-redux';
import { banckward, forward, msToMINS, playSeek, playerPlayAndPause, songCompleteForward } from '../utils/playerFunction'



function Player({ navigation, route }) {

    const { selectItem, Songs, interval, isPlaying, duration } = useSelector((state) => state.reducer);
    const myIcon = <Icon name="chevron-thin-left" size={20} color="tomato" />;
    
    const dispatch = useDispatch();

    let Icons = [
        {
            IconName: "retweet",
            size: 25,
            color: "#666670"
        },
        {
            IconName: "banckward",
            size: 25,
            color: "#666670",
            onPress: () => banckward(selectItem, Songs, dispatch)
        },
        {
            IconName: isPlaying ? "pausecircle" : "play",
            onPress: () => playerPlayAndPause(dispatch),
            size: 45,
            color: "tomato"
        },
        {
            IconName: "forward",
            size: 25,
            color: "#666670",
            onPress: () => forward(selectItem, Songs, dispatch)
        },
        {
            IconName: "staro",
            size: 25,
            color: "#666670"
        }
    ]

    const handleChange = (e) => {
        let SongStartWith = Math.floor(e)
        playSeek(SongStartWith)
    }
    React.useEffect(() => {
        if (interval === -1) {
            songCompleteForward(selectItem, Songs, dispatch)
        }

    }, [interval])
    return (
        <View style={styles.Player_con}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate(route.params.PassValue)}>
                    {myIcon}
                </TouchableOpacity>
            </View>
            <View style={styles.search_body}>
                <View style={{ padding: 5, gap: 5 }}>
                    <ImageBackground style={styles.playerCard} imageStyle={{ borderRadius: 20 }} resizeMode='cover' source={require("../Assets/Images/Cassette.jpg")} >
                    </ImageBackground>
                    <View style={styles.SongTittel}>
                        <Text style={styles.songNameTittel}>{selectItem?.songs?.name}</Text>
                        <Text style={styles.songNameDesc}>{selectItem?.songs?.desc}</Text>
                    </View>
                </View>
                <View style={styles.controller}>
                    <View style={styles.controllerRunner}>
                        <View style={styles.controllerTime}>
                            <Text style={{ color: "#666670" }}>{(isPlaying && (interval === -1)) ? "--:--" : (msToMINS(interval))}</Text>
                            <Text style={{ color: "#666670" }}>{(isPlaying || (duration > 0)) ? (msToMINS(duration)) : "--:--"}</Text>
                        </View>
                        <Slider
                            value={interval}
                            minimumValue={0}
                            maximumValue={duration}
                            minimumTrackTintColor={'tomato'}
                            maximumTrackTintColor={'grey'}
                            thumbTintColor={'tomato'}
                            slideOnTap={true}
                            onSlidingComplete={handleChange}
                        />
                    </View>
                    <View style={styles.controllerIcon}>
                        {Icons.map((Ico, i) => (
                            <View key={i} style={styles.conIcon}>
                                <TouchableOpacity onPress={Ico.onPress}>
                                    <ControllerIcons name={Ico.IconName} size={Ico.size} color={Ico.color} />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>

                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    Player_con: {
        flex: 1,
        backgroundColor: "#fff"
    },
    header: {
        borderBottomWidth: 0.5,
        borderBottomColor: "#313131",
        height: 50,
        backgroundColor: "#000",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10
    },
    search_body: {
        flex: 1,
        backgroundColor: "#dee0f7",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 5

    },
    playerCard: {
        width: 300,
        height: 300,
    },
    SongTittel: {
        width: 300,
        gap: 8,
        padding: 5
    },
    songNameTittel: {
        fontSize: 20,
        fontWeight: "bold",
        color: "tomato"
    },
    songNameDesc: {
        fontSize: 12,
        color: "#666670"
    },
    controller: {
        width: 360,
        // borderColor: "#000",
        // borderWidth: 1,
        height: "auto",
        flexDirection: "column",
        alignItems: "center",
        padding: 5,
        gap: 10
    },
    controllerRunner: {
        // borderColor: "#000",
        // borderWidth: 1,
        width: 340,
        height: 45,
    },
    controllerTime: {
        // borderColor: "#000",
        // borderWidth: 1,
        width: 340,
        height: 35,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    controllerIcon: {
        // borderColor: "#000",
        // borderWidth: 1,
        width: 340,
        height: 105,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    conIcon: {
        // borderColor: "#000",
        // borderWidth: 1,
        padding: 5
    }

})

export default Player