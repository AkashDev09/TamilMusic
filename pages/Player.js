import React, { useEffect, useState } from 'react'
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from "react-native-vector-icons/Entypo"
import ControllerIcons from "react-native-vector-icons/AntDesign"
import { Slider } from '@react-native-assets/slider'
import { useDispatch, useSelector } from 'react-redux';
import { Player as RPlayer, PlaybackCategories } from '@react-native-community/audio-toolkit'
import { SelectItem, bottomPlay } from '../Store/action'



function Player({ navigation }) {

    const [plays, setPlays] = React.useState(new RPlayer());
    const [playing, setIsPlaying] = React.useState(false);
    const [duration, setDuration] = React.useState(0);
    const [cT, setCT] = React.useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const [autoPlay, setAutoPlay] = useState(false);

    const { selectItem, Songs, BottomPlayController } = useSelector((state) => state.reducer);
    const myIcon = <Icon name="chevron-thin-left" size={20} color="tomato" />;

    const dispatch = useDispatch();

    console.log(BottomPlayController, "BottomPlayController")
    const defaultPlayerOptions = {
        // autoDestroy: true,
        continuesToPlayInBackground: true, // Set to true for background playback
        // category: PlaybackCategories.Playback,
        // mixWithOthers: false,
    };
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
            onPress: () => {
                plays.destroy();
                setIsPlaying(false);
                setCT(0);
                setDuration(0);
                clearInterval(intervalId);
                const currentIndex = Songs.findIndex(song => song.Id === selectItem.songs.Id);
                const nextIndex = (currentIndex - 1) % Songs.length;
                setPlays(new RPlayer(Songs[nextIndex].streamURL, defaultPlayerOptions));
                dispatch(SelectItem({ songs: Songs[nextIndex], RouterN: "Search", play: false, destroyPair: true }))
            }
        },
        {
            IconName: playing ? "pausecircle" : "play",
            onPress: () => {
                if (plays.isPlaying) {
                    plays.pause();
                    setIsPlaying(false);
                    clearInterval(intervalId)
                    dispatch(bottomPlay(false))
                } else {
                    plays.play();
                    setIsPlaying(true);
                    const newIntervalId = setInterval(() => setCT(plays.currentTime), 1000);
                    setTimeout(() => setDuration(plays.duration), 1000);
                    setIntervalId(newIntervalId);
                    dispatch(bottomPlay(true))
                }
            },
            size: 45,
            color: "tomato"
        },
        {
            IconName: "forward",
            size: 25,
            color: "#666670",
            onPress: () => {
                plays.destroy();
                setIsPlaying(false);
                setCT(0);
                setDuration(0);
                clearInterval(intervalId);
                const currentIndex = Songs.findIndex(song => song.Id === selectItem.songs.Id);
                const nextIndex = (currentIndex + 1) % Songs.length;
                setPlays(new RPlayer(Songs[nextIndex].streamURL, defaultPlayerOptions));
                dispatch(SelectItem({ songs: Songs[nextIndex], RouterN: "Search", play: false, destroyPair: true }))
            }
        },
        {
            IconName: "staro",
            size: 25,
            color: "#666670"
        }
    ]
    function msToMINS(ms) {
        let s = ms / 1000;
        let seconds = Math.floor(s % 60);
        let minutes = Math.floor(s / 60);
        return `${minutes >= 10 ? minutes : "0" + minutes}:${seconds >= 10 ? seconds : "0" + seconds}`;
    }

    useEffect(() => {
        if (selectItem.play === true && selectItem?.destroyPair === true) {
            setPlays(new RPlayer(selectItem?.songs?.streamURL, defaultPlayerOptions));
            if (Object.keys(selectItem).length > 0 && selectItem.play === true) {
                plays.destroy();
                setIsPlaying(false);
                setCT(0);
                setDuration(0);
                clearInterval(intervalId);
                setAutoPlay(true)
                dispatch((bottomPlay(true)))
            }
        } else {
            if (selectItem.play === false && selectItem?.destroyPair === true) {
                plays.play()
                setIsPlaying(true);
                const newIntervalId = setInterval(() => setCT(plays.currentTime), 1000);
                setTimeout(() => setDuration(plays.duration), 1000);
                setIntervalId(newIntervalId);
                dispatch((bottomPlay(true)))
            }

        }
    }, [selectItem])

    const handleChange = (e) => {
        let SongStartWith = Math.floor(e)
        plays.seek(SongStartWith)
    }

    useEffect(() => {
        if (autoPlay === true) {
            plays.play()
            setIsPlaying(true);
            const newIntervalId = setInterval(() => setCT(plays.currentTime), 1000);
            setTimeout(() => setDuration(plays.duration), 1000);
            setIntervalId(newIntervalId);
            dispatch((bottomPlay(true)))
            setAutoPlay(false);
        }
    }, [autoPlay])

    useEffect(() => {
        if (cT === -1) {
            plays.destroy();
            setIsPlaying(false);
            setCT(0);
            setDuration(0);
            clearInterval(intervalId)
            clearInterval(intervalId);
            const currentIndex = Songs.findIndex(song => song.Id === selectItem.songs.Id);
            const nextIndex = (currentIndex + 1) % Songs.length;
            setPlays(new RPlayer(Songs[nextIndex].streamURL, defaultPlayerOptions));
            dispatch(SelectItem({ songs: Songs[nextIndex], RouterN: "Search", play: false, destroyPair: true }))
        }
    }, [cT]);
    return (
        <View style={styles.Player_con}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate(Object.values(selectItem).length === 0 ? "Home" : selectItem?.RouterN)}>
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
                            <Text style={{ color: "#666670" }}>{(playing && (cT === -1)) ? "--:--" : (msToMINS(cT))}</Text>
                            <Text style={{ color: "#666670" }}>{(playing || (duration > 0)) ? (msToMINS(duration)) : "--:--"}</Text>
                        </View>
                        <Slider
                            value={cT}
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