import React, { useRef, useState } from 'react'
import { Dimensions, FlatList, ImageBackground, NativeModules, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import PlayIcon from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { SelectItem, thumbnailImageUri, } from '../Store/action';
import BottomPlayer from '../components/BottomPlayer';
import { useRoute } from '@react-navigation/native';
import { playsougFunction, songCompleteForward } from '../utils/playerFunction';

function Search({ navigation }) {

    const { ThumbnailExtractor } = NativeModules;

    const dispatch = useDispatch();
    const route = useRoute();

    const { selectItem, Songs, interval} = useSelector((state) => state.reducer);

    const [filteredList, setFilteredList] = useState(Songs);
    const [isSearching, setIsSearching] = React.useState({ value: "", active: false });

    const _listRef = useRef();


    function thunmbnail(streamURL) {
        // Use the module function to extract thumbnail
        ThumbnailExtractor.extractThumbnail(streamURL)
            .then(base64Thumbnail => {
                dispatch(thumbnailImageUri(base64Thumbnail))
            })
            .catch(error => {
                // Handle error
                dispatch(thumbnailImageUri(null))
            });
    }
    const filterbySearch = (e) => {
        let updatedList, query = e;
        if (e === '') {
            updatedList = Songs;
            setIsSearching({ ...isSearching, active: false, value: query });
        } else {
            updatedList = Songs.filter((itemList) => {
                return String(itemList.name).toLowerCase().includes(String(query).toLowerCase());
            });
            setIsSearching({ ...isSearching, active: true, value: query });
        }
        setFilteredList(updatedList);
    };

    const textMax = 50

    const _filteredItems = (item) => {
        let searchedkey = String(isSearching.value).toLowerCase();
        let name = String(item.name);
        let Txt = name.toLowerCase().indexOf(searchedkey);
        return <React.Fragment>
            <Text style={[item.Id === selectItem?.songs?.Id ? style.TextValueActive : style.TextValue]} >
                {Txt !== 0 && (name.substring(0, Txt))}
                <Text style={[item.Id === selectItem?.songs?.Id ? style.TextValueActive : style.TextValue, { color: item.Id === selectItem?.songs?.Id ? "#fff" : "tomato" }]} >{name.substring(Txt, (Txt + searchedkey.length))}</Text>
                {(Txt + searchedkey.length) !== name.length && (name.substring((Txt + searchedkey.length), name.length))}
            </Text>
        </React.Fragment>
    }

    const AutoRow = ({ item, index }) => {

        return (
            <TouchableOpacity onPress={() => { dispatch(SelectItem({ songs: item, RouterN: "Search", play: true, destroyPair: item.Id !== selectItem?.songs?.Id ? true : false })); playsougFunction(item.streamURL, dispatch); thunmbnail(item.streamURL) }}>
                <View style={style.filtetValue_con}>
                    <View style={style.filtetValue_inner} >
                        {item.imageURL === "" || item.imageURL === null ? (
                            <View style={style.songsIma}>
                                <Icon name={"music"} size={30} color={item.Id === selectItem?.songs?.Id ? "tomato" : "#ffff"} />
                            </View>
                        ) : (
                            <View >
                                <ImageBackground style={{ ...style.songsImaNO, width: 50, height: 50, }} imageStyle={{ borderRadius: 10 }} resizeMode='cover' source={{ uri: item.imageURL }} >
                                    <PlayIcon name={"play"} size={20} color={item.Id === selectItem?.songs?.Id ? "tomato" : "#fff"} />
                                </ImageBackground>
                            </View>
                        )}

                        <View style={style.Sn_dis}>
                            {(isSearching.active === false) ? <Text style={item.Id === selectItem?.songs?.Id ? style.TextValueActive : style.TextValue} >{item.name}</Text> : _filteredItems(item)}
                            <Text style={style.disN}>{item.desc.length > textMax ? ((String(item.desc).substring(0, textMax - 3)) + "...") : item.desc}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    const getItemLayout = (data, index) => {
        return { length: 80, offset: 80 * index, index }
    }

    React.useEffect(() => {
        if (Object.keys(selectItem).length > 0) {
            _listRef.current.scrollToIndex({ animated: true, index: selectItem?.songs?.scrollId });
        }
    }, []);

    React.useEffect(() => {
        if (interval === -1) {
            songCompleteForward(selectItem, Songs, dispatch)
        }
    }, [interval])


    return (
        <View style={style.Home_con}>
            <View style={style.header}>
                <View style={style.searchBar}>
                    <TextInput
                        placeholder='Search Your Songs'
                        placeholderTextColor={"#848484"}
                        selectionColor={"tomato"}
                        autoFocus={Object.values(selectItem).length === 0 && route.name === "Search" ? true : false}
                        onChangeText={filterbySearch}
                        style={style.input} />
                    <View style={style.CenBotton}>
                        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                            <Text style={style.text}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
            <View style={{ ...style.search_body, height: Object.keys(selectItem) > 0 && route.name === "Search" ? Math.floor(Dimensions.get('window').height * 0.8) : Object.keys(selectItem) > 0 && route.name === "Player" ? Math.floor(Dimensions.get('window').height * 0.7) : Math.floor(Dimensions.get('window').height * 0.8) }}>
                <SafeAreaView>
                    <FlatList
                        data={filteredList}
                        renderItem={AutoRow}
                        key={item => item.Id}
                        keyExtractor={item => `key-${item.Id}`}
                        getItemLayout={getItemLayout}
                        ref={_listRef}
                    />
                </SafeAreaView>
            </View>
            {Object.keys(selectItem).length > 0 && <BottomPlayer DimensionsFilter={route.name} navigation={navigation} />}
        </View>

    )
}

const style = StyleSheet.create({
    Home_con: {
        flex: 1,
        backgroundColor: "#000",
        position: "relative"
    },
    header: {
        borderBottomWidth: 1,
        borderBottomColor: "#313131",
        backgroundColor: "#000",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        width: Math.floor(Dimensions.get('window').width),
        height: Math.floor(Dimensions.get('window').height * 0.1),
    },
    searchBar: {
        borderWidth: 1,
        borderColor: "#313131",
        flexDirection: "row",
        justifyContent: "space-between",
        width: 350,
        borderRadius: 20,
        padding: 5
    },
    input: {
        width: 250,
        fontSize: 13,
        padding: 5,
        color: "#fff"
    },
    CenBotton: {
        width: "auto",
        padding: 10,
    },
    text: {
        fontSize: 14,
        color: "tomato"
    },
    search_body: {
        backgroundColor: "#000",
        position: "relative",
        width: Math.floor(Dimensions.get('window').width),
    },
    filtetValue_con: {
        borderBottomWidth: 0.5,
        borderColor: "#313131",
        height: 80,
        paddingTop: 17,
        paddingBottom: 17,
        paddingLeft: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        padding: 5

    },
    filtetValue_inner: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    TextValue: {
        color: "#fff",
        fontSize: 13,
        padding: 0,
        margin: 0
    },
    TextValueActive: {
        color: "tomato",
        fontSize: 13,
        padding: 0,
        margin: 0
    },
    img: {
        width: 50,
        height: 50
    },
    Sn_dis: {
        width: 300,
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    disN: {
        color: "#5e5b56",
        fontSize: 11,
        padding: 0,
        margin: 0
    },
    songsIma: {
        height: 40,
        width: 40,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#939997",
        borderRadius: 10
    },
    songsImaNO: {
        height: 40,
        width: 40,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    }
})

export default Search