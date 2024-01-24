import React from 'react'
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from "react-native-vector-icons/Entypo"
import ControllerIcons from "react-native-vector-icons/AntDesign"
import { Slider } from '@react-native-assets/slider'
import { useSelector } from 'react-redux';
import { Player as RPlayer } from '@react-native-community/audio-toolkit'



function Player({ navigation }) {

    const [plays, setPlays] = React.useState(new RPlayer("sample.mp3"));
    const [playing, setIsPlaying] = React.useState(false);
    const [duration, setDuration] = React.useState(0);
    const [cT, setCT] = React.useState(0);
    const { selectItem } = useSelector((state) => state.reducer);
    const myIcon = <Icon name="chevron-thin-left" size={20} color="tomato" />;

    let Icons = [
        {
            IconName: "retweet",
            size: 25,
            color: "#666670"
        },
        {
            IconName: "banckward",
            size: 25,
            color: "#666670"
        },
        {
            IconName: playing ? "pausecircle" : "play",
            onPress: () => {
                if (plays.isPlaying) {
                    plays.pause();
                    setIsPlaying(false);
                } else {
                    plays.play();
                    setIsPlaying(true);
                }
                setTimeout(()=> _getDuration(), 100);
            },
            size: 45,
            color: "tomato"
        },
        {
            IconName: "forward",
            size: 25,
            color: "#666670"
        },
        {
            IconName: "staro",
            size: 25,
            color: "#666670"
        }
    ]

    function msToMINS(ms) {
        let s = ms/1000;
        let seconds = Math.floor(s % 60);
        let minutes = Math.floor(s / 60);
        return `${minutes}:${seconds}`;
    }

    const _getDuration = () => {
        setDuration(plays.duration);
        setInterval(()=>{
            setCT(plays.currentTime)
        },1000)
    }


    return (
        <View style={styles.Player_con}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate(Object.values(selectItem).length === 0 ? "Home" : selectItem?.RouterN)}>
                    {myIcon}
                </TouchableOpacity>
                <Text></Text>
            </View>
            <View style={styles.search_body}>
                <View style={{ padding: 5, gap: 5 }}>
                    <ImageBackground style={styles.playerCard} imageStyle={{ borderRadius: 20 }} resizeMode='cover' source={require("../Assets/Images/Cassette.jpg")} >
                    </ImageBackground>
                    <View style={styles.SongTittel}>
                        <Text style={styles.songNameTittel}>A.R. Rahman Radio Tamil</Text>
                        <Text style={styles.songNameDesc}>Musically connecting Bengalis across the globe. Radio BongOnet </Text>
                    </View>
                </View>
                <View style={styles.controller}>
                    <View style={styles.controllerRunner}>
                        <Slider
                            value={30}
                            minimumValue={0}
                            maximumValue={duration}
                            minimumTrackTintColor={'tomato'}
                            maximumTrackTintColor={'grey'}
                            thumbTintColor={'tomato'}
                            slideOnTap={true}
                        // onValueChange={handleChange}
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
                    <Text>{(playing && (duration > 0)) && (msToMINS(cT))}</Text>
                </View>
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
        borderBottomWidth: 0.5,
        borderBottomColor: "#313131",
        height: 50,
        backgroundColor: "#dee0f7",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10
    },
    search_body: {
        height: 705,
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
        height: "auto",
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
        height: 35
    },
    controllerIcon: {
        // borderColor: "#000",
        // borderWidth: 1,
        width: 340,
        height: "auto",
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